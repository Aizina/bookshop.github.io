"use client";
import React, { useState} from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import Login from "./Login";
import Image from 'next/image';
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const Header = () => {
  const pathname = usePathname();
  const [showLogin, setShowLogin] = useState(false);

  const { cartItems } = useSelector((state: RootState) => state.cart);

  const toggleLogin = () => {
    setShowLogin(!showLogin);
  }

  return (
    <header className="w-full text-[#1C2A39]">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
    
        <div className="text-3xl font-bold ">
          Bookshop
        </div>

        <nav className="hidden md:flex space-x-6 uppercase">
          <Link href="/" className={`${pathname === '/' ? 'font-bold' : ''} hover:text-gray-900 transition-colors`}>
              Books
          </Link>          
          <Link href=""> Audiobooks</Link>
          <Link href=""> Stationery & Gifts </Link>
          <Link href=""> Blog </Link>
        </nav>

        <div className="flex relative items-center space-x-6" >
            <Image
              src="/icons/user.svg"
              alt="User"
              width={15}
              height={15}
              className="cursor-pointer"
              onClick={toggleLogin}
            />
                {showLogin &&<div className="absolute top-11 right-2 z-10">
                <Login />
              </div> }
            <Link href="/user">
          </Link>

          <Link href="/cart">
          <div className="relative">
            <Image
                src="/icons/cart.svg"
                alt="Cart"
                className="cursor-pointer"
                width={15}
                height={15}
              /> 
          
              <div className="absolute rounded-full bg-[#FF353A] w-6 h-6 top-4 right-[-5px] text-center text-white">{cartItems.length}</div>
          </div>
   
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
