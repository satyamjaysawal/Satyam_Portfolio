import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getCart, removeFromCart, placeOrder, addToWishlist } from '../api/api';
import { 
  Trash2, 
  Heart, 
  ShoppingBag, 
  AlertCircle, 
  Package, 
  ArrowRight, 
  Loader2, 
  CheckCircle,
  XCircle 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { user, token } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [wishlistError, setWishlistError] = useState('');
  const [wishlistSuccess, setWishlistSuccess] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [processingOrder, setProcessingOrder] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && token) {
      fetchCartItems();
    }
  }, [user, token]);

  const fetchCartItems = () => {
    setLoading(true);
    getCart(token)
      .then((data) => {
        setCartItems(data.cart_items);
        setTotalAmount(data.total_amount);
      })
      .catch(() => setError('Error fetching cart items'))
      .finally(() => setLoading(false));
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      await removeFromCart(token, productId);
      const updatedCart = cartItems.filter(item => item.product.id !== productId);
      setCartItems(updatedCart);
      setTotalAmount(updatedCart.reduce((acc, item) => 
        acc + item.product.price_after_discount * item.quantity, 0
      ));
    } catch {
      setError('Failed to remove item from cart');
    }
  };

  const handleAddToWishlist = async (productId) => {
    try {
      await addToWishlist(token, productId);
      setWishlistSuccess('Item added to wishlist successfully!');
      setWishlistError('');
    } catch (err) {
      setWishlistError(err.detail || 'Failed to add item to wishlist');
      setWishlistSuccess('');
    }
  };

  const handlePlaceOrder = async () => {
    setError('');
    setOrderSuccess(false);
    setProcessingOrder(true);
    try {
      await placeOrder(token);
      setOrderSuccess(true);
      setCartItems([]);
      setTotalAmount(0);
      setTimeout(() => navigate('/orders'), 2000);
    } catch {
      setError('Failed to place order');
    } finally {
      setProcessingOrder(false);
    }
  };

  const LoadingSkeleton = () => (
    <div className="space-y-6">
      {[...Array(3)].map((_, i) => (
        <div 
          key={i} 
          className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-5 animate-pulse"
        >
          <div className="flex items-center space-x-6">
            <div className="w-28 h-28 bg-gray-300/20 rounded-xl" />
            <div className="flex-1 space-y-4">
              <div className="h-5 bg-gray-300/20 rounded w-3/4" />
              <div className="h-4 bg-gray-300/20 rounded w-1/2" />
              <div className="h-4 bg-gray-300/20 rounded w-1/3" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const EmptyCart = () => (
    <div className="text-center py-16 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10">
      <Package className="w-24 h-24 text-blue-400/50 mx-auto mb-6" />
      <h3 className="text-2xl font-bold text-white mb-4">Your Cart is Empty</h3>
      <p className="text-gray-400 mb-8 px-4">
        Explore our products and add some amazing items to your cart!
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

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-10">
          Your Cart
        </h1>
        <LoadingSkeleton />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex items-center gap-4 mb-10">
          <ShoppingBag className="w-10 h-10 text-blue-500" />
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
            Your Cart
          </h1>
        </header>

        {/* Notifications */}
        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex items-center space-x-4">
            <XCircle className="w-7 h-7 text-red-500" />
            <span className="text-red-300">{error}</span>
          </div>
        )}

        {orderSuccess && (
          <div className="mb-6 bg-green-500/10 border border-green-500/20 rounded-2xl p-4 flex items-center space-x-4">
            <CheckCircle className="w-7 h-7 text-green-500" />
            <span className="text-green-300">Order placed successfully! Redirecting...</span>
          </div>
        )}

        {wishlistError && (
          <div className="mb-6 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-4 flex items-center space-x-4">
            <AlertCircle className="w-7 h-7 text-yellow-500" />
            <span className="text-yellow-300">{wishlistError}</span>
          </div>
        )}

        {wishlistSuccess && (
          <div className="mb-6 bg-green-500/10 border border-green-500/20 rounded-2xl p-4 flex items-center space-x-4">
            <CheckCircle className="w-7 h-7 text-green-500" />
            <span className="text-green-300">{wishlistSuccess}</span>
          </div>
        )}

        {cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="md:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div 
                  key={item.product.id} 
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden 
                  transition-all duration-300 hover:border-blue-500/30 hover:shadow-2xl"
                >
                  <div className="p-6 flex items-center space-x-6">
                    {/* Product Image */}
                    <div className="w-28 h-28 rounded-xl overflow-hidden flex-shrink-0 
                    shadow-lg border border-white/10">
                      <img 
                        src={item.product.image_url} 
                        alt={item.product.name}
                        className="w-full h-full object-cover transform hover:scale-110 transition-transform"
                      />
                    </div>
                    
                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-white">{item.product.name}</h3>
                          <p className="text-sm text-gray-400 mt-1">Quantity: {item.quantity}</p>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleAddToWishlist(item.product.id)}
                            className="p-2 bg-white/5 rounded-full hover:bg-white/10 
                            text-gray-300 hover:text-red-500 transition-all"
                            title="Add to wishlist"
                          >
                            <Heart className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleRemoveFromCart(item.product.id)}
                            className="p-2 bg-white/5 rounded-full hover:bg-white/10 
                            text-gray-300 hover:text-red-500 transition-all"
                            title="Remove from cart"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Price and Rating */}
                      <div className="mt-4 flex justify-between items-end">
                        <div>
                          <p className="text-xl font-bold text-blue-400">
                            ₹{(item.product.price_after_discount * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-500">
                            ₹{item.product.price_after_discount} each
                          </p>
                        </div>
                        
                        {/* Star Rating */}
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
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="md:col-span-1">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 
              sticky top-8 transition-all duration-300 hover:border-blue-500/30 hover:shadow-2xl">
                <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span>₹{totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Shipping</span>
                    <span className="text-green-400">Free</span>
                  </div>
                  <div className="border-t border-white/10 pt-4">
                    <div className="flex justify-between text-xl font-bold text-white">
                      <span>Total</span>
                      <span className="text-blue-400">₹{totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={processingOrder}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 
                  text-white rounded-full hover:opacity-90 transition-all duration-300 
                  flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {processingOrder ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    'Place Order'
                  )}
                </button>

                <p className="text-sm text-gray-500 text-center mt-4">
                  Free shipping on all orders
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;