import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getOrderDetails } from '../api/api';  // Make sure to define this API method
import { CreditCard, Truck, Calendar, ShoppingBag } from 'lucide-react';

const Payment = () => {
  const { token } = useContext(AuthContext);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { orderId } = useParams(); // Get order ID from URL
  const navigate = useNavigate();

  useEffect(() => {
    if (token && orderId) {
      getOrderDetails(token, orderId)
        .then((data) => {
          setOrder(data);
        })
        .catch((err) => {
          setError("Failed to fetch order details");
          console.error("❌ Error:", err);
        })
        .finally(() => setLoading(false));
    }
  }, [token, orderId]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-pulse text-lg text-gray-600">Loading payment details...</div>
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
            Payment for Order {order.id}
          </span>
        </h1>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
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
                  <p className="font-medium">{new Date(order.created_at).toLocaleDateString()}</p>
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
                  <p className="font-medium">{order.shipment_status}</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => alert("Proceed to Payment")} // Add real payment handling logic here
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
