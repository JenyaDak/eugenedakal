"use client"; // важливо для використання хуків в Next.js

import { useCart } from "../../contexts/cartContext"; // імпортуємо useCart
import { useEffect, useState } from "react"; // імпортуємо useState та useEffect

// Оголошення типу для продукту
interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

const ProductsPage = () => {
  const { addToCart } = useCart(); // отримуємо функцію додавання в кошик
  const [products, setProducts] = useState<Product[]>([]); // типізація для products
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
          setProducts(data); // оновлюємо список продуктів
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products.");
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart(product); // додаємо продукт до кошика
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
              <button
                onClick={() => handleAddToCart(product)} // додаємо товар у кошик
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Add to Cart
              </button>
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
