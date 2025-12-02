import NextAuth from 'next-auth'
import GitHubProvider from "next-auth/providers/github";
const mongoose = require('mongoose');
import User from '@/models/User';
// import payment from '@/models/payment';
import connectDb from '@/db/connectDb';
import dotenv from 'dotenv';
dotenv.config();

const handler= NextAuth({
  providers: [
    // OAuth authentication providers...
    // login with github 
    GitHubProvider({
      clientId:process.env.GITHUB_ID,
      clientSecret:process.env.GITHUB_SECRET,
      }),
   ],

   callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
       if(account.provider == "github") { 
        await connectDb() 
        // Check if the user already exists in the database

        const currentUser =  await User.findOne({email: user.email}) 
        
        if(!currentUser){
          // Create a new user
           const newUser = await User.create({
            email: user.email, 
            username: user.email.split("@")[0],  
          }) 
          await newUser.save()
        }
        else{
          // Update the user if already exists in the database
          await User.updateOne({email: user.email}, {username: user.email.split("@")[0]})
        } 
        return true
       }
    },
      async session({ session, user, token }) {
      const dbuser = await User.findOne({email: session.user.email})
      session.user.name = dbuser.username
      return session
    },
  
} 

})




export {handler as  GET , handler as POST}



