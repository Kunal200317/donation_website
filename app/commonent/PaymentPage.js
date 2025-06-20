"use client"
import React from 'react'
import Script from 'next/script'
import { useState, useEffect } from 'react'
import { initiate } from '@/action/useractions'
import { useSession, signIn, signOut } from "next-auth/react"
import { fetchuser, fetchpayment, } from '@/action/useractions'
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'


const PaymentPage = ({ username }) => {
  const { data: session } = useSession()

  const [paymentform, setpaymentform] = useState({name: '', message: '',amount: ''})
  const [currentuser, setcurrentuser] = useState({})
  const [payments, setpayments] = useState([])
  const SearchParms = useSearchParams()
  const router = useRouter()

  const handlechange = (e) => {
    setpaymentform({ ...paymentform, [e.target.name]: e.target.value })
  }


  useEffect(() => {
    getData()

  }, [])


  useEffect(() => {
    if (!session) {
      router.push("/login")
    }

  }, [])



  useEffect(() => {
   if (SearchParms.get("paymentdone")=="true") {
    toast('you payment is succusfully made', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      });
      router.push(`/${username}`)
   }
  }, [])
  

  // fatch the data
  const getData = async () => {
    let u = await fetchuser(username)
    setcurrentuser(u)

    let p = await fetchpayment(username)
    setpayments(p)

  }



  const pay = async (amount) => {
    //get order id 
    let a = await initiate(amount, username, paymentform)
    let orderId = a.id

    var options = {
      "key": currentuser.RazorpayId, // Enter the Key ID generated from the Dashboard
      "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": "Get Me a chai", //your business name
      "description": "Test Transaction",
      "image": "https://example.com/your_logo",
      "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "callback_url": "http://localhost:3000/api/razorpay",
      "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        "name": "Gaurav Kumar", //your customer's name
        "email": "gaurav.kumar@example.com",
        "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
      },
      "notes": {
        "address": "Razorpay Corporate Office"
      },
      "theme": {
        "color": "#3399cc"
      }
    };

    var rzp1 = new Razorpay(options);
    rzp1.open();


  }


  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      <div className="cover relative ">
        <img className='object-cover object-center  w-full md:h-[350px]' src={currentuser.coverpicture} alt="" />
        <div className="profile md:h-[120px] md:w-[120px] h-[70px] w-[70px]  md:left-[46%] left-[40%] bottom-[-50] absolute">
          <img className='rounded-xl' src={currentuser.profilepicture == "" ? session?.user.image : currentuser.profilepicture} alt="" />
        </div>
      </div>

      <div className="info text-white flex flex-col items-center  mx-auto mt-20">
        <div className='font-bold text-3xl'>@{username}</div>

        <div className='text-gray-500'>lets help {username} Get me chai!</div>

        <div className='text-gray-500'>{payments.length} Payments . ₹{payments.reduce((a,b) => a + b.amount,0)}raised </div>

      </div>
      <div className="payment flex gap-5 w-5/6 mx-auto mt-3 flex-col  md:flex-row">
        <div className="sappoter bg-gray-900 md:w-1/2 rounded-lg p-4">
          <h1 className='mb-4 p-3 text-white text-3xl font-bold'>Suppoters</h1>
          <ul className='px-4'>

            {payments.length == 0 && <div className='text-white text-xl'> No payment yet</div>}

            {payments.map((item, i) => {

              return (
                <div key={i} className='flex gap-2 items-center'>
                  <img className='w-12' src="/avatar.gif" alt="" />
                  <li className='text-white text-lg'>{item.name} donates <span className='font-bold'>₹{item.amount}</span> with massage "{item.message}"</li>
                </div>)
            })}

          </ul>

        </div>

        <div className="makepayment bg-gray-900 md:w-1/2 rounded-lg text-white p-5">
          <h1 className='text-white text-3xl font-bold'>MakePayment</h1>
          <div className='flex flex-col gap-2 mt-4'>
            <input onChange={(e) => handlechange(e)} name='name' value={paymentform.name} className='w-full p-2 bg-slate-800 border border-gray-600 rounded-lg' type="text" placeholder='Enter Your Name' />
            <input onChange={(e) => handlechange(e)} name='message' value={paymentform.message} className='w-full p-2 bg-slate-800 border border-gray-600 rounded-lg' type="text" placeholder='Enter your Massage' />
            <input onChange={(e) => handlechange(e)} name='amount' value={paymentform.amount} className='w-full p-2 bg-slate-800 border border-gray-600 rounded-lg' type="text" placeholder='Enter Amount' />
            <button onClick={() => { pay(Number.parseInt(paymentform.amount) * 100) }} type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 disabled:bg-slate-700 disabled:ring-gray-800 disabled:from-gray-400 w-full" disabled={paymentform.name?.length < 3 || paymentform.message?.length < 3 || paymentform.amount?.length < 1}>Pay</button>
          </div>
          <div className='mt-3 flex gap-4 flex-col md:flex-row'>
            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => (pay(500))} >Pay ₹5</button>
            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => (pay(1000))} >Pay ₹10</button>
            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => (pay(1500))} >Pay ₹15</button>
          </div>
        </div>
      </div>
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

    </>
  )
}

export default PaymentPage
