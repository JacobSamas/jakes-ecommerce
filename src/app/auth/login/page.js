'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slices/authSlice';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation'; // Import useRouter
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter(); // Initialize useRouter

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please fill in all fields', { theme: 'dark' });
      return;
    }

    // Simulated login
    const user = { email };
    dispatch(login(user));

    toast.success('Login successful!', { theme: 'dark' });

    // Redirect to Home Page
    router.push('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-darkBlack text-lightGray">
      <div className="w-full max-w-md bg-lightGray text-darkBlack rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-teal">Login</h1>
        <form onSubmit={handleLogin}>
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

          <div className="mb-6 relative">
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

          <button
            type="submit"
            className="w-full bg-teal text-white font-bold py-2 rounded-md hover:bg-green transition"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <p>
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" className="text-teal hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
