import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getProducts } from "../api/api";
import MobileCarousel from './MobileCarousel'; 
import {
  ShoppingCart,
  Filter,
  ChevronDown,
  Star,
  Heart,
  RefreshCw,
} from "lucide-react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
const Home = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: "",
    priceRange: [0, 5000],
    rating: 0,
    search: "",
    sortBy: "featured",
  });
  
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

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Advanced filtering and sorting
  useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (filters.search) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(
        (product) =>
          product.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    // Price range filter
    filtered = filtered.filter(
      (product) =>
        product.price_after_discount >= filters.priceRange[0] &&
        product.price_after_discount <= filters.priceRange[1]
    );

    // Rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter((product) => product.product_rating >= filters.rating);
    }

    // Sorting
    switch (filters.sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price_after_discount - b.price_after_discount);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price_after_discount - a.price_after_discount);
        break;
      case "rating":
        filtered.sort((a, b) => b.product_rating - a.product_rating);
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [filters, products]);

  // Handle filter updates
  const handleFilterChange = (updates) => {
    setFilters((prev) => ({ ...prev, ...updates }));
  };

  // Handle search input
  const handleSearchChange = (e) => {
    handleFilterChange({ search: e.target.value });
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      category: "",
      priceRange: [0, 5000],
      rating: 0,
      search: "",
      sortBy: "featured",
    });
  };

  // Product card component
  const ProductCard = ({ product }) => (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg group transform transition-all hover:scale-105">
      <div className="relative">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition"
        />
        <div className="absolute top-2 right-2">
          <button className="bg-white/20 p-2 rounded-full hover:bg-white/40 transition">
            <Heart className="text-white w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 text-white">{product.name}</h3>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-cyan-400 font-bold">
              ${product.price_after_discount}
            </span>
            {product.discount_percentage > 0 && (
              <span className="text-green-400 text-sm line-through">
                ${product.price_before_discount}
              </span>
            )}
          </div>
          <div className="flex items-center text-yellow-400">
            <Star className="w-4 h-4 fill-current mr-1" />
            {product.product_rating}
          </div>
        </div>
        <div className="mt-4 flex space-x-2">
          <button className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition flex-1">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Hero Section */}
      {/* Inline Styles */}
      <style>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .animate-scroll {
          display: flex;
          animation: scroll-left 30s linear infinite; /* Faster scroll */
        }

        @media (max-width: 768px) {
          .animate-scroll {
            animation: scroll-left 20s linear infinite; /* Even faster for mobile */
          }
        }
      `}</style>


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
      <MobileCarousel />
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
      {/* <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Featured Products</h2>
        
        </div>
      </section>  */}

      

      <section className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-white mb-8">Trending Products</h2>
          <div className="overflow-hidden">
            <div className="flex space-x-6 animate-scroll">
              {products.slice(0, 10).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </section>


      <section className="relative bg-black/50 backdrop-blur-lg py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
            Shop Smarter, Live Better
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Your One-Stop Shop for the Latest Trends and Must-Have Products!
          </p>

          <div className="flex justify-center space-x-4">
            {user ? (
              <Link
                to="/cart"
                className="flex items-center bg-cyan-600/20 hover:bg-cyan-600/40 border border-cyan-500/30 px-6 py-3 rounded-lg transition"
              >
                <ShoppingCart className="mr-2" /> Cart
              </Link>
            ) : (
              <Link
                to="/login"
                className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 px-8 py-4 rounded-lg transition"
              >
                Start Shopping
              </Link>
            )}
          </div>
        </div>
      </section>


      {/* Filters Section */}
      <section className="bg-gray-800 py-8">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-4">
            {/* Category Filter */}
            <select
              className="bg-gray-700 text-white p-2 rounded"
              value={filters.category}
              onChange={(e) => handleFilterChange({ category: e.target.value })}
            >
              <option value="">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
            </select>

            {/* Price Range */}
            <div className="flex items-center space-x-2">
              <input
                type="range"
                min="0"
                max="5000"
                value={filters.priceRange[1]}
                onChange={(e) =>
                  handleFilterChange({ priceRange: [0, Number(e.target.value)] })
                }
                className="w-full"
              />
              <span>${filters.priceRange[1]}</span>
            </div>

            {/* Rating Filter */}
            <select
              className="bg-gray-700 text-white p-2 rounded"
              value={filters.rating}
              onChange={(e) => handleFilterChange({ rating: Number(e.target.value) })}
            >
              <option value={0}>All Ratings</option>
              <option value={4}>4★ & Above</option>
              <option value={4.5}>4.5★ & Above</option>
            </select>

            {/* Sort By */}
            <select
              className="bg-gray-700 text-white p-2 rounded"
              value={filters.sortBy}
              onChange={(e) => handleFilterChange({ sortBy: e.target.value })}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>

            {/* Search */}
            <input
              type="text"
              placeholder="Search Products..."
              value={filters.search}
              onChange={handleSearchChange}
              className="bg-gray-700 text-white p-2 rounded w-full"
            />
          </div>
        </div>
      </section>

      {/* Reset Filters Button */}
      <div className="text-center py-4">
        <button
          onClick={resetFilters}
          className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition"
        >
          Reset Filters
        </button>
      </div>

      {/* Products Section */}
      <section className="bg-gray-900 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
            Featured Products
          </h2>

          {loading ? (
            <div className="text-center text-xl">Loading products...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center text-xl">No products match the selected filters.</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
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


    <section id="blog" class="mb-16 mx-4 md:mx-8 lg:mx-16 py-8">
        <h2 class="text-3xl font-bold mb-6 text-center text-gray-800">Latest Blog Posts</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            <div class="bg-gradient-to-br from-blue-50 to-white rounded-lg shadow-lg p-6">
                <h3 class="text-xl font-semibold text-blue-700 mb-4">10 Tips for Better Shopping</h3>
                <p class="text-gray-600 mb-6">
                    <span class="snippet">
                        Discover expert tips to make your shopping experience seamless and enjoyable. Learn how to find
                        the best deals...
                    </span>
                    <span class="full-text hidden">
                        Learn how to find the best deals, save time, and shop smarter by following these ten practical
                        shopping strategies. Whether you're buying online or visiting a store, these tips will guide you
                        toward making the right purchase decisions.
                    </span>
                </p>
                <button class="text-blue-500 font-medium hover:underline toggle-read-more">Read More →</button>
            </div>
  
            <div class="bg-gradient-to-br from-green-50 to-white rounded-lg shadow-lg p-6">
                <h3 class="text-xl font-semibold text-green-700 mb-4">The Best Deals This Season</h3>
                <p class="text-gray-600 mb-6">
                    <span class="snippet">
                        Stay updated with the latest offers and discounts to save big. Don't miss out on limited-time
                        deals...
                    </span>
                    <span class="full-text hidden">
                        Find the most attractive discounts and seasonal sales available now. From electronics to
                        fashion, our curated list of deals ensures you don't miss out on any savings opportunities.
                    </span>
                </p>
                <button class="text-green-500 font-medium hover:underline toggle-read-more">Read More →</button>
            </div>

            <div class="bg-gradient-to-br from-yellow-50 to-white rounded-lg shadow-lg p-6">
                <h3 class="text-xl font-semibold text-yellow-700 mb-4">Top 5 Trends in 2025</h3>
                <p class="text-gray-600 mb-6">
                    <span class="snippet">
                        Explore the most popular trends shaping this year’s shopping habits. From sustainable fashion to
                        smart gadgets...
                    </span>
                    <span class="full-text hidden">
                        Dive deeper into how eco-friendly products and innovative technology are revolutionizing
                        consumer behavior in 2025. These trends highlight the evolving preferences of shoppers
                        worldwide.
                    </span>
                </p>
                <button class="text-yellow-500 font-medium hover:underline toggle-read-more">Read More →</button>
            </div>
        </div>
    </section>
    </div>
  );
};

export default Home;
