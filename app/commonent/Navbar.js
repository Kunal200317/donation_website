"use client"
import React from 'react'
import { useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import NavLink from 'next/link'

const Navbar = () => {
  const { data: session } = useSession()
  const [showdropdown, setshowdropdown] = useState(false)

  return (
    <nav className='bg-black flex items-center justify-between py-1 px-6  flex-col md:flex-row gap-3 '>
      <div className="log text-white flex items-end ">
        <NavLink href={"/"}><img className='rounded-xl w-[80px]' src="/logo.png" alt="" /></NavLink>
      </div>

      <div className='text-white flex flex-col gap-4 items-center  md:flex-row' >

        {session && <>
         
            <button  onClick={() => setshowdropdown(!showdropdown)}   id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className=" relative text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-[11px] text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Welcome {session.user.email} <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
            </svg>
            </button>


            <div id="dropdown" className={` ${showdropdown ? " " : "hidden" } z-[10] absolute md:top-16 top-32 right-30 bg-gray-800 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-70`}>
              <ul className=" py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                <li>
                  <NavLink href={"/dashboard"} className="block px-4 py-2  dark:hover:bg-gray-600 dark:hover:text-black">Dashboard</NavLink>
                
              
                  <NavLink href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black">Your page</NavLink>
                
                  <NavLink onClick={() => signOut("github")} href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black">Sign out</NavLink>
                </li>
              </ul>
            </div>
        </>
        }
        
        {session && <button className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 w-full md:w-fit' onClick={() => { signOut() }}>Logout</button>}
        {!session && <NavLink href={"/login"}><button type="button" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Login</button> </NavLink>}
      </div>
    </nav>
  )
}

export default Navbar   