import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getProductDetails, addToCart, addToWishlist, getProductReviews } from "../api/api";
import ReviewModal from "./ReviewModal";
import { Star, ShoppingCart, Heart, Edit, Trash2, ZoomIn, AlertCircle } from 'lucide-react';

// Custom Alert Component
const CustomAlert = ({ children, variant = "default" }) => {
  const bgColor = variant === "destructive" ? "bg-red-50" : "bg-blue-50";
  const textColor = variant === "destructive" ? "text-red-700" : "text-blue-700";
  const borderColor = variant === "destructive" ? "border-red-200" : "border-blue-200";

  return (
    <div className={`${bgColor} ${textColor} ${borderColor} border rounded-lg p-4 flex items-center space-x-2`}>
      <AlertCircle className="w-5 h-5" />
      <p>{children}</p>
    </div>
  );
};

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
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [isImageZoomed, setIsImageZoomed] = useState(false);

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

    if (productId && token) {
      const fetchReviews = async () => {
        try {
          const reviewData = await getProductReviews(productId, token);
          setReviews(reviewData.reviews || []);
        } catch (err) {
          console.error("Error fetching reviews:", err);
        }
      };
      fetchReviews();
    }

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
      
      // Show success notification
      const notification = document.createElement('div');
      notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg transform translate-y-0 opacity-100 transition-all duration-500';
      notification.textContent = 'Added to cart!';
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(100%)';
        setTimeout(() => notification.remove(), 500);
      }, 3000);
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

  const handleReviewSubmitted = (newReview) => {
    setReviews([...reviews, newReview]);
    setIsReviewModalOpen(false);
  };

  const LoadingSkeleton = () => (
    <div className="flex flex-col items-center space-y-4 w-full max-w-6xl mx-auto p-6">
      <div className="w-full h-64 bg-gray-200 rounded-lg animate-pulse" />
      <div className="w-3/4 h-8 bg-gray-200 rounded animate-pulse" />
      <div className="w-1/2 h-6 bg-gray-200 rounded animate-pulse" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        <div className="space-y-4">
          <div className="h-96 bg-gray-200 rounded-lg animate-pulse" />
        </div>
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded animate-pulse" />
          <div className="h-24 bg-gray-200 rounded animate-pulse" />
          <div className="h-12 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );

  if (loading) return <LoadingSkeleton />;

  if (error) {
    return (
      <div className="max-w-xl mx-auto mt-8">
        <CustomAlert variant="destructive">{error}</CustomAlert>
      </div>
    );
  }

  const calculateDiscountPercentage = () => {
    if (product.price_before_discount && product.price_after_discount) {
      return Math.round(
        ((product.price_before_discount - product.price_after_discount) / 
        product.price_before_discount) * 100
      );
    }
    return 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Breadcrumb with animation */}
          <div className="px-6 py-3 bg-gray-50 border-b">
            <p className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
              <span className="hover:text-blue-600 cursor-pointer">Home</span> /{" "}
              <span className="hover:text-blue-600 cursor-pointer">{product.category}</span> /{" "}
              <span className="text-gray-900">{product.name}</span>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            {/* Image Section with Zoom */}
            <div className="space-y-4">
              <div className="relative group">
                <div 
                  className={`aspect-square w-full max-w-2xl mx-auto rounded-xl overflow-hidden 
                    bg-gray-50 ${!imageLoaded ? 'animate-pulse' : ''} 
                    ${isImageZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
                  onClick={() => setIsImageZoomed(!isImageZoomed)}
                >
                  <img
                    src={product.image_url}
                    alt={product.name}
                    onLoad={() => setImageLoaded(true)}
                    className={`w-full h-full object-contain transition-all duration-300
                      ${imageLoaded ? 'opacity-100' : 'opacity-0'}
                      ${isImageZoomed ? 'scale-150' : 'scale-100'}
                      hover:scale-110`}
                  />
                </div>
                {!isImageZoomed && (
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 
                    transition-opacity duration-300 rounded-xl flex items-center justify-center">
                    <ZoomIn className="text-white opacity-0 group-hover:opacity-100 
                      transform translate-y-4 group-hover:translate-y-0 transition-all duration-300" />
                  </div>
                )}
              </div>

              {/* Product Tags */}
              <div className="flex flex-wrap gap-2">
                {product.stock_remaining < 10 && (
                  <span className="px-4 py-1.5 bg-red-100 text-red-600 rounded-full text-sm 
                    font-medium animate-pulse">
                    Only {product.stock_remaining} left!
                  </span>
                )}
                {calculateDiscountPercentage() > 0 && (
                  <span className="px-4 py-1.5 bg-green-100 text-green-600 rounded-full text-sm 
                    font-medium">
                    {calculateDiscountPercentage()}% OFF
                  </span>
                )}
              </div>
            </div>

            {/* Product Info Section */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                  {product.name}
                </h1>
                <p className="text-lg text-gray-600">{product.category}</p>
                
                {/* Rating with animated stars */}
                <div className="flex items-center space-x-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`w-5 h-5 transition-all duration-300 
                          ${index < Math.floor(product.product_rating || 0) 
                            ? 'fill-current' 
                            : 'fill-none'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    ({product.product_rating?.toFixed(1) || "No ratings"})
                  </span>
                </div>
              </div>

              {/* Price Card with gradient and animation */}
              <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-green-50 
                p-6 rounded-xl transform hover:scale-102 transition-all duration-300">
                <div className="flex items-baseline space-x-3">
                  <span className="text-4xl font-bold text-green-600">
                    ₹{product.price_after_discount.toFixed(2)}
                  </span>
                  {product.price_before_discount && (
                    <span className="text-lg text-gray-500 line-through">
                      ₹{product.price_before_discount.toFixed(2)}
                    </span>
                  )}
                </div>
                <p className="text-sm text-green-700 mt-2">
                  <span className="font-medium">{product.stock_remaining}</span> units available
                </p>
              </div>

              {/* Description with custom styling */}
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>

              {/* Purchase Controls */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <label className="text-gray-700 font-medium">Quantity:</label>
                  <div className="relative inline-flex items-center">
                    <button
                      onClick={() => quantity > 1 && setQuantity((q) => q - 1)}
                      className="w-10 h-10 flex items-center justify-center bg-gray-100 
                        rounded-l-lg hover:bg-gray-200 transition-colors active:bg-gray-300"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      max={product.stock_remaining}
                      value={quantity}
                      onChange={(e) => setQuantity(Math.min(
                        Math.max(1, parseInt(e.target.value) || 1),
                        product.stock_remaining
                      ))}
                      className="w-20 h-10 text-center border-y border-gray-200 focus:outline-none 
                        focus:ring-2 focus:ring-green-500"
                    />
                    <button
                      onClick={() => quantity < product.stock_remaining && setQuantity((q) => q + 1)}
                      className="w-10 h-10 flex items-center justify-center bg-gray-100 
                        rounded-r-lg hover:bg-gray-200 transition-colors active:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-gradient-to-r from-green-600 to-green-500 text-white 
                      px-6 py-4 rounded-xl font-medium hover:from-green-700 hover:to-green-600 
                      transform hover:-translate-y-0.5 transition-all duration-150 
                      focus:ring-2 focus:ring-green-500 focus:ring-offset-2 
                      flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    onClick={handleAddToWishlist}
                    className="flex-1 border-2 border-gray-300 text-gray-700 px-6 py-4 
                      rounded-xl font-medium hover:bg-gray-50 transform hover:-translate-y-0.5 
                      transition-all duration-150 focus:ring-2 focus:ring-gray-200 
                      flex items-center justify-center space-x-2"
                  >
                    <Heart className="w-5 h-5" />
                    <span>Save for Later</span>
                  </button>
                </div>

                {/* Review Button */}
                <button
                  onClick={() => setIsReviewModalOpen(true)}
                  className="w-full bg-blue-500 text-white px-6 py-4 rounded-xl font-medium 
                    hover:bg-blue-600 transform hover:-translate-y-0.5 transition-all duration-150 
                    focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Write a Review
                </button>

                {/* Reviews Section */}
                <div className="mt-8 space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">Customer Reviews</h3>
                  {reviews.length > 0 ? (
                    <div className="space-y-4">
                      {reviews.map((review, index) => (
                        <div
                          key={review.id || index}
                          className="bg-gray-50 p-4 rounded-xl space-y-2 transform hover:scale-101 
                            transition-all duration-200"
                        >
                          <div className="flex items-center space-x-2">
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating ? 'fill-current' : 'fill-none'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">
                              {new Date(review.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                          {review.user_name && (
                            <p className="text-sm text-gray-500">By {review.user_name}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">No reviews yet. Be the first to review!</p>
                  )}
                </div>

                {/* Review Modal */}
                {isReviewModalOpen && (
                  <ReviewModal
                    productId={product.id}
                    onClose={() => setIsReviewModalOpen(false)}
                    onReviewSubmitted={handleReviewSubmitted}
                  />
                )}

                {/* Message Notifications */}
                {message && (
                  <div
                    className={`p-4 rounded-xl shadow-lg transform transition-all duration-300 
                      ${message.includes("Failed")
                        ? "bg-red-50 text-red-700 border border-red-100"
                        : "bg-green-50 text-green-700 border border-green-100"
                      } hover:scale-102`}
                  >
                    <p className="flex items-center space-x-2">
                      {message.includes("Failed") ? (
                        <span className="w-4 h-4 rounded-full bg-red-200 flex items-center justify-center">!</span>
                      ) : (
                        <span className="w-4 h-4 rounded-full bg-green-200 flex items-center justify-center">✓</span>
                      )}
                      <span>{message}</span>
                    </p>
                  </div>
                )}

                {/* Admin/Vendor Details */}
                {(user?.role === "admin" || user?.role === "vendor") && (
                  <div className="mt-8 border-t border-gray-200 pt-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Business Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                        <p className="text-sm text-gray-600">Cost Price</p>
                        <p className="font-medium text-lg">₹{product.expenditure_cost_inr}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                        <p className="text-sm text-gray-600">Total Stock</p>
                        <p className="font-medium text-lg">{product.total_stock}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                        <p className="text-sm text-gray-600">Profit per Item</p>
                        <p className="font-medium text-lg">₹{product.profit_per_item_inr}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                        <p className="text-sm text-gray-600">Vendor ID</p>
                        <p className="font-medium text-lg">{product.vendor_id}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Admin/Vendor Actions */}
                {(user?.role === "admin" || user?.role === "vendor") && (
                  <div className="mt-8 border-t border-gray-200 pt-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Admin / Vendor Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => navigate(`/update-product/:productId`)}
                        className="flex items-center justify-center space-x-2 bg-blue-500 text-white 
                          p-4 rounded-xl hover:bg-blue-600 transform hover:-translate-y-0.5 
                          transition-all duration-150 focus:ring-2 focus:ring-blue-500 
                          focus:ring-offset-2"
                      >
                        <Edit className="w-5 h-5" />
                        <span>Edit Product</span>
                      </button>
                      <button
                        onClick={() => navigate(`/delete-product/${product.id}`)}
                        className="flex items-center justify-center space-x-2 bg-red-500 text-white 
                          p-4 rounded-xl hover:bg-red-600 transform hover:-translate-y-0.5 
                          transition-all duration-150 focus:ring-2 focus:ring-red-500 
                          focus:ring-offset-2"
                      >
                        <Trash2 className="w-5 h-5" />
                        <span>Delete Product</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;