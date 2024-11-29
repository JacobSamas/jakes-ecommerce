'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AiOutlineMenu, AiOutlineShoppingCart, AiOutlineSearch, AiOutlineUser } from 'react-icons/ai';
import MobileOverlay from './MobileOverlay';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { toast } from 'react-toastify';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully!', { theme: 'dark' });
  };

  return (
    <header className="bg-darkBlack text-lightGray shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex flex-wrap lg:flex-nowrap justify-between items-center">
        {/* Logo */}
        <div className="flex items-center justify-between w-full lg:w-auto">
          <div className="text-teal text-2xl font-bold">
            <Link href="/">Jake&apos;s Shop</Link>
          </div>
          {/* Cart, User, and Hamburger Menu (Mobile/Tablet) */}
          <div className="flex items-center space-x-4 lg:hidden">
            <Link href="/cart" className="relative hover:text-teal transition">
              <AiOutlineShoppingCart size={24} />
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-teal text-darkBlack text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
            </Link>
            <Link href={isAuthenticated ? '/profile' : '/auth/login'} className="hover:text-teal transition">
              <AiOutlineUser size={24} />
            </Link>
            <button
              className="text-teal text-2xl"
              onClick={() => setIsMenuOpen(true)}
            >
              <AiOutlineMenu />
            </button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-6">
          <Link href="/shop" className="hover:text-teal transition">
            Shop
          </Link>
          <Link href="/about" className="hover:text-teal transition">
            About
          </Link>
          <Link href="/contact" className="hover:text-teal transition">
            Contact
          </Link>
          {isAuthenticated ? (
            <button
              className="hover:text-teal transition"
              onClick={handleLogout}
            >
              Log Out
            </button>
          ) : (
            <Link href="/auth/login" className="hover:text-teal transition">
              Log In
            </Link>
          )}
        </nav>

        {/* Search Bar and Icons (Desktop) */}
        <div className="flex flex-wrap lg:flex-nowrap w-full lg:w-auto items-center lg:space-x-4 space-y-4 lg:space-y-0">
          {/* Search Bar */}
          <div className="flex items-center bg-lightGray text-darkBlack rounded-md px-4 py-2 w-full lg:w-auto">
            <input
              type="text"
              placeholder="Search products..."
              className="bg-transparent outline-none flex-grow text-sm lg:text-base"
            />
            <AiOutlineSearch className="text-teal" size={20} />
          </div>
          {/* Cart and Profile Icons (Desktop) */}
          <div className="hidden lg:flex items-center space-x-4 lg:ml-4">
            <Link href="/cart" className="relative hover:text-teal transition">
              <AiOutlineShoppingCart size={24} />
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-teal text-darkBlack text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
            </Link>
            <Link href={isAuthenticated ? '/profile' : '/auth/login'} className="hover:text-teal transition">
              <AiOutlineUser size={24} />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMenuOpen && <MobileOverlay closeMenu={() => setIsMenuOpen(false)} />}
    </header>
  );
}
