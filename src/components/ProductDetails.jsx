import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getProductDetails, addToCart, addToWishlist } from "../api/api";

const ProductDetails = () => {
  const { productId } = useParams();
  const { token, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const data = await getProductDetails(productId, token);
        setProduct(data);
      } catch (err) {
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId, token]);

  const handleAddToCart = async () => {
    if (!token) {
      setMessage("Please log in to add items to your cart.");
      return;
    }
    try {
      await addToCart(token, product.id, quantity);
      setMessage("Added to cart!");
    } catch (err) {
      setMessage("Failed to add to cart.");
    }
  };

  const handleAddToWishlist = async () => {
    if (!token) {
      setMessage("Please log in to add items to your wishlist.");
      return;
    }
    try {
      await addToWishlist(token, product.id);
      setMessage("Added to wishlist!");
    } catch (err) {
      setMessage("Failed to add to wishlist.");
    }
  };

  const LoadingSkeleton = () => (
    <div className="flex flex-col items-center space-y-4 w-full">
      <div className="w-48 h-48 sm:w-64 sm:h-64 bg-gray-200 rounded-lg animate-pulse" />
      <div className="w-3/4 h-6 bg-gray-200 rounded animate-pulse" />
      <div className="w-1/2 h-4 bg-gray-200 rounded animate-pulse" />
      <div className="w-full h-20 bg-gray-200 rounded animate-pulse" />
    </div>
  );

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center p-4 bg-red-50 rounded-lg border border-red-100">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Breadcrumb */}
          <div className="px-6 py-3 bg-gray-50 border-b">
            <p className="text-sm text-gray-600">
              Home / {product.category} / {product.name}
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
            {/* Image Section */}
            <div className="space-y-4">
              <div className="relative group">
                <div
                  className={`aspect-square w-full max-w-md mx-auto rounded-lg overflow-hidden bg-gray-50 
                    ${!imageLoaded ? 'animate-pulse' : ''}`}
                >
                  <img
                    src={product.image_url}
                    alt={product.name}
                    onLoad={() => setImageLoaded(true)}
                    className={`w-full h-full object-contain transform group-hover:scale-105 
                      transition-all duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  />
                </div>
                {/* Quick View Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 
                  transition-opacity duration-300 rounded-lg flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 
                    transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    Click to zoom
                  </span>
                </div>
              </div>
              {/* Product Tags */}
              <div className="flex flex-wrap gap-2">
                {product.stock_remaining < 10 && (
                  <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm">
                    Low Stock
                  </span>
                )}
                {product.price_before_discount && (
                  <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
                    On Sale
                  </span>
                )}
              </div>
            </div>

            {/* Product Info Section */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{product.name}</h1>
                <p className="text-lg text-gray-600 mt-1">{product.category}</p>
                {/* Rating */}
                <div className="flex items-center mt-3 space-x-2">
                  <div className="flex text-yellow-400">
                    {"★".repeat(Math.floor(product.product_rating || 0))}
                    {"☆".repeat(5 - Math.floor(product.product_rating || 0))}
                  </div>
                  <span className="text-sm text-gray-600">
                    ({product.product_rating || "No ratings"})
                  </span>
                </div>
              </div>

              {/* Price Card */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl">
                <div className="flex items-baseline space-x-3">
                  <span className="text-3xl font-bold text-green-600">
                    ₹{product.price_after_discount.toFixed(2)}
                  </span>
                  {product.price_before_discount && (
                    <span className="text-lg text-gray-500 line-through">
                      ₹{product.price_before_discount.toFixed(2)}
                    </span>
                  )}
                </div>
                <p className="text-sm text-green-700 mt-1">
                  {product.stock_remaining} units available
                </p>
              </div>

              {/* Description */}
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>

              {/* Purchase Controls */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="text-gray-700 font-medium">Quantity:</label>
                  <div className="relative inline-flex items-center">
                    <button
                      onClick={() => quantity > 1 && setQuantity((q) => q - 1)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-100 
                        rounded-l-lg hover:bg-gray-200 transition-colors"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      max={product.stock_remaining}
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                      className="w-16 h-8 text-center border-y border-gray-200 focus:outline-none"
                    />
                    <button
                      onClick={() => quantity < product.stock_remaining && setQuantity((q) => q + 1)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-100 
                        rounded-r-lg hover:bg-gray-200 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-gradient-to-r from-green-600 to-green-500 text-white px-6 
                      py-3 rounded-lg font-medium hover:from-green-700 hover:to-green-600 
                      transform hover:-translate-y-0.5 transition-all duration-150 
                      focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Add to Cart
                  </button>

                  <button
                    onClick={handleAddToWishlist}
                    className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg 
                      font-medium hover:bg-gray-50 transform hover:-translate-y-0.5 
                      transition-all duration-150 focus:ring-2 focus:ring-gray-200"
                  >
                    Save for Later
                  </button>
                </div>
              </div>

              {/* Feedback Message */}
              {message && (
                <div
                  className={`p-4 rounded-lg ${
                    message.includes("Failed")
                      ? "bg-red-50 text-red-700 border border-red-100"
                      : "bg-green-50 text-green-700 border border-green-100"
                  }`}
                >
                  {message}
                </div>
              )}

              {/* Admin/Vendor Details */}
              {(user?.role === "admin" || user?.role === "vendor") && (
                <div className="mt-8 border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">Cost</p>
                      <p className="font-medium">₹{product.expenditure_cost_inr}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">Stock</p>
                      <p className="font-medium">{product.total_stock}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">Profit/Item</p>
                      <p className="font-medium">₹{product.profit_per_item_inr}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">Vendor ID</p>
                      <p className="font-medium">{product.vendor_id}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Admin/Vendor Actions */}
              {(user?.role === "admin" || user?.role === "vendor") && (
                <div className="mt-8 border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Admin / Vendor Actions</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => navigate(`/edit-product/${product.id}`)}
                      className="bg-blue-500 text-white p-3 rounded-lg"
                    >
                      Edit Product
                    </button>
                    <button
                      onClick={() => navigate(`/delete-product/${product.id}`)}
                      className="bg-red-500 text-white p-3 rounded-lg"
                    >
                      Delete Product
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
