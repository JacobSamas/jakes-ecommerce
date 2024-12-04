'use client';

import { useRef, useEffect, useState } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import Image from 'next/image';

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: 'Jane Doe',
      title: 'Happy Customer',
      image: 'https://via.placeholder.com/100',
      quote: 'This shop has the best products I’ve ever bought! Highly recommended!',
    },
    {
      id: 2,
      name: 'John Smith',
      title: 'Satisfied Client',
      image: 'https://via.placeholder.com/100',
      quote: 'Fast delivery and excellent customer service. I will shop here again!',
    },
    {
      id: 3,
      name: 'Sarah Brown',
      title: 'Frequent Buyer',
      image: 'https://via.placeholder.com/100',
      quote: 'The quality of products is outstanding, and the prices are unbeatable.',
    },
    {
      id: 4,
      name: 'Michael Lee',
      title: 'Verified Buyer',
      image: 'https://via.placeholder.com/100',
      quote: 'Shopping here has always been a pleasure. Great deals and quality products!',
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

  return (
    <section className="py-16 bg-darkBlack">
      <div className="container mx-auto px-6 relative">
        <h2 className="text-4xl font-bold text-lightGray text-center mb-8">
          What Our Customers Say
        </h2>

        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-darkBlack text-teal p-3 rounded-full shadow-lg hover:bg-teal hover:text-darkBlack transition z-10"
          >
            <AiOutlineLeft size={24} />
          </button>
        )}

        {/* Scrollable Testimonials */}
        <div
          ref={scrollRef}
          className="flex overflow-x-scroll scroll-smooth no-scrollbar space-x-4"
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="min-w-[250px] w-[250px] flex-shrink-0 bg-lightGray text-darkBlack rounded-lg shadow-md p-4 flex flex-col items-center"
            >
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                width={60}
                height={60}
                className="rounded-full mb-3"
              />
              <p className="italic mb-3 text-center text-sm">&quot;{testimonial.quote}&quot;</p>
              <h3 className="text-lg font-bold">{testimonial.name}</h3>
              <p className="text-xs text-teal">{testimonial.title}</p>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-darkBlack text-teal p-3 rounded-full shadow-lg hover:bg-teal hover:text-darkBlack transition z-10"
          >
            <AiOutlineRight size={24} />
          </button>
        )}
      </div>
    </section>
  );
}
