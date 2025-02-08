import React, { useEffect, useState, useMemo, useCallback, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Star, Package, AlertCircle, Plus, RefreshCcw, Upload, Search, X, SlidersHorizontal } from "lucide-react";
import { debounce } from "lodash";
import { getProducts, getProductById } from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { RetryTimerContext } from "../context/RetryTimerContext";
import RetryTimerOverlay from "../components/RetryTimerOverlay";

// Utility Components
const EmptyImagePlaceholder = () => (
  <div className="flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 w-full h-full">
    <Package className="w-16 h-16 text-gray-600" />
  </div>
);

const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
    {[...Array(8)].map((_, index) => (
      <div
        key={index}
        className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden animate-pulse"
      >
        <div className="aspect-square bg-gray-800" />
        <div className="p-6 space-y-4">
          <div className="h-4 bg-gray-800 rounded w-3/4" />
          <div className="h-4 bg-gray-800 rounded w-1/2" />
          <div className="h-8 bg-gray-800 rounded" />
        </div>
      </div>
    ))}
  </div>
);
// Product Card Component
const ProductCard = React.memo(({ product, user, handleUpdateProduct, navigate, handleImageError, imageErrors }) => (
  <div className="group bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden transition-all duration-300 hover:scale-102 hover:shadow-xl hover:shadow-purple-500/25">
    <div className="aspect-square relative overflow-hidden bg-gray-900">
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
        <div className="absolute top-4 right-4 bg-red-500/90 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm">
          Only {product.stock_remaining} left!
        </div>
      )}
    </div>

    <div className="p-6 space-y-4">
      <div>
        <h2 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-purple-300 transition-colors">
          {product.name}
        </h2>
        <span className="inline-block px-3 py-1 text-sm text-purple-300 bg-purple-500/20 rounded-full">
          {product.category}
        </span>
      </div>

      <p className="text-gray-300 line-clamp-2 min-h-[3rem]">{product.description}</p>

      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-2xl font-bold text-green-400">
            ₹{product.price_after_discount.toLocaleString()}
          </p>
          {product.price_before_discount && (
            <p className="text-sm text-gray-400 line-through">
              ₹{product.price_before_discount.toLocaleString()}
            </p>
          )}
        </div>
        <div className="flex items-center gap-1 bg-yellow-500/20 px-3 py-1 rounded-full">
          <Star className="w-5 h-5 text-yellow-400 fill-current" />
          <span className="text-yellow-300 font-medium">
            {product.product_rating?.toFixed(1) || "N/A"}
          </span>
        </div>
      </div>

      <div className="flex gap-4 pt-2">
        <button
          onClick={() => navigate(`/products/${product.id}`)}
          className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 font-medium"
        >
          View Details
        </button>
        {(user?.role === "admin" || user?.role === "vendor") && (
          <button
            onClick={() => handleUpdateProduct(product.id)}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-orange-500/25"
          >
            <RefreshCcw className="w-5 h-5" />
            <span>Update</span>
          </button>
        )}
      </div>
    </div>
  </div>
));

// Filter Panel Component
const FilterPanel = React.memo(({
  priceRange,
  setPriceRange,
  maxPrice,
  selectedRating,
  setSelectedRating,
  resetFilters
}) => (
  <div className="bg-white/10 backdrop-blur-lg rounded-xl mb-8 overflow-hidden animate-fade-in">
    <div className="p-6 space-y-8">
      <div className="space-y-4">
        <label className="block text-white font-medium">
          Price Range (₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()})
        </label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="0"
            max={maxPrice}
            value={priceRange[0]}
            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
            className="w-full h-2 bg-purple-500/30 rounded-lg appearance-none cursor-pointer range-slider"
          />
          <input
            type="range"
            min="0"
            max={maxPrice}
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="w-full h-2 bg-purple-500/30 rounded-lg appearance-none cursor-pointer range-slider"
          />
        </div>
      </div>

      <div className="space-y-4">
        <label className="block text-white font-medium">Minimum Rating</label>
        <div className="flex flex-wrap gap-2">
          {[0, 1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              onClick={() => setSelectedRating(rating)}
              className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-all duration-300 ${selectedRating === rating
                ? "bg-purple-500 text-white"
                : "bg-white/5 text-gray-300 hover:bg-white/10"
                }`}
            >
              {rating === 0 ? (
                "All"
              ) : (
                <>
                  {rating}
                  <Star
                    className={`w-4 h-4 ${selectedRating === rating ? "text-yellow-300 fill-current" : "text-yellow-300"
                      }`}
                  />
                </>
              )}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={resetFilters}
        className="w-full bg-white/5 text-gray-300 px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 font-medium"
      >
        Reset Filters
      </button>
    </div>
  </div>
));
const Pagination = ({ currentPage, totalItems, itemsPerPage, setCurrentPage }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  return (
    <div className="flex justify-center gap-4 mt-8">
      <button
        onClick={handlePrevPage}
        className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-all duration-300"
        disabled={currentPage === 1}
      >
        Previous
      </button>

      <span className="text-white">{`Page ${currentPage} of ${totalPages}`}</span>

      <button
        onClick={handleNextPage}
        className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-all duration-300"
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

// Main Component
const ProductList = () => {
  const { user } = useContext(AuthContext);
  const { startRetryTimer } = useContext(RetryTimerContext);
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
  const [priceRange, setPriceRange] = useState([0, 150000]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12); // Or you can make it dynamic
  const [isSearching, setIsSearching] = useState(false);

  // Derived values
  const maxPrice = useMemo(() => {
    return Math.max(...products.map(p => p.price_after_discount), 150000);
  }, [products]);

  // Event handlers
  const handleImageError = useCallback((productId) => {
    setImageErrors(prev => ({ ...prev, [productId]: true }));
  }, []);

  const resetFilters = useCallback(() => {
    setPriceRange([0, maxPrice]);
    setSelectedRating(0);
    setSelectedCategory("all");
    setSortBy("default");
    setSearchQuery("");
  }, [maxPrice]);

  const debouncedSetSearchQuery = useMemo(() => debounce((value) => {
    setIsSearching(true);  // Start loading spinner

    setSearchQuery(value);

    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    window.history.replaceState({}, "", `${window.location.pathname}?${params}`);

    setIsSearching(false);  // Stop loading spinner after the update
  }, 300), []);



  const handleUpdateProduct = async (productId) => {
    try {
      const productData = await getProductById(productId);
      navigate(`/update-product/${productId}`, { state: { productData } });
    } catch (error) {
      console.error("Failed to fetch product data:", error);
    }
  };



  // const fetchProducts = useCallback(async () => {
  //   try {
  //     const data = await getProducts();
  //     console.log("============Get Products===============>", data);
  //     setProducts(data);
  //     setError("");
  //   } catch (error) {
  //     setError("Error fetching products. Please try again.");
  //     console.error("❌ Product fetch error:", error);
  //     // Call startRetryTimer when an error occurs
  //     startRetryTimer();  // This triggers the retry timer to start
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [startRetryTimer]);  // Make sure startRetryTimer is included in the dependencies

  // useEffect(() => {
  //   fetchProducts();
  // }, [fetchProducts]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError("");

    // Set a timeout to trigger the retry timer if fetch takes too long
    const timeoutId = setTimeout(() => {
      startRetryTimer();
    }, 10000);

    try {
      const data = await getProducts();
      clearTimeout(timeoutId); // Clear timeout if data arrives in time

      console.log("✅ Products fetched:", data);
      setProducts(data);
      setError("");
    } catch (error) {
      setError("Error fetching products. Please try again.");
      console.error("❌ Product fetch error:", error);
      startRetryTimer(); // Trigger retry on failure
    } finally {
      clearTimeout(timeoutId); // Ensure timeout is cleared
      setLoading(false);
    }
  }, [startRetryTimer]);

  useEffect(() => {
    fetchProducts();
  }, []); // Run only once when the component mounts

  // Filtered and sorted products
  const filteredAndSortedProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      const matchesSearch = !searchQuery ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||  // Allow search by category
        product.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())); // Search by tags if applicable

      const matchesPrice = product.price_after_discount >= priceRange[0] &&
        product.price_after_discount <= priceRange[1];

      const matchesRating = selectedRating === 0 || (product.product_rating || 0) >= selectedRating;

      return matchesCategory && matchesSearch && matchesPrice && matchesRating;
    });

    switch (sortBy) {
      case "price-low":
        return filtered.sort((a, b) => a.price_after_discount - b.price_after_discount);
      case "price-high":
        return filtered.sort((a, b) => b.price_after_discount - a.price_after_discount);
      case "rating":
        return filtered.sort((a, b) => (b.product_rating || 0) - (a.product_rating || 0));
      default:
        return filtered;
    }
  }, [products, selectedCategory, searchQuery, priceRange, selectedRating, sortBy]);


  // **Added logic to paginate the products client-side**
  const paginateProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage;
    return filteredAndSortedProducts.slice(startIndex, endIndex);
  }, [filteredAndSortedProducts, currentPage, itemsPerPage]);

  // Categories
  const categories = useMemo(
    () => ["all", ...new Set(products.map((p) => p.category))],
    [products]
  );

  // Effects
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("search") || "";
    setSearchQuery(query);
  }, [location.search]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            observer.unobserve(img);
          }
        });
      },
      { rootMargin: "50px" }
    );

    document.querySelectorAll("img[data-src]").forEach((img) => observer.observe(img));

    return () => observer.disconnect();
  }, [filteredAndSortedProducts]);

  // Styles
  useEffect(() => {
    const styles = `
      .range-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 16px;
        height: 16px;
        background: #a855f7;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .range-slider::-webkit-slider-thumb:hover {
        transform: scale(1.2);
        background: #9333ea;
      }

      @keyframes fade-in {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .animate-fade-in {
        animation: fade-in 0.6s ease-out;
      }
    `;

    const styleSheet = document.createElement("style");
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
    return () => document.head.removeChild(styleSheet);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <RetryTimerOverlay />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 animate-fade-in">
            Find the Perfect Match for You
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Explore our carefully curated collection of premium products
          </p>
        </div>
        {/* Admin/Vendor Controls */}
        {(user?.role === "admin" || user?.role === "vendor") && (
          <div className="bg-white/10 backdrop-blur-lg rounded-xl mb-8">
            <div className="flex gap-4 p-6">
              <button
                onClick={() => navigate("/add-product")}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
              >
                <Plus className="w-5 h-5" />
                Add Product
              </button>
              {user?.role === "admin" && (
                <button
                  onClick={() => navigate("/import-products")}
                  className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-6 py-3 rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 shadow-lg hover:shadow-emerald-500/25"
                >
                  <Upload className="w-5 h-5" />
                  Import Products
                </button>
              )}
            </div>
          </div>
        )}
        {/* Search and Filters */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl mb-8">
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
              <div className="relative w-full md:w-96">
                {/* <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" /> */}
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}  // Store value on input change
                  className="w-full bg-white/5 border border-gray-700 rounded-lg pl-12 pr-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                />

                {isSearching && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 animate-spin">
                    <div className="w-5 h-5 border-4 border-t-4 border-transparent border-t-purple-500 rounded-full" />
                  </div>
                )}


                {/* Search Icon on the Right */}
                <button
                  onClick={() => debouncedSetSearchQuery(searchQuery)}  // Trigger search when the button is clicked
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
                </button>
                {searchQuery && (
                  <button
                    onClick={() => {
                      debouncedSetSearchQuery(""); // Reset the search query
                      setSearchQuery(""); // Reset the search state
                      resetFilters(); // Reset filters like price and rating
                    }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    aria-label="Clear search"
                  >

                  </button>

                )}

              </div>


              <div className="flex flex-wrap gap-4 items-center w-full md:w-auto">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 bg-white/5 border border-gray-700 rounded-lg px-4 py-3 text-white hover:bg-white/10 transition-all duration-300"
                >
                  <SlidersHorizontal className="w-5 h-5" />
                  Filters
                </button>

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-white/5 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                >
                  {categories.map((category) => (
                    <option key={category} value={category} className="bg-gray-900">
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white/5 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                >
                  <option value="default" className="bg-gray-900">Featured</option>
                  <option value="price-low" className="bg-gray-900">Price: Low to High</option>
                  <option value="price-high" className="bg-gray-900">Price: High to Low</option>
                  <option value="rating" className="bg-gray-900">Top Rated</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        <FilterPanel
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          maxPrice={maxPrice}
          selectedRating={selectedRating}
          setSelectedRating={setSelectedRating}
          resetFilters={resetFilters}
        />
        {/* Product Listing */}
        {/* Product Listing */}
        {loading ? (
          <LoadingSkeleton />
        ) : error ? (
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <p className="text-red-400 text-xl mb-6">{error}</p>
            <button
              onClick={fetchProducts}
              className="bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 transition-all duration-300 shadow-lg hover:shadow-red-500/25"
            >
              Try Again
            </button>
          </div>
        ) : filteredAndSortedProducts.length === 0 ? (
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 text-center">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-300 text-xl">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {paginateProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                user={user}
                handleUpdateProduct={handleUpdateProduct}
                navigate={navigate}
                handleImageError={handleImageError}
                imageErrors={imageErrors}
              />
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        <Pagination
          currentPage={currentPage}
          totalItems={filteredAndSortedProducts.length}
          itemsPerPage={itemsPerPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ProductList;