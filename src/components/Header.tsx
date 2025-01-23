"use client";

import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { usePathname } from "next/navigation";
import { useCart } from "../contexts/cartContext";
import Link from "next/link";

export default function Header(): React.JSX.Element {
  const [searchOpen, setSearchOpen] = useState(false);
  const { cart } = useCart();
  const pathname = usePathname();

  return (
    <header className="bg-white shadow relative z-10">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-gray-800 hover:text-gray-600"
        >
          Eugene Dakal
        </Link>
        <nav className="flex space-x-6 items-center">
          <Link
            href="/"
            className={`text-gray-800 hover:text-gray-600 pb-1 border-b-2 ${
              pathname === "/"
                ? "border-black text-gray-900"
                : "border-transparent"
            }`}
          >
            Home
          </Link>
          <a
            href="/products"
            className={`text-gray-800 hover:text-gray-600 pb-1 border-b-2 ${
              pathname === "/products"
                ? "border-black text-gray-900"
                : "border-transparent"
            }`}
          >
            Products
          </a>
          <a
            href="/contact"
            className={`text-gray-800 hover:text-gray-600 pb-1 border-b-2 ${
              pathname === "/contact"
                ? "border-black text-gray-900"
                : "border-transparent"
            }`}
          >
            Contact
          </a>
          <div className="flex space-x-4 items-center">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-gray-800 hover:text-gray-600"
            >
              <AiOutlineSearch size={24} />
            </button>
            <div className="relative">
              <a href="/cart" className="text-gray-800 hover:text-gray-600">
                <HiOutlineShoppingBag size={24} />
              </a>
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cart.length}
              </span>
            </div>
          </div>
        </nav>
      </div>

      {searchOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setSearchOpen(false)}
          ></div>

          <div className="fixed top-0 left-0 w-full bg-white z-40 shadow-md px-6 py-3 border-b border-gray-300">
            <div className="flex items-center">
              <AiOutlineSearch size={20} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="flex-grow border-none outline-none py-2 px-4 text-lg"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                ✖
              </button>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
