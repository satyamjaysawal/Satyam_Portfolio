import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getOrders } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { Package, Calendar, Truck, CreditCard, ChevronRight, ShoppingBag } from 'lucide-react';

const Order = () => {
  const { token } = useContext(AuthContext);  // Fetch the token from context
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      getOrders(token)
        .then((data) => {
          setOrders(data);
        })
        .catch((err) => {
          setError("Failed to fetch orders");
          console.error("❌ Error:", err);
        })
        .finally(() => setLoading(false));
    }
  }, [token]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-pulse text-lg text-gray-600">Loading orders...</div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-red-50 text-red-600 p-4 rounded-lg shadow-sm">
        <p className="flex items-center gap-2">
          <span className="text-2xl">⚠️</span>
          {error}
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          <span className="flex items-center gap-3">
            <ShoppingBag className="w-8 h-8" />
            Your Orders
          </span>
        </h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div 
                key={order.id} 
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Order ID</p>
                      <p className="font-semibold text-lg">{order.id}</p>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                      order.payment_status === 'Pending' 
                        ? 'bg-yellow-100 text-yellow-700' 
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {order.payment_status}
                    </span>
                  </div>

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Order Date</p>
                        <p className="font-medium">
                          {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Total Amount</p>
                        <p className="font-medium">₹{order.total_price}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Truck className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Shipment Status</p>
                        <p className="font-medium">{order.shipment_status || "Pending"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <p className="text-sm font-medium text-gray-500">Order Items</p>
                    {order.order_items.map((item) => (
                      <div 
                        key={item.id} 
                        className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
                      >
                        <span className="text-gray-700">Product ID: {item.product_id}</span>
                        <span className="font-medium">{item.quantity} x ₹{item.price}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => navigate(`/payment/${order.id}`)} // Navigation updated to Payment page
                    className="mt-6 w-full flex items-center justify-center gap-2 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-700 font-medium transition-colors duration-200"
                  >
                    Go to Payment
                    <ChevronRight className="w-4 h-4" />
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

export default Order;
