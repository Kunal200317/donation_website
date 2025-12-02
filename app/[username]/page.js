import React from 'react'
import PaymentPage from '../commonent/PaymentPage'
import { notFound } from "next/navigation"
import connectDb from '@/db/connectDb'
import User from '@/models/User'

const Username = async ({ params }) => {
  // ✅ Pehle params ko await karein
  const { username } = await params
  
  // If the username is not present in the database, show a 404 page
  const checkUser = async () => {
    await connectDb()
    let u = await User.findOne({ username: username })
    if (!u) {
      return notFound()
    }
  }
  await checkUser()

  return (
    <>
      <PaymentPage username={username} />
    </>
  )
}

export default Username

export async function generateMetadata({ params }) {
  // ✅ Yahan bhi params ko await karein
  const { username } = await params
  
  return {
    title: `Support ${username} - Get me a Chai - A crowdfunding platform for creators`,
    description: `Support ${username} on Get me a Chai, a crowdfunding platform for creators.`,
  }
}