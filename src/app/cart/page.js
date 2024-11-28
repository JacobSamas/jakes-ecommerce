'use client';

import { useSelector, useDispatch } from 'react-redux';
import { AiOutlinePlus, AiOutlineMinus, AiOutlineDelete } from 'react-icons/ai';
import { addItem, removeItem } from '../redux/slices/cartSlice';
import Image from 'next/image';

export default function CartPage() {
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();

  return (
    <div className="container mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-teal mb-8">Your Cart</h1>

      {/* Check if the cart is empty */}
      {cartItems.length === 0 ? (
        <p className="text-lightGray text-center text-lg">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          {/* Cart Items */}
          <div className="flex-grow">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-darkBlack text-lightGray rounded-lg shadow-md p-4 mb-4"
              >
                <div className="flex items-center gap-4">
                  {/* Product Image */}
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="rounded-md object-cover"
                  />
                  {/* Product Info */}
                  <div>
                    <h2 className="text-lg font-bold">{item.name}</h2>
                    <p className="text-teal">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                {/* Quantity Controls */}
                <div className="flex items-center gap-4">
                  <button
                    className="bg-teal text-darkBlack px-2 py-1 rounded-md hover:bg-green transition"
                    onClick={() => dispatch(removeItem(item.id))}
                  >
                    <AiOutlineMinus />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="bg-teal text-darkBlack px-2 py-1 rounded-md hover:bg-green transition"
                    onClick={() => dispatch(addItem(item))}
                  >
                    <AiOutlinePlus />
                  </button>
                </div>
                {/* Remove Item */}
                <div className="flex items-center gap-4">
                  <span className="font-bold text-lightGray">
                    ${item.totalPrice.toFixed(2)}
                  </span>
                  <button
                    className="text-red-500 hover:text-red-700 transition"
                    onClick={() => dispatch(removeItem(item.id, true))}
                  >
                    <AiOutlineDelete size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="w-full lg:w-1/3 bg-lightGray text-darkBlack rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Cart Summary</h2>
            <p className="text-lg mb-2">
              Total Items: <span className="font-bold">{totalQuantity}</span>
            </p>
            <p className="text-lg mb-4">
              Total Price: <span className="font-bold">${totalPrice.toFixed(2)}</span>
            </p>
            <button className="w-full bg-teal text-darkBlack font-bold px-4 py-2 rounded-md hover:bg-green transition">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
