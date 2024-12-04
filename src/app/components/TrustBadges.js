'use client';

import { FaShippingFast, FaRegCreditCard, FaSyncAlt, FaShieldAlt } from 'react-icons/fa';
import { useRef, useEffect, useState } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

export default function TrustBadges() {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const badges = [
    {
      icon: <FaShippingFast size={40} />,
      title: "Fast Delivery",
      description: "Get your orders delivered in no time.",
    },
    {
      icon: <FaRegCreditCard size={40} />,
      title: "Secure Payments",
      description: "Your payment information is safe with us.",
    },
    {
      icon: <FaSyncAlt size={40} />,
      title: "Easy Returns",
      description: "Hassle-free returns on all orders.",
    },
    {
      icon: <FaShieldAlt size={40} />,
      title: "Buyer Protection",
      description: "Shop confidently with guaranteed protection.",
    },
  ];

  // Handle arrow visibility
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

  // Handle scroll direction
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
        <h2 className="text-4xl font-bold text-lightGray text-center mb-8">
          Why Shop With Us?
        </h2>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="bg-lightGray text-darkBlack rounded-lg shadow-md p-6 flex flex-col items-center"
            >
              <div className="text-teal mb-4">{badge.icon}</div>
              <h3 className="text-lg font-bold mb-2">{badge.title}</h3>
              <p className="text-center">{badge.description}</p>
            </div>
          ))}
        </div>

        {/* Mobile/Tablet Horizontal Scroll */}
        <div className="md:hidden relative">
          {/* Left Arrow */}
          {showLeftArrow && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 bg-darkBlack text-teal p-3 rounded-full shadow-lg hover:bg-teal hover:text-darkBlack transition z-10"
            >
              <AiOutlineLeft size={24} />
            </button>
          )}

          {/* Scrollable Cards */}
          <div
            ref={scrollRef}
            className="flex overflow-x-scroll scroll-smooth no-scrollbar space-x-4"
          >
            {badges.map((badge, index) => (
              <div
                key={index}
                className="min-w-[250px] w-[250px] flex-shrink-0 bg-lightGray text-darkBlack rounded-lg shadow-md p-6 flex flex-col items-center"
              >
                <div className="text-teal mb-4">{badge.icon}</div>
                <h3 className="text-lg font-bold mb-2">{badge.title}</h3>
                <p className="text-center">{badge.description}</p>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          {showRightArrow && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 bg-darkBlack text-teal p-3 rounded-full shadow-lg hover:bg-teal hover:text-darkBlack transition z-10"
            >
              <AiOutlineRight size={24} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
