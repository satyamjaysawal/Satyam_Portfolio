import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getWishlist, removeFromWishlist, addToCart } from '../api/api';
import { Heart, Trash, ShoppingCart, PackageOpen, ArrowRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
  const { user, token } = useContext(AuthContext);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [movingToCart, setMovingToCart] = useState({}); // Track individual item moving status
  const navigate = useNavigate();

  useEffect(() => {
    if (user && token) {
      fetchWishlistItems();
    }
  }, [user, token]);

  const fetchWishlistItems = () => {
    setLoading(true);
    getWishlist(token)
      .then((data) => {
        if (data && Array.isArray(data)) {
          setWishlistItems(data);
        } else {
          setError(data?.detail || "Your wishlist is empty.");
          setWishlistItems([]);
        }
      })
      .catch((err) => {
        setError('Error fetching wishlist items');
        console.error('Error:', err);
      })
      .finally(() => setLoading(false));
  };

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(token, productId)
      .then(() => {
        setWishlistItems((prevItems) => 
          prevItems.filter(item => item.product.id !== productId)
        );
      })
      .catch((err) => {
        setError('Failed to remove item');
        console.error('Error:', err);
      });
  };

  const handleAddToCart = async (productId, quantity) => {
    if (!token) {
      setError("Please log in to add items to your cart.");
      return;
    }

    setMovingToCart(prev => ({ ...prev, [productId]: true })); // Set loading state for the product

    try {
      await addToCart(token, productId, quantity);
      // Remove from wishlist after successful cart addition
      setWishlistItems(prevItems => 
        prevItems.filter(item => item.product.id !== productId)
      );
    } catch (err) {
      setError("Failed to add item to cart.");
      console.error("Error:", err);
    } finally {
      setMovingToCart(prev => ({ ...prev, [productId]: false })); // Reset loading state for the product
    }
  };

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-pulse">
      {[...Array(3)].map((_, index) => (
        <div 
          key={index} 
          className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gray-300/20 rounded-xl" />
            <div className="flex-1 space-y-3">
              <div className="h-4 bg-gray-300/20 rounded w-3/4" />
              <div className="h-3 bg-gray-300/20 rounded w-1/2" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const EmptyWishlist = () => (
    <div className="text-center py-16 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10">
      <PackageOpen className="w-24 h-24 text-blue-400/50 mx-auto mb-6" />
      <h3 className="text-2xl font-bold text-white mb-4">Your Wishlist is Empty</h3>
      <p className="text-gray-400 mb-8 px-4">
        Explore our products and add some amazing items to your wishlist!
      </p>
      <button
        onClick={() => navigate('/products')}
        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white 
        rounded-full hover:scale-105 transition-all duration-300 flex items-center mx-auto"
      >
        Continue Shopping
        <ArrowRight className="ml-2 w-5 h-5" />
      </button>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-10">
            Your Wishlist
          </h1>
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex items-center gap-4 mb-10">
          <Heart className="w-10 h-10 text-red-500" />
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
            Your Wishlist
          </h1>
        </header>

        {/* Error Handling */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 mb-6 flex items-center">
            <span className="text-red-300">{error}</span>
          </div>
        )}

        {/* Wishlist Content */}
        {wishlistItems.length === 0 ? (
          <EmptyWishlist />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <div 
                key={item.product.id} 
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 
                transition-all duration-300 hover:border-blue-500/30 hover:shadow-2xl"
              >
                {/* Product Image */}
                <div className="flex items-center mb-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden mr-4 
                  shadow-lg border border-white/10">
                    <img 
                      src={item.product.image_url} 
                      alt={item.product.name}
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {item.product.category}
                    </p>
                  </div>
                </div>

                {/* Product Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-blue-400">
                      ₹{item.product.price_after_discount}
                    </span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <span 
                          key={i}
                          className={`text-lg ${
                            i < Math.floor(item.product.product_rating)
                              ? 'text-yellow-400'
                              : 'text-gray-600'
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 line-clamp-2">
                    {item.product.description}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleAddToCart(item.product.id, 1)} // assuming 1 as default quantity
                    disabled={movingToCart[item.product.id]}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 
                    text-white py-3 rounded-lg hover:opacity-90 transition-all 
                    flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {movingToCart[item.product.id] ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Moving to Cart...</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleRemoveFromWishlist(item.product.id)}
                    className="bg-white/10 text-white p-3 rounded-lg hover:bg-white/20 
                    transition-all flex items-center justify-center"
                  >
                    <Trash className="w-5 h-5 text-red-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
