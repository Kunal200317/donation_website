import NextAuth from 'next-auth'
import GitHubProvider from "next-auth/providers/github";
const mongoose = require('mongoose');
import User from '@/models/User';
import connectDb from '@/db/connectDb';
import dotenv from 'dotenv';
dotenv.config();

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
  
  debug: process.env.NODE_ENV === 'development',

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider == "github") { 
        try {
          await connectDb();
          
          const currentUser = await User.findOne({ email: user.email });
          
          if (!currentUser) {
            const newUser = await User.create({
              email: user.email, 
              username: user.email.split("@")[0],  
            });
            await newUser.save();
          } else {
            await User.updateOne(
              { email: user.email }, 
              { username: user.email.split("@")[0] }
            );
          }
          return true;
        } catch (error) {
          console.error("SignIn error:", error);
          return false;
        }
      }
      return false; 
    },
    
    async session({ session, user, token }) {
      try {
        const dbuser = await User.findOne({ email: session.user.email });
        if (dbuser) {
          session.user.name = dbuser.username;
        }
        return session;
      } catch (error) {
        console.error("Session error:", error);
        return session;
      }
    },
  }
});

export { handler as GET, handler as POST };