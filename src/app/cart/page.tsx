"use client";

import React from "react";
import { useCart } from "../../contexts/cartContext";

export default function Cart(): React.JSX.Element {
  const { cart, removeFromCart } = useCart();

  const handleRemoveFromCart = (productId: string) => {
    removeFromCart(productId);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="mt-4 text-gray-600">Your cart is currently empty.</p>
      ) : (
        <div>
          <ul>
            {cart.map((product) => (
              <li key={product._id} className="border-b py-4">
                <h2 className="text-xl">{product.name}</h2>
                <p>{product.price} USD</p>
                <button
                  onClick={() => handleRemoveFromCart(product._id)}
                  className="mt-2 text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
