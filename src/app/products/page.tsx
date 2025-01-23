"use client";

import { useCart } from "../../contexts/cartContext";
import { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

const ProductsPage = () => {
  const { addToCart, cart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await res.json();
        if (data.message) {
          setError(data.message);
        } else {
          setProducts(data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products.");
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  return (
    <div className="container mx-auto py-8">
      {error && <div className="text-red-500">{error}</div>}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product: Product) => (
            <div key={product._id} className="border p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-700 mt-2">{product.description}</p>
              <p className="text-lg font-bold mt-2">{product.price} USD</p>
              <div>
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={cart.some((item) => item._id === product._id)}
                  className={`mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ${
                    cart.some((item) => item._id === product._id)
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  data-tooltip-content={
                    cart.some((item) => item._id === product._id)
                      ? "This product is already in your cart"
                      : ""
                  }
                  data-tooltip-id={`tooltip-${product._id}`}
                >
                  {cart.some((item) => item._id === product._id)
                    ? "Added"
                    : "Add to Cart"}
                </button>

                <Tooltip id={`tooltip-${product._id}`} place="top" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
};

export default ProductsPage;
