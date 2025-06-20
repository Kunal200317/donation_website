import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import connectDb from "@/db/connectDb";
import User from "@/models/User";


export async function POST(req, res) {
    await connectDb();
    let body = await req.formData();
    body = Object.fromEntries(body);

    //check if order id is precent in the server or not

    let p = await Payment.findOne({oid : body.razorpay_order_id})
    if(!p){
        return NextResponse.json({success: false , message:"Order id is not found"});
    }

    // fetch the secret of the user  who is geting the pement
    const user = await User.findOne({username: p.to_user})
    const secret = user.Razorpaysecret
   
    
    //varified the payment
    let verified = validatePaymentVerification({"order_id": body.razorpay_order_id, "payment_id": body.razorpay_payment_id },body.razorpay_signature, secret);


    //update the payment
    if(verified){
        const updatedPayment = await Payment.findOneAndUpdate({oid : body.razorpay_order_id},{done:"true"}, {new: true})
        return NextResponse.redirect(`http://localhost:3000/${updatedPayment.to_user}?paymentdone=true`)
    }
    else{
        return NextResponse.json({success: false , message:"Payment varification successful"})
    }
}