import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getOrderDetails, processPayment } from '../api/api'; // Import processPayment

const Payment = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [paymentLoading, setPaymentLoading] = useState(false); // Loading state for payment
  const [paymentError, setPaymentError] = useState(''); // Payment error state
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
    if (paymentLoading || order.payment_status === "Paid") return; // Prevent multiple clicks or redundant payments

    setPaymentLoading(true);
    setPaymentError('');

    try {
      const response = await processPayment(token, orderId); // Call the API to process payment
      // Update the order state with the new payment status
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
    const baseClasses = "px-3 py-1 rounded-full text-sm font-medium";
    
    const statusColors = {
      payment: {
        Paid: "bg-green-100 text-green-800",
        Pending: "bg-yellow-100 text-yellow-800",
        Failed: "bg-red-100 text-red-800"
      },
      shipment: {
        Shipped: "bg-blue-100 text-blue-800",
        Pending: "bg-yellow-100 text-yellow-800",
        Delivered: "bg-green-100 text-green-800"
      }
    };

    return `${baseClasses} ${statusColors[type][status] || "bg-gray-100 text-gray-800"}`;
  };

  const getShipmentMessage = () => {
    if (!order) return null;

    const messages = {
      paid_shipped: {
        type: "success",
        icon: "✅",
        message: "Your payment has been successfully processed! Your order is now being shipped. Please wait for the shipment to be updated by the vendor or admin.",
        classes: "bg-green-50 border-green-500 text-green-700"
      },
      paid_pending: {
        type: "warning",
        icon: "⏳",
        message: "Your payment has been successfully processed! Your order is awaiting shipment. Please check back for shipment updates from the vendor or admin.",
        classes: "bg-yellow-50 border-yellow-500 text-yellow-700"
      },
      paid_not_shipped: {
        type: "info",
        icon: "⏳",
        message: "Your payment has been successfully processed, but your order has not been shipped yet. Please wait for the shipment status to be updated by the vendor or admin.",
        classes: "bg-blue-50 border-blue-500 text-blue-700"
      },
      pending_payment: {
        type: "error",
        icon: "⚠️",
        message: "Your payment is still pending. Please complete the payment to proceed with the shipment.",
        classes: "bg-red-50 border-red-500 text-red-700"
      }
    };

    let messageKey;
    if (order.payment_status === "Paid" && order.shipment_status === "Shipped") {
      messageKey = "paid_shipped";
    } else if (order.payment_status === "Paid" && order.shipment_status === "Pending") {
      messageKey = "paid_pending";
    } else if (order.payment_status === "Paid" && order.shipment_status !== "Shipped") {
      messageKey = "paid_not_shipped"; // New message for paid but not shipped
    } else if (order.payment_status !== "Paid") {
      messageKey = "pending_payment";
    }

    const messageData = messages[messageKey];
    if (!messageData) return null;

    return (
      <div className={`mt-6 p-4 rounded-lg border-l-4 ${messageData.classes}`}>
        <div className="flex items-center">
          <span className="text-xl mr-2">{messageData.icon}</span>
          <p>{messageData.message}</p>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-100 bg-gray-50 px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Order Details</h2>
              <span className="text-sm text-gray-600">#{orderId}</span>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Order Date</p>
                <p className="font-medium text-gray-900">
                  {new Date(order.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                <p className="font-medium text-gray-900">₹{order.total_price}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Payment Status</span>
                <span className={getStatusBadge(order.payment_status, "payment")}>
                  {order.payment_status}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Shipment Status</span>
                <span className={getStatusBadge(order.shipment_status, "shipment")}>
                  {order.shipment_status}
                </span>
              </div>
            </div>

            {getShipmentMessage()}

            {order.payment_status !== "Paid" && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <button 
                  onClick={handlePayment} 
                  disabled={paymentLoading} 
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  {paymentLoading ? "Processing..." : "Complete Payment"}
                </button>
                {paymentError && <div className="mt-4 text-red-600">{paymentError}</div>}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
