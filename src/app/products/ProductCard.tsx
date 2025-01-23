"use client";

import React from "react";
import { useCart } from "../../contexts/cartContext";
import { Tooltip as ReactTooltip } from "react-tooltip";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface ProductsPageProps {
  products: Product[];
}

const ProductsPage = ({ products }: ProductsPageProps) => {
  const { addToCart, cart } = useCart();

  console.debug("This is a debug message");
  console.error("This is an error message");

  const handleAddToCart = (product: Product) => {
    console.log("cart", cart);
    const isProductInCart = cart.some((item) => item._id === product._id);

    if (isProductInCart) {
      return;
    }
    addToCart(product);
  };

  return (
    <div className="container mx-auto py-8">
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => {
            const isProductInCart = cart.some(
              (item) => item._id === product._id
            );
            return (
              <div
                key={product._id}
                className="border p-4 rounded-lg shadow-lg"
              >
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-gray-700 mt-2">{product.description}</p>
                <p className="text-lg font-bold mt-2">{product.price} USD</p>
                {isProductInCart ? (
                  <p className="text-green-500 mt-4">
                    This product is already in your cart
                  </p>
                ) : (
                  <div>
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={isProductInCart}
                      className={`mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ${
                        isProductInCart
                          ? "opacity-50 cursor-not-allowed bg-gray-400"
                          : ""
                      }`}
                      data-tip="This product is already in your cart"
                      data-for={`tooltip-${product._id}`}
                    >
                      {isProductInCart ? "Added" : "Add to Cart"}
                    </button>
                    <ReactTooltip
                      id={`tooltip-${product._id}`}
                      place="top"
                      delayShow={500}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
};

export default ProductsPage;
