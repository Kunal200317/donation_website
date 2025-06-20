"use client"
import React, { useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { updateprofile, fetchuser } from '@/action/useractions'
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify'

const Dashboard = () => {

  const [form, setform] = useState({})

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  
  }

  const { data: session, update } = useSession()
  // this code use when user is not login hes go to the login page 
  const router = useRouter()



  useEffect(() => {
    getData()
    if (!session) {
      router.push('/login')
    }
  }, [])

  const getData = async () => {
    let u = await fetchuser(session.user.name)
    setform(u)
  }

  const submitaction = async (data) => {
    await updateprofile(data, session.user.name)
      toast('profile update succesfully', {
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
      <div className='pt-8'>
        <div className=' md:w-1/2 w-5/6 mx-auto p-5 bg-gray-900 rounded-md'>
          <h1 className='text-white text-center font-bold text-2xl'>Wellcom to your Dashboard</h1>

          <form className='flex flex-col gap-2' action={(data) => { submitaction(data) }} >
            <div className='name  gap-3 '>
              <label className='text-white font-bold ' htmlFor="name">Name</label>
              <input className='w-full p-1 rounded-lg bg-gray-600 pl-2 text-white mt-2' name='name' onChange={(e) => { handleChange(e) }} value={form.name ? form.name : ""} type="text" id='name' placeholder='Enter Name' />
            </div>
            <div className=' email  gap-3 '>
              <label className='text-white font-bold ' htmlFor="email">Email</label>
              <input className='w-full p-1 rounded-lg bg-gray-600 pl-2 text-white mt-2' name='email' onChange={(e) => { handleChange(e) }} value={form.email ? form.email : ""} type="text" id='email' placeholder='Enter Email' />
            </div>
            <div className='username  gap-3 '>
              <label className='text-white font-bold ' htmlFor="username">Username</label>
              <input className='w-full p-1 rounded-lg bg-gray-600 pl-2 text-white mt-2' name='username' onChange={(e) => { handleChange(e) }} value={form.username ? form.username : ""} type="text" id='username' placeholder='Enter Username' />
            </div>
            <div className='profile  gap-3 '>
              <label className='text-white font-bold ' htmlFor="profilepicture">ProfilePicture</label>
              <input className='w-full p-1 rounded-lg bg-gray-600 pl-2 text-white mt-2' name='profilepicture' onChange={(e) => { handleChange(e) }} value={form.profilepicture ? form.profilepicture : ""} type="text" id='profilepicture' placeholder='set profile' />
            </div>
            <div className='cover  gap-3 '>
              <label className='text-white font-bold ' htmlFor="coverpicture">Coverpicture</label>
              <input className='w-full p-1 rounded-lg bg-gray-600 pl-2 text-white mt-2' name='coverpicture' onChange={(e) => { handleChange(e) }} value={form.coverpicture ? form.coverpicture : ""} type="text" id='coverpicture' placeholder='set Cover Picture' />
            </div>
            <div className='razorpayid  gap-3 '>
              <label className='text-white font-bold ' htmlFor="RazorpayId">RazorpayId</label>
              <input className='w-full p-1 rounded-lg bg-gray-600 pl-2 text-white mt-2' name='RazorpayId' onChange={(e) => { handleChange(e) }} value={form.RazorpayId ? form.RazorpayId : ""} type="text" id='RazorpayId' placeholder='set Cover Picture' />
            </div>
            <div className='razorpaysecret  gap-3 '>
              <label className='text-white font-bold ' htmlFor="Razorpaysecret">Razorpay secret</label>
              <input className='w-full p-1 rounded-lg bg-gray-600 pl-2 text-white mt-2' name='Razorpaysecret' onChange={(e) => { handleChange(e) }} value={form.Razorpaysecret ? form.Razorpaysecret : ""} type="text" id='Razorpaysecret' placeholder='set Cover Picture' />
            </div>

            <div className='flex justify-center mt-2'>
              <button type="submit" className=" text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Save</button>
            </div>

          </form>

        </div>
      </div>

    </>
  )
}

export default Dashboard