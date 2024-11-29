'use client';

import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      toast.error('Please fill in all fields', { theme: 'dark' });
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match', { theme: 'dark' });
      return;
    }

    // Simulate signup success
    toast.success('Signup successful!', { theme: 'dark' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-darkBlack text-lightGray">
      <div className="w-full max-w-md bg-lightGray text-darkBlack rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-teal">Sign Up</h1>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-teal focus:border-teal"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4 relative">
            <label className="block text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-teal focus:border-teal"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="absolute top-2/3 right-3 -translate-y-2/3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible className="text-gray-600" />
              ) : (
                <AiOutlineEye className="text-gray-600" />
              )}
            </div>
          </div>

          <div className="mb-6 relative">
            <label className="block text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-teal focus:border-teal"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div
              className="absolute top-2/3 right-3 -translate-y-2/3 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible className="text-gray-600" />
              ) : (
                <AiOutlineEye className="text-gray-600" />
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-teal text-white font-bold py-2 rounded-md hover:bg-green transition"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center">
          <p>
            Already have an account?{' '}
            <Link href="/auth/login" className="text-teal hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
