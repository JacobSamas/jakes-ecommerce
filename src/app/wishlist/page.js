'use client';

import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../redux/slices/wishlistSlice';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function WishlistPage() {
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  const handleRemove = (item) => {
    dispatch(removeFromWishlist(item));
    toast.success(`${item.name} removed from wishlist`, { theme: 'dark' });
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-darkBlack text-lightGray">
        <h1 className="text-4xl font-bold text-teal mb-4">Your Wishlist</h1>
        <p className="text-lightGray mb-6">Your wishlist is empty.</p>
        <Link href="/shop">
          <button className="px-6 py-3 bg-teal text-darkBlack font-bold rounded-md hover:bg-green transition">
            Continue Shopping
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-16 text-lightGray">
      <h1 className="text-4xl font-bold text-teal mb-8 text-center">Your Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlistItems.map((item) => (
          <div
            key={item.id}
            className="bg-darkBlack text-lightGray rounded-lg shadow-md overflow-hidden"
          >
            <Image
              src={item.image}
              alt={item.name}
              width={300}
              height={200}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold">{item.name}</h3>
              <p className="text-teal font-bold mt-2">${item.price.toFixed(2)}</p>
              <div className="mt-4 flex justify-between items-center">
                <Link href={`/product/${item.id}`}>
                  <button className="px-4 py-2 bg-teal text-darkBlack font-bold rounded-md hover:bg-green transition">
                    View
                  </button>
                </Link>
                <button
                  onClick={() => handleRemove(item)}
                  className="px-4 py-2 bg-red-600 text-white font-bold rounded-md hover:bg-red-700 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
