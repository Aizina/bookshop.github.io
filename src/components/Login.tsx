"use client";
import { useState } from 'react';
import Link from "next/link";
import { login } from '@/store/authSlice';
import { RootState, AppDispatch } from '@/store/index';
import { useSelector, useDispatch } from 'react-redux';


export default function Login() {
 const useAppDispatch = () => useDispatch<AppDispatch>();
  const dispatch = useAppDispatch();
  const { isLoggedIn, error, errorType, loading } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    if(!isLoggedIn) {
      e.preventDefault();
    }
    dispatch(login({ email, password }));
  };

  const emailInputClasses = `w-full px-3 py-2 border-[1px] focus:outline-none focus:ring-2 ${
    errorType === 'Email' ? 'border-[#FF353A] focus:border-[#FF353A] focus:ring-[#FF353A] text-[#FF353A]' : 'border-[#4C3DB2] focus:border-[#4C3DB2] focus:ring-[#4C3DB2] text-[#4C3DB2]'
  }`;

  const passwordInputClasses = `w-full px-3 py-2 border focus:outline-none focus:ring-2 ${
    errorType === 'Password' ? 'border-[#FF353A] focus:border-[#FF353A] focus:ring-[#FF353A] text-[#FF353A]' : 'border-[#4C3DB2] focus:border-[#4C3DB2] focus:ring-[#4C3DB2] text-[#4C3DB2]'
  }`;

  return (
    <div className="flex items-center justify-center font-bold bg-white ">
      <div className="bg-white shadow-md p-6 w-64">
        <h2 className="text-2xl font-bold mb-4 text-center">Log in</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="text" id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={emailInputClasses}
              placeholder="example@gmail.com" 
            />
            
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password" id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={passwordInputClasses}
              placeholder="•••••••••" 
            />
          </div>
          {error && (
            <p className="text-[#FF353A] text-sm mb-4">
              {error}
            </p>
          )}
          {isLoggedIn  ? (
            <Link href="/user">
              <button
                type="submit"
                className="w-full bg-[#9E98DC] uppercase text-white py-3 mt-5"
              >
                Go to User Page
              </button>
            </Link>
          ) : (
            <button
              type="submit"
              className="w-full bg-[#9E98DC] uppercase text-white py-3 mt-5"
              disabled={loading}
            >
              Log In
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
