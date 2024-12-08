"use client"
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Montserrat } from 'next/font/google';
import Head from "next/head";

const font = Montserrat({
  weight: ["400"],
  subsets: ["latin", "cyrillic"],
})


export default function UserPage() {

  const { email } = useSelector((state: RootState) => state.auth);

  if (!email) {
    return <div className="min-h-screen flex justify-center items-center">Loading...</div>;
  }

    return (
      <>
        <Head>
          <title>User Page</title>
          <meta name="description" content="User Page" />
          <meta name="author" content="Aizat A" />
        </Head>
        <div className={`${font.className} min-h-screen flex flex-col items-center gap-4 md:flex-row md:justify-around mt-6 p-3`}>
          <div className="w-1/2" >
              <h1 className="text-lg md:text-2xl font-bold uppercase">Profile</h1>
            <div className="flex flex-col items-center md:flex-row md:justify-around">
              <Image src='/profile.png' alt='User Photo' width={150} height={150}/>
              <div className="flex flex-col gap-2" >
                <h2 className="font-bold text-sm uppercase"> Your name</h2>
                <p className="font-bold text-lg md:text-2xl pb-6">John Smith</p>
                <h2 className="font-bold text-sm uppercase">Your email</h2>
                <p className="font-bold text-lg md:text-2xl">{email}</p>
                <button className="text-[#4C3DB2] font-bold uppercase border-solid border-[1px] border-[#4C3DB2] px-4 py-2 m-auto mt-8 w-64">EDIT PROFILE</button>
              </div>
            </div>
          </div>
          <div className="w-80 h-80 md:w-96 md:h-96 bg-[#FFE0E2] p-6 flex flex-col items-center gap-2">
            <h2 className="font-bold text-black">ABOUT ME</h2>
            <p className="font-semibold text-[#5C6A79]"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in ante consequat, ornare nisi et, ultrices libero. Nunc nibh dolor, maximus quis auctor nec, tempor quis ipsum. Proin mollis pellentesque nulla ac varius.</p>
          </div>
        </div>
      </>

    );
  }
  