"use client";

import { useSelector } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const router = useRouter();
  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (
      !shippingDetails.name ||
      !shippingDetails.address ||
      !shippingDetails.city ||
      !shippingDetails.state ||
      !shippingDetails.zip ||
      !paymentDetails.cardNumber ||
      !paymentDetails.expiry ||
      !paymentDetails.cvv
    ) {
      toast.error("Please fill out all required fields.", { theme: "dark" });
      return;
    }

    toast.success("Order placed successfully!", { theme: "dark" });

    setShippingDetails({
      name: "",
      address: "",
      city: "",
      state: "",
      zip: "",
    });
    setPaymentDetails({
      cardNumber: "",
      expiry: "",
      cvv: "",
    });

    router.push("/order-confirmation");
  };

  return (
    <div className="container mx-auto px-6 py-16 text-lightGray">
      <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-darkBlack p-6 rounded-lg shadow-md">
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
                <p className="font-bold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t pt-4">
            <p className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</p>
          </div>
        </div>

        {/* Shipping & Payment */}
        <div className="bg-darkBlack p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Shipping Details</h2>
          <form onSubmit={handlePlaceOrder}>
            <div className="mb-4">
              <label className="block mb-2 font-bold" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={shippingDetails.name}
                onChange={(e) =>
                  setShippingDetails({
                    ...shippingDetails,
                    name: e.target.value,
                  })
                }
                className="w-full px-4 py-2 rounded-md text-darkBlack focus:ring focus:ring-teal"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-bold" htmlFor="address">
                Address
              </label>
              <input
                id="address"
                type="text"
                value={shippingDetails.address}
                onChange={(e) =>
                  setShippingDetails({
                    ...shippingDetails,
                    address: e.target.value,
                  })
                }
                className="w-full px-4 py-2 rounded-md text-darkBlack focus:ring focus:ring-teal"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-2 font-bold" htmlFor="city">
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  value={shippingDetails.city}
                  onChange={(e) =>
                    setShippingDetails({
                      ...shippingDetails,
                      city: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 rounded-md text-darkBlack focus:ring focus:ring-teal"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 font-bold" htmlFor="state">
                  State
                </label>
                <input
                  id="state"
                  type="text"
                  value={shippingDetails.state}
                  onChange={(e) =>
                    setShippingDetails({
                      ...shippingDetails,
                      state: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 rounded-md text-darkBlack focus:ring focus:ring-teal"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-bold" htmlFor="zip">
                ZIP Code
              </label>
              <input
                id="zip"
                type="text"
                value={shippingDetails.zip}
                onChange={(e) =>
                  setShippingDetails({
                    ...shippingDetails,
                    zip: e.target.value,
                  })
                }
                className="w-full px-4 py-2 rounded-md text-darkBlack focus:ring focus:ring-teal"
                required
              />
            </div>

            <h2 className="text-2xl font-bold mb-4 mt-6">Payment Details</h2>
            <div className="mb-4">
              <label className="block mb-2 font-bold" htmlFor="cardNumber">
                Card Number
              </label>
              <input
                id="cardNumber"
                type="text"
                value={paymentDetails.cardNumber}
                onChange={(e) =>
                  setPaymentDetails({
                    ...paymentDetails,
                    cardNumber: e.target.value,
                  })
                }
                className="w-full px-4 py-2 rounded-md text-darkBlack focus:ring focus:ring-teal"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-2 font-bold" htmlFor="expiry">
                  Expiry Date
                </label>
                <input
                  id="expiry"
                  type="text"
                  value={paymentDetails.expiry}
                  onChange={(e) =>
                    setPaymentDetails({
                      ...paymentDetails,
                      expiry: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 rounded-md text-darkBlack focus:ring focus:ring-teal"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 font-bold" htmlFor="cvv">
                  CVV
                </label>
                <input
                  id="cvv"
                  type="text"
                  value={paymentDetails.cvv}
                  onChange={(e) =>
                    setPaymentDetails({
                      ...paymentDetails,
                      cvv: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 rounded-md text-darkBlack focus:ring focus:ring-teal"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-teal text-darkBlack font-bold py-2 rounded-md hover:bg-green transition"
            >
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
