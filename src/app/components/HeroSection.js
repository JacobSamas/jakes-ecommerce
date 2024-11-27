"use client"; 
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <motion.div
      className="relative bg-gradient-to-r from-blue to-teal h-[80vh] flex items-center justify-center text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      ></div>

      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-6"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <h1 className="text-5xl md:text-7xl font-bold text-lightGray leading-tight">
          Discover <span className="text-teal">Amazing Products</span> at
          Unbeatable Prices
        </h1>
        <p className="mt-4 text-lg text-lightGray md:text-xl">
          Upgrade your lifestyle with our curated collections, just for you.
        </p>
        <div className="mt-8 space-x-4">
          <motion.button
            className="px-6 py-3 bg-teal text-darkBlack font-bold rounded-md hover:bg-green transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Shop Now
          </motion.button>
          <motion.button
            className="px-6 py-3 bg-transparent border-2 border-teal text-teal font-bold rounded-md hover:bg-teal hover:text-darkBlack transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Collections
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
