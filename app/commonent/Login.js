"use client"
import React, { useEffect } from 'react'
import { useSession, signIn } from "next-auth/react"
import { useRouter } from 'next/navigation'

const Login = () => {
    const { data: session, status } = useSession()
    const router = useRouter()

    // ✅ Use useEffect for navigation, not during render
    useEffect(() => {
        if (status === 'authenticated' && session) {
            router.push("/dashboard")
        }
    }, [session, status, router])

    // ✅ Show loading state
    if (status === 'loading') {
        return (
            <div className='text-white py-14 container mx-auto text-center'>
                <h1 className='text-center font-bold text-3xl'>Loading...</h1>
            </div>
        )
    }

    // ✅ If authenticated, show nothing or loading (will redirect)
    if (status === 'authenticated') {
        return (
            <div className='text-white py-14 container mx-auto text-center'>
                <h1 className='text-center font-bold text-3xl'>Redirecting to dashboard...</h1>
            </div>
        )
    }

    return (
        <div className='text-white py-14 container mx-auto'>
            <h1 className='text-center font-bold text-3xl'>Login to Get Started</h1>
    
            <div className="flex flex-col gap-2 min-h-screen items-center p-10">
                {/* Google Button */}
                <button className="flex items-center w-64 bg-slate-50 text-black border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                    <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="-0.5 0 48 48" version="1.1">
                        {/* SVG content */}
                    </svg>
                    <span>Continue with Google</span>
                </button>
    
                {/* LinkedIn Button */}
                <button className="flex items-center w-64 bg-slate-50 text-black border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                    <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 -2 44 44" version="1.1">
                        {/* SVG content */}
                    </svg>
                    <span>Continue with LinkedIn</span>
                </button>
    
                {/* Twitter Button */}
                <button className="flex items-center w-64 bg-slate-50 text-black border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500">
                    <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 -4 48 48" version="1.1">
                        {/* SVG content */}
                    </svg>
                    <span>Continue with Twitter</span>
                </button>
    
                {/* Facebook Button */}
                <button className="flex items-center w-64 bg-slate-50 text-black border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                    <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 48" version="1.1">
                        {/* SVG content */}
                    </svg>
                    <span>Continue with Facebook</span>
                </button>
    
                {/* GitHub Button - Working */}
                <button 
                    onClick={() => { signIn("github") }}
                    className="flex items-center w-64 bg-slate-50 text-black border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                    <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 73 73" version="1.1">
                        {/* SVG content */}
                    </svg>
                    <span>Continue with Github</span>
                </button>
    
                {/* Apple Button */}
                <button className="flex items-center w-64 bg-slate-50 text-black border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                    <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="-1.5 0 20 20" version="1.1">
                        {/* SVG content */}
                    </svg>
                    <span>Continue with Apple</span>
                </button>
            </div>
        </div>
    )
}

export default Login