import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./commonent/Navbar";
import Footer from "./commonent/Footer";
import Wrapper from "./commonent/Session";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <Wrapper>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
       
        <Navbar/>
        <div className="min-h-[84.5vh] bg-slate-950">
            {children}
        </div>
        <Footer />
       
      </body>
      </Wrapper>
    </html>
  );
}

