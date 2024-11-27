'use client'; 

import Image from 'next/image';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { useRef, useState, useEffect } from 'react';

const categories = [
  { id: 1, name: 'Electronics', image: 'https://via.placeholder.com/400x300?text=Electronics' },
  { id: 2, name: 'Fashion', image: 'https://via.placeholder.com/400x300?text=Fashion' },
  { id: 3, name: 'Home & Living', image: 'https://via.placeholder.com/400x300?text=Home+%26+Living' },
  { id: 4, name: 'Sports', image: 'https://via.placeholder.com/400x300?text=Sports' },
  { id: 5, name: 'Books', image: 'https://via.placeholder.com/400x300?text=Books' },
  { id: 6, name: 'Toys', image: 'https://via.placeholder.com/400x300?text=Toys' },
];

export default function FeaturedCategories() {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

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

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      current.scrollBy({
        left: direction === 'left' ? -300 : 300,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-16 bg-darkBlack">
      <div className="container mx-auto px-6 relative">
        <h2 className="text-4xl font-bold text-lightGray mb-8 text-center">
          Featured Categories
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
          {categories.map((category) => (
            <div
              key={category.id}
              className="min-w-[250px] w-[250px] flex-shrink-0 bg-lightGray rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-40 w-full">
                <Image
                  src={category.image}
                  alt={category.name}
                  layout="fill"
                  objectFit="cover"
                  className="hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-bold text-darkBlack">{category.name}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2  bg-darkBlack text-teal p-3 rounded-full shadow-lg hover:bg-teal hover:text-darkBlack transition z-10 hidden md:block"
          >
            <AiOutlineRight size={24} />
          </button>
        )}
      </div>
    </section>
  );
}
