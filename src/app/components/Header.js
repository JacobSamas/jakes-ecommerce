'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AiOutlineMenu, AiOutlineClose, AiOutlineShoppingCart, AiOutlineSearch, AiOutlineUser } from 'react-icons/ai';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-darkBlack text-lightGray shadow-md sticky top-0 z-50">
      {/* Header Top Bar */}
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-teal text-2xl font-bold">
          <Link href="/">Jake&apos;s Shop</Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-teal transition">
            Home
          </Link>
          <Link href="/shop" className="hover:text-teal transition">
            Shop
          </Link>
          <Link href="/about" className="hover:text-teal transition">
            About
          </Link>
          <Link href="/contact" className="hover:text-teal transition">
            Contact
          </Link>
        </nav>

        {/* Icons */}
        <div className="hidden lg:flex items-center space-x-4">
          <div className="bg-lightGray text-darkBlack rounded-md px-4 py-2 flex items-center">
            <input
              type="text"
              placeholder="Search products..."
              className="bg-transparent outline-none flex-grow"
            />
            <AiOutlineSearch className="text-teal" size={20} />
          </div>
          <Link href="/cart" className="relative hover:text-teal transition">
            <AiOutlineShoppingCart size={24} />
            <span className="absolute -top-2 -right-2 bg-teal text-darkBlack text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              3
            </span>
          </Link>
          <Link href="/profile" className="hover:text-teal transition">
            <AiOutlineUser size={24} />
          </Link>
        </div>

        {/* Hamburger Menu Button */}
        <button
          className="md:hidden text-teal text-2xl"
          onClick={() => setIsMenuOpen(true)}
        >
          <AiOutlineMenu />
        </button>
      </div>

      {/* Hamburger Menu Full-Screen Overlay */}
      <div
        className={`fixed inset-0 bg-darkBlack bg-opacity-95 text-lightGray z-50 flex flex-col items-center justify-center transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close Button */}
        <button
          className="absolute top-5 right-5 text-teal text-2xl"
          onClick={() => setIsMenuOpen(false)}
        >
          <AiOutlineClose />
        </button>

        {/* Fully Stacked Content */}
        <div className="flex flex-col items-center space-y-6 text-center">
          {/* Navigation Links */}
          <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-2xl hover:text-teal transition">
            Home
          </Link>
          <Link href="/shop" onClick={() => setIsMenuOpen(false)} className="text-2xl hover:text-teal transition">
            Shop
          </Link>
          <Link href="/about" onClick={() => setIsMenuOpen(false)} className="text-2xl hover:text-teal transition">
            About
          </Link>
          <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="text-2xl hover:text-teal transition">
            Contact
          </Link>

          {/* Search Bar */}
          <div className="bg-lightGray text-darkBlack rounded-md px-4 py-3 flex items-center w-10/12 max-w-md">
            <input
              type="text"
              placeholder="Search products..."
              className="bg-transparent outline-none flex-grow"
            />
            <AiOutlineSearch className="text-teal" size={24} />
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6">
            <Link href="/cart" onClick={() => setIsMenuOpen(false)} className="hover:text-teal transition">
              <AiOutlineShoppingCart size={30} />
            </Link>
            <Link href="/profile" onClick={() => setIsMenuOpen(false)} className="hover:text-teal transition">
              <AiOutlineUser size={30} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
