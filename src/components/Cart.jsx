import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getCart, removeFromCart, placeOrder, addToWishlist } from '../api/api';
import { Trash2, Heart, ShoppingBag, AlertCircle, Package, ArrowRight, Loader2 } from 'lucide-react';
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
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-white rounded-xl p-4 animate-pulse">
          <div className="flex gap-4">
            <div className="w-24 h-24 bg-gray-200 rounded-lg" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const EmptyCart = () => (
    <div className="text-center py-12">
      <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
      <p className="text-gray-600 mb-6">Add items to your cart to get started</p>
      <button
        onClick={() => navigate('/products')}
        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg 
          hover:bg-blue-700 transition-colors duration-200"
      >
        Continue Shopping
        <ArrowRight className="ml-2 w-4 h-4" />
      </button>
    </div>
  );

  if (loading) return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>
      <LoadingSkeleton />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <ShoppingBag className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {orderSuccess && (
          <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-green-600 font-medium flex items-center gap-2">
              🎉 Order placed successfully! Redirecting to orders...
            </p>
          </div>
        )}

        {wishlistError && (
          <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <p className="text-red-600">{wishlistError}</p>
          </div>
        )}

        {wishlistSuccess && (
          <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-green-600 font-medium flex items-center gap-2">
              🎉 {wishlistSuccess}
            </p>
          </div>
        )}

        {cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div 
                  key={item.product.id} 
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
                >
                  <div className="p-4">
                    <div className="flex gap-4">
                      <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={item.product.image_url} 
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                            <p className="text-sm text-gray-600 mt-1">Quantity: {item.quantity}</p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleAddToWishlist(item.product.id)}
                              className="p-2 text-gray-500 hover:text-red-500 hover:bg-gray-100 rounded-full 
                                transition-colors duration-200"
                              title="Add to wishlist"
                            >
                              <Heart className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleRemoveFromCart(item.product.id)}
                              className="p-2 text-gray-500 hover:text-red-500 hover:bg-gray-100 rounded-full 
                                transition-colors duration-200"
                              title="Remove from cart"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex justify-between items-end">
                          <div>
                            <p className="text-lg font-semibold text-gray-900">
                              ₹{(item.product.price_after_discount * item.quantity).toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-500">
                              ₹{item.product.price_after_discount} each
                            </p>
                          </div>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <span 
                                key={i}
                                className={`text-sm ${
                                  i < Math.floor(item.product.product_rating)
                                    ? 'text-yellow-400'
                                    : 'text-gray-300'
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
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span>₹{totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-semibold text-gray-900">
                      <span>Total</span>
                      <span>₹{totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={processingOrder}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium
                    hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                    transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {processingOrder ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    'Place Order'
                  )}
                </button>

                <p className="text-sm text-gray-500 mt-4 text-center">
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
