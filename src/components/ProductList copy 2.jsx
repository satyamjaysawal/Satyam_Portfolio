import React, { useEffect, useState, useMemo, useCallback, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getProducts, getProductById } from "../api/api";
import { ShoppingBag, Star, Package, AlertCircle, Plus, RefreshCcw, Upload, Search } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { debounce } from "lodash";

const ProductList = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  // State management
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [imageErrors, setImageErrors] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");

  // Handle image loading errors
  const handleImageError = useCallback((productId) => {
    setImageErrors((prev) => ({ ...prev, [productId]: true }));
  }, []);

  // Fetch products function
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
      setError("");
    } catch (error) {
      setError("Error fetching products. Please try again.");
      console.error("❌ Product fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial products fetch
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = new Set(products.map(p => p.category));
    return ["all", ...uniqueCategories];
  }, [products]);

  // Sort products function
  const sortProducts = useCallback((products) => {
    switch (sortBy) {
      case "price-low":
        return [...products].sort((a, b) => a.price_after_discount - b.price_after_discount);
      case "price-high":
        return [...products].sort((a, b) => b.price_after_discount - a.price_after_discount);
      case "rating":
        return [...products].sort((a, b) => (b.product_rating || 0) - (a.product_rating || 0));
      default:
        return products;
    }
  }, [sortBy]);

  // Handle URL search params
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("search") || "";
    setSearchQuery(query);
  }, [location.search]);

  // Filter products based on category and search
  const filteredProducts = useMemo(() => {
    return products
      .filter(product =>
        (selectedCategory === "all" || product.category === selectedCategory) &&
        (product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
         product.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
  }, [products, selectedCategory, searchQuery]);

  // Sort filtered products
  const sortedProducts = useMemo(() => 
    sortProducts(filteredProducts), 
    [filteredProducts, sortProducts]
  );

  // Debounced search
  const debouncedSetSearchQuery = useMemo(
    () => debounce((value) => setSearchQuery(value), 500),
    []
  );

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSetSearchQuery.cancel();
    };
  }, [debouncedSetSearchQuery]);

  // Handle product update
  const handleUpdateProduct = async (productId) => {
    try {
      const productData = await getProductById(productId);
      navigate(`/update-product/${productId}`, { state: { productData } });
    } catch (error) {
      console.error("Failed to fetch product data:", error);
    }
  };

  // Component for empty image placeholder
  const EmptyImagePlaceholder = () => (
    <div className="flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl w-full h-full">
      <Package className="w-12 h-12 text-gray-400 animate-pulse" />
    </div>
  );

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 shadow-lg space-y-4 animate-pulse">
          <div className="aspect-square w-full bg-gray-200 rounded-xl mb-4" />
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded-full w-3/4" />
            <div className="h-4 bg-gray-200 rounded-full w-1/2" />
            <div className="h-6 bg-gray-200 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200 mb-4">
            Discover Amazing Products
          </h1>
          <p className="text-xl text-indigo-200 opacity-90">
            Explore our carefully curated collection of premium items
          </p>
        </div>

        {/* Admin/Vendor Controls */}
        {(user?.role === "admin" || user?.role === "vendor") && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-6 mb-8">
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/add-product")}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
              >
                <Plus className="w-5 h-5" />
                Add Product
              </button>
              {user?.role === "admin" && (
                <button
                  onClick={() => navigate("/import-products")}
                  className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-8 py-3 rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/25"
                >
                  <Upload className="w-5 h-5" />
                  Import Products
                </button>
              )}
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-wrap gap-6 items-center">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-300" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => debouncedSetSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-indigo-500/30 rounded-xl pl-10 pr-4 py-3 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all duration-300"
                />
              </div>
            </div>
            <div className="flex gap-6 items-center flex-wrap">
              <div className="flex gap-3 items-center">
                <label className="text-sm font-medium text-indigo-200">Category:</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-white/5 border border-indigo-500/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all duration-300"
                >
                  {categories.map((category) => (
                    <option key={category} value={category} className="bg-indigo-900">
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3 items-center">
                <label className="text-sm font-medium text-indigo-200">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white/5 border border-indigo-500/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all duration-300"
                >
                  <option value="default" className="bg-indigo-900">Default</option>
                  <option value="price-low" className="bg-indigo-900">Price: Low to High</option>
                  <option value="price-high" className="bg-indigo-900">Price: High to Low</option>
                  <option value="rating" className="bg-indigo-900">Rating</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <LoadingSkeleton />
        ) : error ? (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 text-center">
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-6 animate-bounce" />
            <p className="text-red-300 text-xl mb-6">{error}</p>
            <button
              onClick={fetchProducts}
              className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <RefreshCcw className="w-5 h-5 inline mr-2" />
              Retry
            </button>
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 text-center">
            <Package className="w-16 h-16 text-indigo-300 mx-auto mb-6" />
            <p className="text-indigo-200 text-xl">No products found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 overflow-hidden"
              >
                {/* Product Image */}
                <div className="aspect-square relative overflow-hidden">
                  {imageErrors[product.id] ? (
                    <EmptyImagePlaceholder />
                  ) : (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={() => handleImageError(product.id)}
                      loading="lazy"
                    />
                  )}
                  {product.stock_remaining < 10 && (
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-red-600 to-red-700 text-white px-3 py-1.5 rounded-xl text-sm font-medium shadow-lg">
                      Only {product.stock_remaining} left!
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="p-6">
                  <div className="mb-4">
                    <h2 className="text-xl font-bold text-white mb-2 line-clamp-1">
                      {product.name}
                    </h2>
                    <span className="inline-block px-3 py-1.5 text-xs bg-indigo-500/20 text-indigo-200 rounded-xl">
                      {product.category}
                    </span>
                  </div>

                  <p className="text-sm text-indigo-200 mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-2xl font-bold text-green-400">
                        ₹{product.price_after_discount.toFixed(2)}
                      </p>
                      {product.price_before_discount && (
                        <p className="text-sm text-indigo-300 line-through">
                          ₹{product.price_before_discount.toFixed(2)}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-500/10 px-3 py-1.5 rounded-xl">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-yellow-300">
                        {product.product_rating || "N/A"}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Link
                      to={`/products/${product.id}`}
                      className="flex-1 text-center bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
                    >
                      View Details
                    </Link>
                      {(user?.role === "admin" || user?.role === "vendor") && (
                      <button
                        onClick={() => handleUpdateProduct(product.id)}
                        className="flex items-center gap-2 bg-gradient-to-r from-orange-600 to-orange-700 text-white px-6 py-3 rounded-xl hover:from-orange-700 hover:to-orange-800 transition-all duration-300 shadow-lg hover:shadow-orange-500/25"
                      >
                        <RefreshCcw className="w-4 h-4" />
                        Update
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Scroll to Top Button - Optional Enhancement */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-110"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProductList;