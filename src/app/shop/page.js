'use client';

import { useState } from 'react';
import { products } from "../dummydata/dummyData";
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/slices/cartSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ShopPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
    toast.success(`${product.name} added to cart!`, { theme: 'dark' });
  };

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'price-low-to-high') return a.price - b.price;
      if (sortBy === 'price-high-to-low') return b.price - a.price;
      return 0;
    });

  return (
    <div className="container mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-lightGray text-center mb-8">Shop</h1>

      {/* Search and Sort */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-lightGray text-darkBlack rounded-md px-4 py-2 w-full md:w-1/3 mb-4 md:mb-0"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-lightGray text-darkBlack rounded-md px-4 py-2 w-full md:w-1/4"
        >
          <option value="">Sort By</option>
          <option value="price-low-to-high">Price: Low to High</option>
          <option value="price-high-to-low">Price: High to Low</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <Link href={`/product/${product.id}`}>
              <div>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={200}
                  className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-darkBlack">{product.name}</h3>
                  <p className="text-teal font-bold mt-2">${product.price.toFixed(2)}</p>
                </div>
              </div>
            </Link>
            <button
              className="w-full bg-teal text-white font-bold py-2 rounded-b-md hover:bg-green transition"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
