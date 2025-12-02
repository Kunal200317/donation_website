"use server"
import Razorpay from "razorpay";
import connectDb from "@/db/connectDb";
import Payment from "@/models/Payment";
import User from "@/models/User";

export const initiate = async (amount, to_username, paymentform) => {
  try {
    await connectDb();
    
    // fetch the keyid and keysecret of the user who is getting the payment
    const user = await User.findOne({ username: to_username });
    
    if (!user) {
      throw new Error("User not found");
    }
    
    const keyid = user.RazorpayId;
    const secret = user.Razorpaysecret;

    var instance = new Razorpay({ key_id: keyid, key_secret: secret });

    const options = {
      amount: Number.parseInt(amount),
      currency: "INR",
    };

    let x = await instance.orders.create(options);

    // create a payment object which is shown as pending in database 
    await Payment.create({
      oid: x.id,
      name: paymentform.name || "Anonymous",
      to_user: to_username,
      message: paymentform.message || "",
      amount: amount / 100,
      done: false, // Important: mark as pending initially
    });

    return x;
  } catch (error) {
    console.error("Initiate payment error:", error);
    throw error;
  }
}

export const fetchuser = async (username) => {
  try {
    await connectDb();
    let u = await User.findOne({ username: username });
    
    if (!u) {
      return null;
    }
    
    // ✅ CORRECT WAY: Convert Mongoose document to plain object
    let user = JSON.parse(JSON.stringify(u));
    // OR: let user = u.toObject(); // Simple toObject without parameters
    
    return user;
  } catch (error) {
    console.error("Fetch user error:", error);
    return null;
  }
}

export const fetchpayment = async (username) => {
  try {
    await connectDb();
    // find all payments sorted by decreasing order of amount
    let p = await Payment.find({ 
      to_user: username, 
      done: true 
    })
    .sort({ amount: -1 })
    .limit(10)
    .lean(); // ✅ Already returns plain objects
    
    // ✅ Ensure all _id fields are strings
    const payments = p.map(payment => ({
      ...payment,
      _id: payment._id.toString(),
      // Convert any other ObjectId fields if needed
    }));
    
    return payments;
  } catch (error) {
    console.error("Fetch payment error:", error);
    return [];
  }
}

export const updateprofile = async (data, oldusername) => {
  try {
    await connectDb();

    let ndata = Object.fromEntries(data);
    
    // if the username is updated, check if username is available or not
    if (oldusername !== ndata.username) {
      let u = await User.findOne({ username: ndata.username });
      
      if (u) {
        return { success: false, message: 'Username already exists' };
      }

      // Update user with new username
      await User.updateOne({ email: ndata.email }, ndata);

      // update the payment table as well
      await Payment.updateMany(
        { to_user: oldusername }, 
        { to_user: ndata.username }
      );

      // update the user table for username change
      await User.updateOne(
        { username: oldusername }, 
        { username: ndata.username }
      );

      return { success: true, message: 'Profile updated successfully' };
    } else {
      await User.updateOne({ email: ndata.email }, ndata);
      return { success: true, message: 'Profile updated successfully' };
    }
  } catch (error) {
    console.error("Update profile error:", error);
    return { success: false, message: error.message };
  }
}