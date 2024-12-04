'use client';

import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function OrderConfirmationPage() {
  const router = useRouter();
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    // Generate a random order ID
    const generatedId = `ORD-${Math.floor(Math.random() * 1000000)}`;
    setOrderId(generatedId);

    if (cartItems.length === 0) {
      toast.error('No items in the cart. Redirecting...', { theme: 'dark' });
      setTimeout(() => router.push('/cart'), 3000);
    }
  }, [cartItems, router]);

  if (cartItems.length === 0) {
    return <p className="text-lightGray text-center mt-16">Redirecting to cart...</p>;
  }

  return (
    <div className="container mx-auto px-6 py-16 text-lightGray">
      <div className="max-w-4xl mx-auto bg-darkBlack p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-teal mb-6">
          Thank You for Your Purchase!
        </h1>

        {/* Order Details */}
        <div className="mb-8">
          <p className="text-center text-lg">
            Your order <span className="font-bold">{orderId}</span> has been confirmed.
          </p>
          <p className="text-center text-lg">
            You will receive an email confirmation shortly.
          </p>
        </div>

        {/* Order Summary */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-bold">{item.name}</p>
                  <p className="text-sm">Quantity: {item.quantity}</p>
                </div>
                <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t pt-4">
            <p className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</p>
          </div>
        </div>

        {/* Next Steps */}
        <div className="text-center space-y-4">
          <Link href="/">
            <button className="bg-teal text-darkBlack font-bold px-4 py-2 rounded-md hover:bg-green transition">
              Continue Shopping
            </button>
          </Link>
          <Link href="/profile">
            <button className="bg-lightGray text-darkBlack font-bold px-4 py-2 rounded-md hover:bg-gray-400 transition">
              View Your Orders
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
