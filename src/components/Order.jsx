import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getOrders } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { 
  Package, 
  Calendar, 
  Truck, 
  CreditCard, 
  ChevronRight, 
  ShoppingBag, 
  RefreshCw, 
  AlertTriangle 
} from 'lucide-react';

const OrderStatusBadge = ({ status }) => {
  const statusColors = {
    'Pending': 'bg-yellow-900/50 text-yellow-200 border-yellow-700',
    'Paid': 'bg-green-900/50 text-green-200 border-green-700',
    'Shipped': 'bg-blue-900/50 text-blue-200 border-blue-700',
    'Delivered': 'bg-emerald-900/50 text-emerald-200 border-emerald-700'
  };

  return (
    <span className={`
      px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide
      ${statusColors[status] || 'bg-gray-800 text-gray-200 border-gray-700'}
      border backdrop-blur-sm
    `}>
      {status}
    </span>
  );
};

const OrderItem = ({ item }) => (
  <div className="flex items-center justify-between bg-gray-800/50 p-4 rounded-xl mb-2 last:mb-0 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300">
    <div className="flex items-center space-x-3">
      <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
        <Package className="w-6 h-6 text-blue-400" />
      </div>
      <div>
        <span className="text-gray-300 text-sm">Product ID: {item.product_id}</span>
        <p className="text-white font-medium mt-1">Quantity: {item.quantity}</p>
      </div>
    </div>
    <span className="font-bold text-lg text-blue-400">
      ₹{item.price.toFixed(2)}
    </span>
  </div>
);

const Order = () => {
  const { token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchOrders = () => {
    if (token) {
      setLoading(true);
      getOrders(token)
        .then((data) => {
          setOrders(data);
          setError('');
        })
        .catch((err) => {
          setError("Failed to fetch orders");
          console.error("❌ Error:", err);
        })
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="text-center">
        <RefreshCw className="mx-auto w-16 h-16 text-blue-400 animate-spin mb-6" />
        <p className="text-xl text-blue-200">Loading your orders...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl text-center max-w-md border border-gray-700">
        <AlertTriangle className="mx-auto w-20 h-20 text-red-400 mb-6" />
        <h2 className="text-2xl font-bold text-white mb-4">Oops! Something went wrong</h2>
        <p className="text-gray-300 mb-6">{error}</p>
        <button 
          onClick={fetchOrders} 
          className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 shadow-2xl rounded-2xl overflow-hidden border border-gray-700">
          <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
            <div className="relative">
              <h1 className="text-3xl font-bold flex items-center space-x-4 text-white mb-4">
                <ShoppingBag className="w-10 h-10" />
                <span>Your Orders</span>
              </h1>
              <p className="text-blue-100">Track and manage your purchases</p>
            </div>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-20">
              <Package className="mx-auto w-32 h-32 text-gray-600 mb-6" />
              <p className="text-xl text-gray-300 mb-4">No orders found</p>
              <button 
                onClick={() => navigate('/products')}
                className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-700">
              {orders.map((order) => (
                <div key={order.id} className="p-6 hover:bg-gray-800/50 transition-all duration-300">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="text-sm text-gray-400">Order ID</p>
                      <p className="text-lg font-bold text-white">#{order.id}</p>
                    </div>
                    <OrderStatusBadge status={order.payment_status} />
                  </div>

                  <div className="grid grid-cols-3 gap-6 mb-8">
                    <div className="flex items-center space-x-3 bg-gray-800/30 p-4 rounded-xl backdrop-blur-sm">
                      <Calendar className="w-8 h-8 text-blue-400" />
                      <div>
                        <p className="text-xs text-gray-400">Order Date</p>
                        <p className="font-medium text-white">{new Date(order.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 bg-gray-800/30 p-4 rounded-xl backdrop-blur-sm">
                      <CreditCard className="w-8 h-8 text-blue-400" />
                      <div>
                        <p className="text-xs text-gray-400">Total</p>
                        <p className="font-bold text-emerald-400">₹{order.total_price.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 bg-gray-800/30 p-4 rounded-xl backdrop-blur-sm">
                      <Truck className="w-8 h-8 text-blue-400" />
                      <div>
                        <p className="text-xs text-gray-400">Status</p>
                        <p className="font-medium text-white">{order.shipment_status || "Processing"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm font-semibold text-gray-300 mb-4">Order Items</p>
                    {order.order_items.map((item) => (
                      <OrderItem key={item.id} item={item} />
                    ))}
                  </div>

                  <button
                    onClick={() => navigate(`/payment/${order.id}`)}
                    className="w-full flex items-center justify-center space-x-2 py-4 bg-blue-600/20 text-blue-400 rounded-xl 
                    hover:bg-blue-600/30 transition-all duration-300 border border-blue-500/30 backdrop-blur-sm"
                  >
                    <span>View Payment Details</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;