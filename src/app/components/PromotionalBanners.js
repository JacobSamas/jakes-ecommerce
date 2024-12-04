'use client';

import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PromotionalBanners() {
  const router = useRouter();
  const banners = [
    {
        title: "Up to 50% Off on Electronics",
        description: "Don't miss out on our biggest sale of the year!",
        bgColor: "bg-gradient-to-r from-cyan-500 to-blue-700",
        textColor: "text-white",
      },
      
    {
      title: "New Arrivals in Fashion",
      description: "Stay trendy with our latest collection.",
      bgColor: "bg-gradient-to-r from-purple-500 to-pink-500",
      textColor: "text-white",
    },
    {
      title: "Winter Essentials Sale",
      description: "Get cozy with discounts on winter must-haves.",
      bgColor: "bg-gradient-to-r from-yellow-500 to-orange-500",
      textColor: "text-darkBlack",
    },
  ];

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

  const handleShopNow = () => {
    router.push('/shop');
  };

  return (
    <section className="py-16 bg-darkBlack">
      <div className="container mx-auto px-6 relative">
        <h2 className="text-4xl font-bold text-lightGray text-center mb-8">
          Special Promotions
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

        {/* Scrollable Banners */}
        <div
          ref={scrollRef}
          className="flex overflow-x-scroll scroll-smooth no-scrollbar space-x-4"
        >
          {banners.map((banner, index) => (
            <div
              key={index}
              className={`min-w-[300px] sm:min-w-[400px] lg:min-w-[500px] rounded-lg shadow-md p-6 ${banner.bgColor}`}
            >
              <h3 className={`text-xl font-bold mb-2 ${banner.textColor}`}>
                {banner.title}
              </h3>
              <p className={`mb-4 ${banner.textColor}`}>
                {banner.description}
              </p>
              <button
                onClick={handleShopNow}
                className={`px-4 py-2 rounded-md font-bold ${
                  banner.textColor === "text-white"
                    ? "bg-white text-darkBlack"
                    : "bg-darkBlack text-white"
                } hover:opacity-90 transition`}
              >
                Shop Now
              </button>
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
