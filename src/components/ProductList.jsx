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
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [imageErrors, setImageErrors] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");

  // Existing callback functions remain the same
  const handleImageError = useCallback((productId) => {
    setImageErrors((prev) => ({ ...prev, [productId]: true }));
  }, []);

  const fetchProducts = useCallback(() => {
    getProducts()
      .then((data) => setProducts(data))
      .catch((error) => {
        setError("Error fetching products. Please try again.");
        console.error("❌ Product fetch error:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const categories = useMemo(() => ["all", ...new Set(products.map(p => p.category))], [products]);

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

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("search") || "";
    // Auto reset when query is empty/blank
    if (!query.trim()) {
      setSelectedCategory("all");
      setSortBy("default");
    }
    setSearchQuery(query);
  }, [location.search]);

  const filteredProducts = useMemo(() => {
    return products
      .filter(product =>
        (selectedCategory === "all" || product.category === selectedCategory) &&
        (product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        product.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
  }, [products, selectedCategory, searchQuery]);

  const sortedProducts = useMemo(() => sortProducts(filteredProducts), [filteredProducts, sortProducts]);

  const EmptyImagePlaceholder = () => (
    <div className="flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-xl w-full h-full">
      <Package className="w-12 h-12 text-gray-400" />
    </div>
  );

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="bg-white rounded-xl p-4 shadow-lg animate-pulse">
          <div className="aspect-square w-full bg-gray-200 rounded-xl mb-4" />
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-6 bg-gray-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  );

  const handleUpdateProduct = async (productId) => {
    try {
      const productData = await getProductById(productId);
      navigate(`/update-product/${productId}`, { state: { productData } });
    } catch (error) {
      console.error("Failed to fetch product data:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
            Our Products
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore our curated selection of premium products
          </p>
        </div>

        {/* Admin/Vendor Actions */}
        {(user?.role === "admin" || user?.role === "vendor") && (
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/add-product")}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <Plus className="w-5 h-5" />
                Add Product
              </button>
              {user?.role === "admin" && (
                <button
                  onClick={() => navigate("/import-products")}
                  className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <Upload className="w-5 h-5" />
                  Import Products
                </button>
              )}
            </div>
          </div>
        )}

        {/* Filters Section */}
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-6 items-center justify-between">
            <div className="flex flex-wrap gap-6 items-center">
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-gray-200">Category:</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-white bg-opacity-20 text-white border border-white border-opacity-20 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                >
                  {categories.map((category) => (
                    <option key={category} value={category} className="text-gray-900">
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-gray-200">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white bg-opacity-20 text-white border border-white border-opacity-20 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                >
                  <option value="default" className="text-gray-900">Default</option>
                  <option value="price-low" className="text-gray-900">Price: Low to High</option>
                  <option value="price-high" className="text-gray-900">Price: High to Low</option>
                  <option value="rating" className="text-gray-900">Rating</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <LoadingSkeleton />
        ) : error ? (
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 text-center">
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <p className="text-red-400 text-xl mb-6">{error}</p>
            <button
              onClick={fetchProducts}
              className="bg-red-500 text-white px-8 py-3 rounded-xl hover:bg-red-600 transition-all duration-300"
            >
              <RefreshCcw className="w-5 h-5 inline mr-2" />
              Retry
            </button>
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 text-center">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-300 text-xl">No products found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {sortedProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl"
              >
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
                    <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Only {product.stock_remaining} left!
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <h2 className="text-xl font-bold text-white mb-2 line-clamp-1">
                      {product.name}
                    </h2>
                    <span className="inline-block px-3 py-1 text-sm text-blue-100 bg-blue-500 bg-opacity-30 rounded-full">
                      {product.category}
                    </span>
                  </div>

                  <p className="text-gray-300 mb-4 line-clamp-2">{product.description}</p>

                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-2xl font-bold text-green-400">
                        ₹{product.price_after_discount.toFixed(2)}
                      </p>
                      {product.price_before_discount && (
                        <p className="text-sm text-gray-400 line-through">
                          ₹{product.price_before_discount.toFixed(2)}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-400 bg-opacity-20 px-3 py-1 rounded-full">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="text-yellow-300 font-medium">
                        {product.product_rating || "N/A"}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Link
                      to={`/products/${product.id}`}
                      className="flex-1 text-center bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl hover:shadow-lg transition-all duration-300"
                    >
                      View Details
                    </Link>
                    {(user?.role === "admin" || user?.role === "vendor") && (
                      <button
                        onClick={() => handleUpdateProduct(product.id)}
                        className="px-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:shadow-lg transition-all duration-300"
                      >
                        <RefreshCcw className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;