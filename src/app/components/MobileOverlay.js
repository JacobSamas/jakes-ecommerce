'use client';

import Link from 'next/link';
import { AiOutlineClose } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { toast } from 'react-toastify';

export default function MobileOverlay({ closeMenu }) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully!', { theme: 'dark' });
    closeMenu(); // Close menu after logout
  };

  return (
    <div
      className="fixed inset-0 flex justify-end z-50"
      aria-hidden="true"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={closeMenu}
      ></div>

      {/* Side Drawer */}
      <div
        className="w-1/2 h-full bg-darkBlack text-lightGray shadow-lg flex flex-col p-6 space-y-8 transition-transform transform translate-x-0"
      >
        {/* Close Button */}
        <button
          className="self-end text-teal text-3xl hover:scale-110 transition-transform"
          onClick={closeMenu}
          aria-label="Close Menu"
        >
          <AiOutlineClose />
        </button>

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-4 text-xl font-semibold">
          <Link href="/" onClick={closeMenu} className="hover:text-teal transition">
            Home
          </Link>
          <Link href="/shop" onClick={closeMenu} className="hover:text-teal transition">
            Shop
          </Link>
          <Link href="/about" onClick={closeMenu} className="hover:text-teal transition">
            About
          </Link>
          <Link href="/contact" onClick={closeMenu} className="hover:text-teal transition">
            Contact
          </Link>
        </nav>

        {/* Login/Logout */}
        <div className="mt-auto">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="w-full text-center text-teal font-bold py-2 hover:underline transition"
            >
              Log Out
            </button>
          ) : (
            <Link
              href="/auth/login"
              onClick={closeMenu}
              className="block text-center text-teal font-bold py-2 hover:underline transition"
            >
              Log In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
