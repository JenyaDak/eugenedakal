"use client";

import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useCart } from "../../contexts/cartContext";

export default function CheckoutForm(): React.JSX.Element {
  const stripe = useStripe();
  const elements = useElements();
  const { clearCart } = useCart();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setError("Stripe is not loaded.");
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
      },
    });

    if (error) {
      setError(error.message || "An error occurred.");
    } else {
      clearCart(); // Очищуємо корзину після успішної оплати
      setError(null);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handlePaymentSubmit} className="space-y-6">
      <PaymentElement options={{ layout: "accordion" }} />
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className={`w-full px-6 py-3 text-white font-semibold rounded ${
          loading ? "bg-gray-500" : "bg-black hover:bg-gray-800"
        }`}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
}
