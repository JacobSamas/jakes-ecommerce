'use client';

import Image from 'next/image';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/slices/cartSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Dummy Products
const products = [
  { id: 1, name: 'Wireless Headphones', price: 59.99, image: 'https://via.placeholder.com/400x300?text=Headphones' },
  { id: 2, name: 'Smartwatch', price: 129.99, image: 'https://via.placeholder.com/400x300?text=Smartwatch' },
  { id: 3, name: 'Gaming Mouse', price: 39.99, image: 'https://via.placeholder.com/400x300?text=Mouse' },
  { id: 4, name: 'Bluetooth Speaker', price: 89.99, image: 'https://via.placeholder.com/400x300?text=Speaker' },
  { id: 5, name: 'Laptop Stand', price: 29.99, image: 'https://via.placeholder.com/400x300?text=Laptop+Stand' },
  { id: 6, name: 'Tablet', price: 249.99, image: 'https://via.placeholder.com/400x300?text=Tablet' },
];

export default function FeaturedProducts() {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const dispatch = useDispatch();

  // Check Scroll Position for Arrow Visibility
  const checkScroll = () => {
    const { current } = scrollRef;
    if (current) {
      setShowLeftArrow(current.scrollLeft > 0);
      setShowRightArrow(current.scrollLeft < current.scrollWidth - current.clientWidth);
    }
  };

  useEffect(() => {
    const { current } = scrollRef;
    if (current) {
      checkScroll();
      current.addEventListener('scroll', checkScroll);
      return () => current.removeEventListener('scroll', checkScroll);
    }
  }, []);

  // Scroll Left or Right
  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      current.scrollBy({
        left: direction === 'left' ? -300 : 300,
        behavior: 'smooth',
      });
    }
  };

  // Handle Add to Cart
  const handleAddToCart = (product) => {
    dispatch(addItem(product));
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <section className="py-16 bg-darkBlack">
      <div className="container mx-auto px-6 relative">
        <h2 className="text-4xl font-bold text-lightGray mb-8 text-center">
          Featured Products
        </h2>

        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 bg-darkBlack text-teal p-3 rounded-full shadow-lg hover:bg-teal hover:text-darkBlack transition z-10 hidden md:block"
          >
            <AiOutlineLeft size={24} />
          </button>
        )}

        {/* Scrollable Cards */}
        <div
          ref={scrollRef}
          className="flex overflow-x-scroll scroll-smooth no-scrollbar space-x-4"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="min-w-[250px] w-[250px] flex-shrink-0 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-40 w-full">
                <Image
                  src={product.image}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-bold text-darkBlack">{product.name}</h3>
                <p className="text-teal font-bold mt-2">${product.price.toFixed(2)}</p>
                <button
                  className="mt-4 px-4 py-2 bg-teal text-white font-bold rounded-md hover:bg-green transition"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 bg-darkBlack text-teal p-3 rounded-full shadow-lg hover:bg-teal hover:text-darkBlack transition z-10 hidden md:block"
          >
            <AiOutlineRight size={24} />
          </button>
        )}
      </div>
    </section>
  );
}
