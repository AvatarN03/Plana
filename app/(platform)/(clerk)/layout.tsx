"use client";
import Image from "next/image";
import Link from "next/link";


const Layout = ({ children }: { children: React.ReactNode }) => {
  return (

    <div className="w-full h-screen flex justify-center items-center ">
      <div className="hidden  w-1/2 xl:w-2/3 h-full relative md:flex justify-center items-center bg-linear-to-r from-blue-100 to-indigo-300">
        <Image
          src="/login-banner.png"
          alt="login"
          width={650}
          height={650}
          className="mix-blend-multiply"
        />
      </div>
      <div className="w-full md:w-1/2 xl:w-1/3 flex justify-center bg-indigo-800  items-center h-full flex-col gap-5">
        <Link href={"/"}>
          <h1 className="text-4xl font-semibold text-center mb-4 text-white">Plana</h1>
        </Link>
        {children}
      </div>
    </div>
  )
}

export default Layout;