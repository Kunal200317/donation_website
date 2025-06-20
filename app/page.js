import React from "react";
import NavLink from "next/link";

export default function Home() {
  return (
    <>
      <div className="text-white flex flex-col justify-center items-center h-[40vh] gap-2 p-6 md:p-0 ">
        <div className="text-5xl flex items-center justify-center font-bold">Get me a Chai <span><img className="w-28" src="/tea.gif" alt="" /></span></div>
        <p>A crowdfunding platform for creators. Get funded by your fans and followers. Start now!</p>
        <div className="button flex">
         <NavLink href={"/login"}> <button type="button" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Hear</button></NavLink>
         <NavLink href={"/About"}> <button type="button" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read More</button></NavLink>
        </div>
      </div>

      <div className="line bg-white h-1 opacity-10"></div>

      <div className="w-[85vw] mx-auto flex flex-col gap-4 py-12">
        <h1 className="text-center font-bold text-3xl text-white mt-4">Your Fans can buy your chai</h1>
        <div className="icons flex justify-around">
          <div className="icon flex flex-col items-center">
            <img className=" md:w-28 w-20 rounded-full p-4 bg-gray-400" src="/man.gif" alt="" />
            <p className="font-bold text-white md:text-xl text-xs">Funds yourself</p>
            <p className="text-white md:text-lg text-xs">your fans are avilable for you to help you</p>
          </div>
          <div className="icon flex flex-col items-center">
            <img className="md:w-28 w-20 rounded-full p-4 bg-gray-400" src="/coin.gif" alt="" />
            <p className="font-bold text-white md:text-xl text-xs">Funds yourself</p>
            <p className="text-white md:text-lg text-xs">your fans are avilable for you to help you</p>
          </div>
          <div className="icon flex flex-col items-center">
            <img className="md:w-28 w-20 rounded-full p-4 bg-gray-400" src="/group.gif" alt="" />
            <p className="font-bold text-white md:text-xl text-xs">Funds yourself</p>
            <p className="text-white md:text-lg text-xs">your fans are avilable for you to help you</p>
          </div>
        </div>
      </div>
      <div className="line bg-white h-1 opacity-10"></div>

      <div className="w-[85vw] mx-auto flex flex-col  gap-4 py-12">
        <h1 className="text-center font-bold text-3xl text-white mt-4">Learn more about us</h1>
        <div className="video-container flex justify-center">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/zIuQBFFR9ow?si=7w3ES4A3LXykAamg" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen >
          </iframe>
        </div>
      </div>
    </>
  );
}


export const metadata = {
  title: 'Get me a Chai - A crowdfunding platform for creators',
  description: '...',
}
 
