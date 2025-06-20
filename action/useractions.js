"use server"
import Razorpay from "razorpay";
import connectDb from "@/db/connectDb";
import Payment from "@/models/Payment";
import User from "@/models/User";


export const initiate =  async (amount, to_username, paymentform) => {
await connectDb() 
 // fetch the keyid and  keysecret of the user  who is geting the pement
    const user = await User.findOne({username: to_username})
    const keyid = user.RazorpayId
    const secret = user.Razorpaysecret
    

var instance = new Razorpay({ key_id: keyid, key_secret: secret })
// var instance = new Razorpay({ key_id: 'rzp_test_CAwWFMOoWkkoL6', key_secret:'XJS5eZNHCK9wkOMO9XxJiAFv' })

const options = {
    amount: Number.parseInt(amount),
    currency: "INR",
}

let x = await instance.orders.create(options)

//create a payment object which is show  a pending detabase 

 await Payment.create({

    oid: x.id,
    name: paymentform.name,
    to_user: to_username,
    message: paymentform.message,
    amount: amount/100,

})

return x
}

export const fetchuser = async (username) => {
      await connectDb()
      let u = await User.findOne({username : username})
      // flatten the object ids
      let user = u.toObject({flattenObjectIds: true})
      return user
}


export const fetchpayment = async (username) => {
    await connectDb()
    // find all payments sorted by decreasing order of amount and flatten object ids
    let p = await Payment.find({ to_user: username, done:true }).sort({ amount: -1 }).limit(10).lean()
    return p
}
export const updateprofile = async (data,oldusername) => {
      await connectDb()

      let ndata = Object.fromEntries(data)
      // if the user name is updated check the  user name availabe of not
      if (oldusername !== ndata.username) {
          let u = await User.findOne({username: ndata.username})  
          if (u) {
              return { success: false, message: 'Username already exists' }
          }

          await User.updateOne({email: ndata.email},ndata)

          // update the payment table as well
          await Payment.updateMany({to_user: oldusername}, {to_user: ndata.username})

          // update the user table as well
          await User.updateOne({username: oldusername}, {username: ndata.username})

          return { success: true, message: 'Profile updated successfully' }
      }
      else{
        await User.updateOne({email: ndata.email},ndata)
      }
     
     
     
}



   