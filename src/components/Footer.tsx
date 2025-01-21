"use client";

import { usePathname } from "next/navigation";
import { AiOutlineInstagram, AiOutlineYoutube } from "react-icons/ai";
import { FaTiktok } from "react-icons/fa";

export default function Footer(): React.JSX.Element {
  const pathname = usePathname();

  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <h3 className="text-lg font-semibold mb-4">Quick links</h3>
        <nav className="flex justify-center space-x-6 mb-6">
          <a
            href="/"
            className={`text-gray-800 hover:text-gray-600 ${
              pathname === "/" ? "font-bold underline" : ""
            }`}
          >
            Home
          </a>
          <a
            href="/products"
            className={`text-gray-800 hover:text-gray-600 ${
              pathname === "/products" ? "font-bold underline" : ""
            }`}
          >
            Products
          </a>
          <a
            href="/contact"
            className={`text-gray-800 hover:text-gray-600 ${
              pathname === "/contact" ? "font-bold underline" : ""
            }`}
          >
            Contact
          </a>
        </nav>
        <div className="flex justify-center space-x-6 mb-6">
          <a
            href="#"
            aria-label="Instagram"
            className="text-gray-800 hover:text-gray-600"
          >
            <AiOutlineInstagram size={24} />
          </a>
          <a
            href="#"
            aria-label="TikTok"
            className="text-gray-800 hover:text-gray-600"
          >
            <FaTiktok size={24} />
          </a>
          <a
            href="#"
            aria-label="YouTube"
            className="text-gray-800 hover:text-gray-600"
          >
            <AiOutlineYoutube size={24} />
          </a>
        </div>
      </div>
      <div className="bg-white text-sm text-gray-600 py-4 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
          © 2025 Eugene Dakal. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
