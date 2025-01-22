"use client";

import { useEffect, useState } from "react";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
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

  return (
    <div>
      {error && <div>{error}</div>}
      {products.length > 0 ? (
        products.map((product: any) => (
          <div key={product._id} className="product">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>{product.price}</p>
          </div>
        ))
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
};

export default ProductsPage;
