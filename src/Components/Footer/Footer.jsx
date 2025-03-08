import React from "react";
import "./Footer.module.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#1F2937] text-white relative bottom-0 left-0 right-0 ">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div>
            <h3 className="text-2xl font-bold text-emerald-400">Fresh Cart</h3>
            <p className="text-gray-400 mt-2 leading-relaxed">
              Welcome to Fresh Cart, your ultimate destination for groceries with a wide variety of categories to explore.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-emerald-400">Useful Links</h3>
            <nav className="flex flex-col mt-2 space-y-2">
              <Link to="/" className="hover:text-emerald-300 transition">Home</Link>
              <Link to="/Products" className="hover:text-emerald-300 transition">Products</Link>
              <Link to="/Categorise" className="hover:text-emerald-300 transition">Categories</Link>
              <Link to="/Brands" className="hover:text-emerald-300 transition">Brands</Link>
              <Link to="/Orders" className="hover:text-emerald-300 transition">All Orders</Link>
            </nav>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-emerald-400">Contact</h3>
            <div className="mt-2 space-y-2 text-gray-400">
              <p><i className="fas fa-map-marker-alt text-emerald-400 mr-2"></i> Egypt, Cairo</p>
              <p><i className="fas fa-envelope text-emerald-400 mr-2"></i> info@example.com</p>
              <p><i className="fas fa-phone text-emerald-400 mr-2"></i> +01 234 567 88</p>
              <p><i className="fas fa-fax text-emerald-400 mr-2"></i> +01 234 567 88</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-emerald-400">Get App</h3>
            <p className="text-gray-400 mt-2">
              We will send you a link, open it on your phone to download the app.
            </p>
            <div className="mt-3 flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-2 rounded-l-lg w-full border border-gray-600 text-black focus:outline-none"
              />
              <button className="bg-emerald-500 text-black px-4 py-2 rounded-r-lg hover:bg-emerald-600 transition">
                Send
              </button>
            </div>
          </div>

        </div>
      </div>

      <div className="bg-[#111827] text-center py-4">
        <p className="text-gray-400 text-sm">
          © 2024 Copyright <Link to="/" className="text-emerald-400 font-semibold hover:underline">FreshCart</Link>
        </p>
        <div className="flex justify-center space-x-4 mt-3">
          <a href="#" className="text-gray-400 hover:text-white transition transform hover:scale-110">
            <i className="fab fa-facebook-f text-xl"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition transform hover:scale-110">
            <i className="fab fa-twitter text-xl"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition transform hover:scale-110">
            <i className="fab fa-instagram text-xl"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition transform hover:scale-110">
            <i className="fab fa-linkedin-in text-xl"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
