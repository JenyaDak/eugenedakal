"use client";

import React from "react";

export default function SuccessPage(): React.JSX.Element {
  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Thank You for Your Purchase!
      </h1>
      <p className="text-lg text-gray-600 text-center mb-6">
        Your order has been successfully completed. A confirmation email has
        been sent to your inbox.
      </p>
      <div className="text-center">
        <a
          href="/products"
          className="px-6 py-3 bg-black text-white font-semibold hover:bg-gray-800"
        >
          Continue Shopping
        </a>
      </div>
    </div>
  );
}
