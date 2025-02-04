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
    'Pending': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    'Paid': 'bg-green-100 text-green-700 border-green-200',
    'Shipped': 'bg-blue-100 text-blue-700 border-blue-200',
    'Delivered': 'bg-emerald-100 text-emerald-700 border-emerald-200'
  };

  return (
    <span className={`
      px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide
      ${statusColors[status] || 'bg-gray-100 text-gray-700 border-gray-200'}
      border
    `}>
      {status}
    </span>
  );
};

const OrderItem = ({ item }) => (
  <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg mb-2 last:mb-0">
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center">
        <span className="text-sm font-medium text-gray-600">{item.product_id}</span>
      </div>
      <span className="text-gray-700">Product ID: {item.product_id}</span>
    </div>
    <span className="font-semibold text-gray-800">
      {item.quantity} × ₹{item.price.toFixed(2)}
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
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <RefreshCw className="mx-auto w-12 h-12 text-blue-500 animate-spin mb-4" />
        <p className="text-xl text-gray-600">Loading orders...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md">
        <AlertTriangle className="mx-auto w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Oops! Something went wrong</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <button 
          onClick={fetchOrders} 
          className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
            <h1 className="text-3xl font-bold flex items-center space-x-4">
              <ShoppingBag className="w-10 h-10" />
              <span>Your Orders</span>
            </h1>
            <p className="text-blue-100 mt-2">View and manage your recent purchases</p>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-16">
              <Package className="mx-auto w-24 h-24 text-gray-300 mb-6" />
              <p className="text-xl text-gray-500">No orders found</p>
              <button 
                onClick={() => navigate('/products')}
                className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {orders.map((order) => (
                <div key={order.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Order ID</p>
                      <p className="text-lg font-semibold text-gray-800">#{order.id}</p>
                    </div>
                    <OrderStatusBadge status={order.payment_status} />
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-6 h-6 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Order Date</p>
                        <p className="font-medium">{new Date(order.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-6 h-6 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Total</p>
                        <p className="font-semibold text-green-600">₹{order.total_price.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Truck className="w-6 h-6 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Status</p>
                        <p className="font-medium">{order.shipment_status || "Processing"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm font-semibold text-gray-600 mb-3">Order Items</p>
                    {order.order_items.map((item) => (
                      <OrderItem key={item.id} item={item} />
                    ))}
                  </div>

                  <button
                    onClick={() => navigate(`/payment/${order.id}`)}
                    className="w-full flex items-center justify-center space-x-2 py-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
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