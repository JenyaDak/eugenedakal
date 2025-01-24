"use client";

import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useCart } from "../../contexts/cartContext";
import { useRouter } from "next/navigation";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function CheckoutPage(): React.JSX.Element {
  const { cart } = useCart();
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cart.length === 0) {
      router.push("/cart");
      return;
    }

    // Підрахунок загальної суми корзини
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    // Створення PaymentIntent
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setClientSecret(data.clientSecret); // Збереження clientSecret
        }
      })
      .catch(() => setError("Failed to initialize payment."));
  }, [cart, router]);

  if (!clientSecret) return <div>Loading checkout...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col md:flex-row gap-8 p-8">
      {/* Ліва частина */}
      <div className="flex-1 bg-white shadow rounded p-6">
        <h2 className="text-xl font-bold mb-4">Payment & Discounts</h2>
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          {" "}
          {/* Передача clientSecret */}
          <CheckoutForm />
        </Elements>
      </div>

      {/* Права частина */}
      <div className="w-full md:w-1/3 bg-gray-100 shadow rounded p-6">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <ul className="space-y-4">
          {cart.map((item) => (
            <li
              key={item._id}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-600">
                  £{item.price.toFixed(2)}
                </p>
              </div>
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
            </li>
          ))}
        </ul>
        <div className="mt-6 border-t pt-4">
          <div className="flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span>
              £{cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
