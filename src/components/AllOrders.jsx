import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getAllOrders, updateShipmentStatus, updateDeliveryStatus } from "../api/api";

const AllOrders = () => {
  const { user, token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) {
        setError("Authorization token is missing.");
        setLoading(false);
        return;
      }

      const isAdmin = user?.role === "admin";
      if (!isAdmin) {
        setError("You do not have permission to view orders.");
        setLoading(false);
        return;
      }

      try {
        const ordersData = await getAllOrders(token);
        setOrders(ordersData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (token && user?.role === "admin") {
      fetchOrders();
    }
  }, [token, user?.role]);

  const handleShipmentStatusUpdate = async (orderId, trackingId) => {
    if (!trackingId) {
      setError("Tracking ID is required to mark the order as shipped.");
      return;
    }

    try {
      const response = await updateShipmentStatus(orderId, trackingId, token);
      setSuccessMessage(response.message);
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId ? { ...order, shipment_status: "Shipped", tracking_id: trackingId } : order
        )
      );
    } catch (err) {
      setError(err);
    }
  };

  const handleMarkAsDelivered = async (orderId, trackingId) => {
    try {
      const response = await updateDeliveryStatus(orderId, trackingId, token);
      setSuccessMessage(response.message);
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId ? { ...order, shipment_status: "Delivered" } : order
        )
      );
    } catch (err) {
      setError(err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid':
        return 'bg-emerald-900 text-emerald-200';
      case 'Pending':
        return 'bg-amber-900 text-amber-200';
      case 'Shipped':
        return 'bg-blue-900 text-blue-200';
      case 'Delivered':
        return 'bg-purple-900 text-purple-200';
      default:
        return 'bg-gray-800 text-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4">
      {error && (
        <div className="max-w-7xl mx-auto mb-6 p-4 bg-red-900/50 border-l-4 border-red-500 rounded">
          <p className="text-red-200">{error.toString()}</p>
        </div>
      )}

      {successMessage && (
        <div className="max-w-7xl mx-auto mb-6 p-4 bg-emerald-900/50 border-l-4 border-emerald-500 rounded">
          <p className="text-emerald-200">{successMessage}</p>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Orders Dashboard</h1>
          <span className="px-4 py-2 bg-blue-900/50 text-blue-200 rounded-full text-sm font-medium">
            Total Orders: {orders.length}
          </span>
        </div>

        <div className="grid gap-6">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order.id} className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden hover:shadow-xl transition-shadow duration-200 hover:border-gray-600">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">📦</span>
                      <h2 className="text-xl font-semibold text-white">Order #{order.id}</h2>
                    </div>
                    <div className="flex space-x-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.payment_status)}`}>
                        {order.payment_status}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.shipment_status)}`}>
                        {order.shipment_status || 'Pending'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-gray-700/50 p-4 rounded-lg backdrop-blur-sm">
                      <p className="text-sm text-gray-400 mb-1">Customer</p>
                      <p className="font-medium text-white">ID: {order.user_id}</p>
                    </div>
                    <div className="bg-gray-700/50 p-4 rounded-lg backdrop-blur-sm">
                      <p className="text-sm text-gray-400 mb-1">Total Amount</p>
                      <p className="font-medium text-white">${order.total_price}</p>
                    </div>
                    <div className="bg-gray-700/50 p-4 rounded-lg backdrop-blur-sm">
                      <p className="text-sm text-gray-400 mb-1">Tracking ID</p>
                      <p className="font-medium text-white">{order.tracking_id || 'Not available'}</p>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6 pt-6 border-t border-gray-700">
                    {order.shipment_status !== 'Shipped' && order.payment_status === 'Paid' && (
                      <button
                        onClick={() => handleShipmentStatusUpdate(order.id, order.tracking_id || "default-tracking-id")}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors duration-200"
                      >
                        Mark as Shipped
                      </button>
                    )}

                    {order.shipment_status === 'Shipped' && order.status !== 'Delivered' && (
                      <button
                        onClick={() => handleMarkAsDelivered(order.id, order.tracking_id)}
                        className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors duration-200"
                      >
                        Mark as Delivered
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-gray-800 rounded-lg border border-gray-700">
              <p className="text-gray-400">No orders found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllOrders;