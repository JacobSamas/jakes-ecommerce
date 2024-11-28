'use client';

import { useParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { addItem } from '../../redux/slices/cartSlice';
import { useEffect, useState, useRef } from 'react';
import { products } from '../../dummydata/dummyData';
import Image from 'next/image';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

export default function ProductDetailsPage() {
  const { id } = useParams(); // Get dynamic route parameter
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  useEffect(() => {
    // Simulate fetching the product based on ID
    const selectedProduct = products.find((item) => item.id.toString() === id);
    setProduct(selectedProduct);
  }, [id]);

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
    toast.success(`${product.name} added to cart!`, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  };

  // Related Products Scrolling
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

  if (!product) {
    return <p className="text-lightGray text-center mt-16">Loading product details...</p>;
  }

  const relatedProducts = products.filter((item) => item.id !== product.id).slice(0, 4);

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Image */}
        <div className="w-full lg:w-1/2">
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>

        {/* Product Info */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <h1 className="text-3xl font-bold text-lightGray mb-4">{product.name}</h1>
          <p className="text-teal text-xl font-bold mb-4">${product.price.toFixed(2)}</p>
          <p className="text-lightGray mb-8">{product.description}</p>

          <button
            className="bg-teal text-darkBlack font-bold px-6 py-3 rounded-md hover:bg-green transition"
            onClick={() => handleAddToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-lightGray mb-8">Related Products</h2>
        <div className="relative">
          {/* Left Arrow */}
          {showLeftArrow && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 bg-darkBlack text-teal p-3 rounded-full shadow-lg hover:bg-teal hover:text-darkBlack transition z-10 hidden md:block"
            >
              <AiOutlineLeft size={24} />
            </button>
          )}

          {/* Scrollable Related Products */}
          <div
            ref={scrollRef}
            className="flex overflow-x-scroll scroll-smooth no-scrollbar space-x-4"
          >
            {relatedProducts.map((related) => (
              <div
                key={related.id}
                className="min-w-[250px] w-[250px] flex-shrink-0 bg-darkBlack text-lightGray rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <Image
                  src={related.image}
                  alt={related.name}
                  width={250}
                  height={150}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-bold">{related.name}</h3>
                  <p className="text-teal font-bold mt-2">${related.price.toFixed(2)}</p>
                  <button
                    className="mt-4 px-4 py-2 bg-teal text-white font-bold rounded-md hover:bg-green transition"
                    onClick={() => handleAddToCart(related)}
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
      </div>
    </div>
  );
}
