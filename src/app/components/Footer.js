'use client';

import { AiFillFacebook, AiFillInstagram } from 'react-icons/ai'; 
import { FaTwitter } from 'react-icons/fa'; 

export default function Footer() {
  return (
    <footer className="bg-darkBlack text-lightGray py-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between items-center mb-6">
          {/* Quick Links */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-teal mb-4">Jake&apos;s Shop</h2>
            <ul className="space-y-2">
              <li><a href="/about" className="hover:text-teal transition">About Us</a></li>
              <li><a href="/contact" className="hover:text-teal transition">Contact Us</a></li>
              <li><a href="/privacy" className="hover:text-teal transition">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-teal transition">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-4">Subscribe to our Newsletter</h3>
            <form className="flex items-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-2 rounded-l-md bg-lightGray text-darkBlack outline-none"
              />
              <button className="px-4 py-2 bg-teal text-darkBlack font-bold rounded-r-md hover:bg-green transition">
                Subscribe
              </button>
            </form>
          </div>

          {/* Social Media Icons */}
          <div className="w-full md:w-1/3 flex justify-center md:justify-end">
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" className="text-teal text-2xl hover:text-green transition">
                <AiFillFacebook />
              </a>
              <a href="https://instagram.com" target="_blank" className="text-teal text-2xl hover:text-green transition">
                <AiFillInstagram />
              </a>
              <a href="https://twitter.com" target="_blank" className="text-teal text-2xl hover:text-green transition">
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center text-sm text-lightGray/80 border-t border-lightGray/30 pt-6">
          © 2024 Jake&apos;s Shop. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
