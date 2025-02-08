import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getOrderDetails, processPayment } from '../api/api';

const Payment = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderDetails = await getOrderDetails(token, orderId);
        setOrder(orderDetails);
      } catch (err) {
        setError("Failed to fetch order details");
        console.error("❌ Error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchOrder();
    } else {
      setError('Authentication required');
      setLoading(false);
    }
  }, [orderId, token]);

  const handlePayment = async () => {
    if (paymentLoading || order.payment_status === "Paid") return;

    setPaymentLoading(true);
    setPaymentError('');

    try {
      const response = await processPayment(token, orderId);
      setOrder((prevOrder) => ({
        ...prevOrder,
        payment_status: response.payment_status,
        shipment_status: response.shipment_status,
        transaction_id: response.transaction_id,
        tracking_id: response.tracking_id,
      }));
    } catch (err) {
      setPaymentError(err.message || "Payment failed. Please try again.");
    } finally {
      setPaymentLoading(false);
    }
  };

  const getStatusBadge = (status, type) => {
    const baseClasses = "px-4 py-2 rounded-xl text-sm font-medium backdrop-blur-sm border";
    
    const statusColors = {
      payment: {
        Paid: "bg-green-900/30 text-green-200 border-green-600",
        Pending: "bg-yellow-900/30 text-yellow-200 border-yellow-600",
        Failed: "bg-red-900/30 text-red-200 border-red-600"
      },
      shipment: {
        Shipped: "bg-blue-900/30 text-blue-200 border-blue-600",
        Pending: "bg-yellow-900/30 text-yellow-200 border-yellow-600",
        Delivered: "bg-green-900/30 text-green-200 border-green-600"
      }
    };

    return `${baseClasses} ${statusColors[type][status] || "bg-gray-800 text-gray-200 border-gray-600"}`;
  };

  const getShipmentMessage = () => {
    if (!order) return null;

    const messages = {
      paid_shipped: {
        type: "success",
        icon: "🚚",
        message: "Your order has been shipped! You will receive a tracking ID soon. Stay tuned! 📦",
        classes: "bg-blue-900/20 border-blue-500/50 text-blue-200"
      },
      paid_delivered: {
        type: "success",
        icon: "✅",
        message: "Your order has been delivered successfully! Thank you for shopping with us. 🎉",
        classes: "bg-green-900/20 border-green-500/50 text-green-200"
      },
      paid_pending: {
        type: "warning",
        icon: "⏳",
        message: "Your payment has been successfully processed! Your order is awaiting shipment.",
        classes: "bg-yellow-900/20 border-yellow-500/50 text-yellow-200"
      },
      pending_payment: {
        type: "error",
        icon: "⚠️",
        message: "Your payment is still pending. Please complete the payment to proceed with the shipment.",
        classes: "bg-red-900/20 border-red-500/50 text-red-200"
      }
    };

    let messageKey;
    if (order.payment_status === "Paid" && order.shipment_status === "Shipped") {
      messageKey = "paid_shipped";
    } else if (order.payment_status === "Paid" && order.shipment_status === "Delivered") {
      messageKey = "paid_delivered";
    } else if (order.payment_status === "Paid" && order.shipment_status === "Pending") {
      messageKey = "paid_pending";
    } else if (order.payment_status !== "Paid") {
      messageKey = "pending_payment";
    }

    const messageData = messages[messageKey];
    if (!messageData) return null;

    return (
      <div className={`mt-6 p-6 rounded-xl border ${messageData.classes} backdrop-blur-sm`}>
        <div className="flex items-center">
          <span className="text-2xl mr-3">{messageData.icon}</span>
          <p className="text-lg">{messageData.message}</p>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-red-900/20 border-l-4 border-red-500 p-6 rounded-xl backdrop-blur-sm">
          <p className="text-red-200 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-400 px-8 py-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Order Details</h2>
              <span className="text-lg text-blue-100 font-medium">#{orderId}</span>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-2 gap-8">
              <div className="bg-gray-700/30 p-4 rounded-xl backdrop-blur-sm">
                <p className="text-sm text-gray-400 mb-2">Order Date</p>
                <p className="font-medium text-white text-lg">
                  {new Date(order.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div className="bg-gray-700/30 p-4 rounded-xl backdrop-blur-sm">
                <p className="text-sm text-gray-400 mb-2">Total Amount</p>
                <p className="font-bold text-emerald-400 text-lg">₹{order.total_price}</p>
              </div>
            </div>

            <div className="mt-8 space-y-6">
              <div className="flex items-center justify-between bg-gray-700/20 p-4 rounded-xl backdrop-blur-sm">
                <span className="text-gray-300">Payment Status</span>
                <span className={getStatusBadge(order.payment_status, "payment")}>
                  {order.payment_status}
                </span>
              </div>
              <div className="flex items-center justify-between bg-gray-700/20 p-4 rounded-xl backdrop-blur-sm">
                <span className="text-gray-300">Shipment Status</span>
                <span className={getStatusBadge(order.shipment_status, "shipment")}>
                  {order.shipment_status}
                </span>
              </div>
            </div>

            {getShipmentMessage()}

            {order.payment_status !== "Paid" && (
              <div className="mt-8 pt-6 border-t border-gray-700">
                <button 
                  onClick={handlePayment} 
                  disabled={paymentLoading} 
                  className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl hover:bg-blue-700 
                  focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 
                  transition-all duration-300 transform hover:scale-105 text-lg font-medium
                  disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {paymentLoading ? "Processing payment..." : "Complete Payment"}
                </button>
                {paymentError && (
                  <div className="mt-4 p-4 bg-red-900/20 border border-red-500/50 rounded-xl text-red-200 text-center">
                    {paymentError}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;