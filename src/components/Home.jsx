import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ProductList from "./ProductList";

const Home = () => {
  const { user } = useContext(AuthContext);

  const features = [
    { title: "Free Shipping", description: "On orders over $100", icon: "🚚" },
    { title: "24/7 Support", description: "Always here to help", icon: "💬" },
    { title: "Secure Payments", description: "100% secure transactions", icon: "🔒" },
    { title: "Easy Returns", description: "30-day return policy", icon: "↩️" },
  ];

  const categories = [
    { name: "Electronics", icon: "📱" },
    { name: "Fashion", icon: "👕" },
    { name: "Home & Living", icon: "🏠" },
    { name: "Sports", icon: "⚽" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* ✅ Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-blue-900 to-blue-800 text-white py-24">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="relative text-center max-w-7xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
            <span className="block">Discover Amazing</span>
            <span className="block bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Products Today
            </span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Your one-stop destination for quality products at unbeatable prices.
            Join thousands of satisfied customers shopping with confidence.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <>
                <Link
                  to="/cart"
                  className="px-6 py-3 text-lg font-medium bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl shadow-lg hover:from-emerald-600 hover:to-cyan-600 transform transition-all hover:scale-105"
                >
                  🛒 View Cart
                </Link>
                <Link
                  to="/orders"
                  className="px-6 py-3 text-lg font-medium bg-white text-gray-900 rounded-xl shadow-lg hover:bg-gray-100 transform transition-all hover:scale-105"
                >
                  📦 My Orders
                </Link>
                <Link
                  to="/dashboard"
                  className="px-6 py-3 text-lg font-medium bg-purple-500 text-white rounded-xl shadow-lg hover:bg-purple-600 transform transition-all hover:scale-105"
                >
                  📊 Dashboard
                </Link>
              </>
            ) : (
              <Link
                to="/login"
                className="px-6 py-3 text-lg font-medium bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl shadow-lg hover:from-emerald-600 hover:to-cyan-600 transform transition-all hover:scale-105"
              >
                🔐 Login to Start Shopping
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ✅ Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow transform hover:scale-105"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/category/${category.name.toLowerCase()}`}
                className="group p-6 bg-gray-50 rounded-2xl text-center hover:bg-gray-100 transition-all transform hover:scale-105"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{category.icon}</div>
                <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ Products Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Featured Products</h2>
          <ProductList />
        </div>
      </section>

      {/* ✅ Newsletter Section */}
      <section className="bg-gradient-to-r from-blue-900 to-indigo-900 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated with Latest Offers</h2>
          <p className="text-gray-300 mb-8">
            Subscribe to our newsletter and never miss out on exclusive deals!
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl hover:from-emerald-600 hover:to-cyan-600 transform transition-all hover:scale-105"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
