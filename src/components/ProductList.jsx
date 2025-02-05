import React, { useEffect, useState, useMemo, useCallback, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getProducts, getProductById } from "../api/api";
import { ShoppingBag, Star, Package, AlertCircle, Plus, RefreshCcw, Upload } from "lucide-react";
import { RetryTimerContext } from "../context/RetryTimerContext";
import RetryTimerOverlay from "../components/RetryTimerOverlay";
import { AuthContext } from "../context/AuthContext";
import { debounce } from "lodash";

const ProductList = () => {
  const { user } = useContext(AuthContext);
  const { startRetryTimer } = useContext(RetryTimerContext); 
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [imageErrors, setImageErrors] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");

  const handleImageError = useCallback((productId) => {
    setImageErrors((prev) => ({ ...prev, [productId]: true }));
  }, []);

  // const fetchProducts = useCallback(() => {
  //   setLoading(true);
  //   setError("");

  //   getProducts()
  //     .then((data) => {
  //       setProducts(data);
  //     })
  //     .catch((error) => {
  //       setError("Error fetching products. Please try again.");
  //       console.error("❌ Product fetch error:", error);
  //       startRetryTimer(); // Start Global Retry Timer
  //     })
  //     .finally(() => setLoading(false));
  // }, [startRetryTimer]);

  // useEffect(() => {
  //   fetchProducts();
  // }, [fetchProducts]);

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
    <div className="flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl w-full h-full">
      <Package className="w-12 h-12 text-gray-400" />
    </div>
  );

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="bg-white rounded-xl p-4 shadow-lg space-y-4 animate-pulse">
          <div className="aspect-square w-full bg-gray-100 rounded-xl mb-4" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-100 rounded w-3/4" />
            <div className="h-4 bg-gray-100 rounded w-1/2" />
            <div className="h-6 bg-gray-100 rounded" />
          </div>
        </div>
      ))}
    </div>
  );

  const debouncedSetSearchQuery = useMemo(() => debounce(setSearchQuery, 500), []);

  useEffect(() => {
    return () => {
      debouncedSetSearchQuery.cancel();
    };
  }, [debouncedSetSearchQuery]);

  const handleUpdateProduct = async (productId) => {
    try {
      const productData = await getProductById(productId);
      navigate(`/update-product/${productId}`, { state: { productData } });
    } catch (error) {
      console.error("Failed to fetch product data:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-800 to-blue-900 text-white">
       <RetryTimerOverlay />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-semibold text-gray-100 mb-2">Our Products</h1>
          <p className="text-lg text-gray-300">Explore our curated selection of products.</p>
        </div>

        {(user?.role === "admin" || user?.role === "vendor") && (
          <div className="bg-white rounded-xl shadow-lg p-4 mb-8 bg-opacity-25 backdrop-blur-md">
            <div className="flex gap-4">
              <button
                onClick={() => navigate("/add-product")}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105"
              >
                <Plus className="w-4 h-4" />
                Add Product
              </button>
              {user?.role === "admin" && (
                <button
                  onClick={() => navigate("/import-products")}
                  className="flex items-center gap-2 bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700 transition-all duration-200 transform hover:scale-105"
                >
                  <Upload className="w-4 h-4" />
                  Import Products
                </button>
              )}
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg p-4 mb-8 bg-opacity-25 backdrop-blur-md">
          <div className="flex gap-6 items-center">
            <div className="flex gap-4 items-center">
              <label className="text-sm font-medium text-gray-300">Category:</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-indigo-600 text-white border border-indigo-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-4 items-center">
              <label className="text-sm font-medium text-gray-300">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-indigo-600 text-white border border-indigo-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="default">Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : error ? (
          <div className="bg-white rounded-xl p-8 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-500 text-lg mb-4">{error}</p>
            <button
              onClick={() => fetchProducts()}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-all duration-200"
            >
              Retry
            </button>
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No products found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
              >
                <div className="aspect-square relative overflow-hidden">
                  {imageErrors[product.id] ? (
                    <EmptyImagePlaceholder />
                  ) : (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      onError={() => handleImageError(product.id)}
                      loading="lazy"
                    />
                  )}
                  {product.stock_remaining < 10 && (
                    <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-lg text-xs font-medium">
                      Only {product.stock_remaining} left!
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <div className="mb-2">
                    <h2 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
                      {product.name}
                    </h2>
                    <span className="inline-block px-2 py-1 text-xs text-indigo-600 bg-indigo-50 rounded-full">
                      {product.category}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-lg font-semibold text-green-600">
                        ₹{product.price_after_discount.toFixed(2)}
                      </p>
                      {product.price_before_discount && (
                        <p className="text-sm text-gray-400 line-through">
                          ₹{product.price_before_discount.toFixed(2)}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-yellow-700">
                        {product.product_rating || "N/A"}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <Link
                      to={`/products/${product.id}`}
                      className="block w-full text-center bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-all duration-200"
                    >
                      View Details
                    </Link>
                    {(user?.role === "admin" || user?.role === "vendor") && (
                      <button
                        onClick={() => handleUpdateProduct(product.id)}
                        className="flex items-center gap-2 bg-orange-500 text-white px-6 py-2.5 rounded-lg hover:bg-orange-600 transition-all duration-200 transform hover:scale-105"
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
      </div>
    </div>
  );
};

export default ProductList;
