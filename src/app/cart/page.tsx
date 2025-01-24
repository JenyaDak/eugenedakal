"use client";

import React from "react";
import { useCart } from "../../contexts/cartContext";
import { useRouter } from "next/navigation";

export default function Cart(): React.JSX.Element {
  const { cart, removeFromCart, clearCart } = useCart(); // Додаємо clearCart для можливих дій
  const router = useRouter();

  const calculateTotal = () => {
    return cart.reduce((total, product) => total + product.price, 0).toFixed(2);
  };

  const proceedToCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Add some products before checking out.");
      return;
    }
    router.push("/checkout");
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      {cart.length === 0 ? (
        <div className="mt-4 text-gray-600">
          <p className="text-lg">Your cart is currently empty.</p>
          <a
            href="/products"
            className="mt-4 inline-block px-4 py-2 bg-black text-white font-semibold rounded hover:bg-gray-800"
          >
            Continue Shopping
          </a>
        </div>
      ) : (
        <div>
          <div className="flex flex-col border-b pb-4">
            {cart.map((product) => (
              <div
                key={product._id}
                className="flex items-center justify-between py-4 border-b last:border-b-0"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 rounded-md object-cover"
                  />
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-lg font-medium">
                    £{product.price.toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeFromCart(product._id)}
                    className="text-red-500 hover:underline"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-between items-center">
            <p className="text-lg font-medium">Subtotal</p>
            <p className="text-xl font-bold">£{calculateTotal()}</p>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={proceedToCheckout}
              className="px-6 py-3 bg-black text-white font-semibold hover:bg-gray-800"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
