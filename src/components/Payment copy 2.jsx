import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getOrderDetails, createOrder, verifyPayment } from "../api/api";  
import { CreditCard, Truck, Calendar, ShoppingBag } from "lucide-react";

const Payment = () => {
  const { token } = useContext(AuthContext);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const { orderId } = useParams(); 

  useEffect(() => {
    if (token && orderId) {
      console.log("🔄 Fetching order details...");
      getOrderDetails(token, orderId)  
        .then((data) => {
          console.log("✅ Order details fetched successfully:", data);
          setOrder(data);
        })
        .catch((err) => {
          console.error("❌ Error while fetching order details:", err);
          setError("Failed to fetch order details");
        })
        .finally(() => {
          console.log("Finished fetching order details");
          setLoading(false);
        });
    } else {
      console.error("❌ Token or Order ID is missing");
      setError("No token found or invalid orderId.");
      setLoading(false);
    }
  }, [token, orderId]);

  const handlePayment = async () => {
    if (!order) {
      console.error('❌ Order data is missing');
      setError('Order data not available.');
      return;
    }

    console.log("🔄 Initiating payment...");
    try {
      // Create Razorpay order
      const orderData = await createOrder(order.total_price);
      console.log("✅ Order created:", orderData);

      // Razorpay payment options
      const options = {
        key: 'rzp_test_4yrD22C7exdkvY',  // Razorpay Test Key
        amount: order.total_price * 100, // In paise
        currency: 'INR',
        name: 'Your Store Name',
        description: `Payment for Order ${order.id}`,
        order_id: orderData.order_id,
        handler: async (response) => {
          console.log('✅ Payment successful', response);

          // Log payment data for verification
          const paymentData = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          };

          // Send payment data to the backend for processing
          try {
            const verifyResponse = await verifyPayment(paymentData.razorpay_payment_id, paymentData.razorpay_order_id);
            console.log("✅ Payment verified:", verifyResponse.data);
            setPaymentStatus("Payment successful!");
            setPaymentDetails(response);
          } catch (error) {
            console.error("❌ Payment verification failed:", error.response ? error.response.data : error);
            setPaymentStatus("Payment verification failed.");
          }
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#F37254',
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      console.log("🔄 Opening Razorpay payment gateway...");
      razorpayInstance.open();
    } catch (error) {
      console.error("❌ Failed to initiate payment:", error);
      setError('Payment initiation failed');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-lg text-gray-600">Loading payment details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg shadow-sm">
          <p className="flex items-center gap-2">
            <span className="text-2xl">⚠️</span>
            {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          <span className="flex items-center gap-3">
            <ShoppingBag className="w-8 h-8" />
            Payment for Order {order.id}
          </span>
        </h1>

        {/* Display Payment Status */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-semibold">Payment Status</h3>
          <p className="text-lg">{paymentStatus}</p>

          {/* Display Razorpay Payment Details */}
          {paymentDetails && (
            <div className="mt-4">
              <h4 className="text-lg font-medium">Razorpay Payment Details</h4>
              <div className="space-y-2 mt-2">
                <p><strong>Payment ID:</strong> {paymentDetails.razorpay_payment_id}</p>
                <p><strong>Order ID:</strong> {paymentDetails.razorpay_order_id}</p>
                <p><strong>Signature:</strong> {paymentDetails.razorpay_signature}</p>
                <p><strong>Amount Paid:</strong> ₹{(paymentDetails.amount / 100).toFixed(2)}</p>
                <p><strong>Payment Mode:</strong> {paymentDetails.method}</p>
                <p><strong>Payment Date:</strong> {new Date(paymentDetails.created_at * 1000).toLocaleString()}</p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6">
          <button
            onClick={handlePayment} 
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
