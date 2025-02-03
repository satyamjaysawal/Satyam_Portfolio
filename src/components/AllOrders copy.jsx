import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getAllOrders, updateShipmentStatus, updateDeliveryStatus } from "../api/api";

const AllOrders = () => {
  const { user, token } = useContext(AuthContext);  // Destructure token and user from context
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);  // Added state to track success message

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) {
        console.error("No token available for the request.");
        setError("Authorization token is missing.");
        setLoading(false);
        return;
      }

      const isAdmin = user?.role === "admin";
      if (!isAdmin) {
        console.error("User does not have admin role.");
        setError("You do not have permission to view orders.");
        setLoading(false);
        return;
      }

      try {
        console.log("Authorization token:", token);

        const ordersData = await getAllOrders(token);  // Fetch orders with the token
        console.log("Fetched orders data:", ordersData);  // Log response data for debugging

        setOrders(ordersData);  // Update state with orders
      } catch (err) {
        setError("Failed to fetch orders.");
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    if (token && user?.role === "admin") {
      fetchOrders();  // Only fetch orders if the token is available and the user is an admin
    }
  }, [token, user?.role]);  // Re-run effect when token or user role changes

  // Function to handle updating shipment status
  const handleShipmentStatusUpdate = async (orderId, trackingId) => {
    // Ensure trackingId is valid
    if (!trackingId) {
      setError("Tracking ID is required to mark the order as shipped.");
      setSuccess(null);  // Reset success message if there's an error
      return;
    }

    try {
      const response = await updateShipmentStatus(orderId, trackingId, token);
      setSuccess(response.message);  // Show success message from the backend
      setError(null);  // Reset error message

      // Update the order status
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId ? { ...order, shipment_status: "Shipped", tracking_id: trackingId } : order
        )
      );
    } catch (err) {
      console.error("Error updating shipment status:", err);

      // Check if there's an error response and display the detail message from the backend
      if (err.response && err.response.data && err.response.data.detail) {
        setError(err.response.data.detail);  // Show the detailed error message from the backend
        setSuccess(null);  // Reset success message if there's an error
      } else {
        setError("Failed to update shipment status.");  // Fallback error message
        setSuccess(null);  // Reset success message
      }
    }
  };

  // Function to handle marking the order as delivered
  const handleMarkAsDelivered = async (orderId, trackingId) => {
    try {
      const response = await updateDeliveryStatus(orderId, trackingId, token);
      setSuccess(response.message);  // Show success message from the backend
      setError(null);  // Reset error message

      // Update the order status
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId ? { ...order, shipment_status: "Delivered" } : order
        )
      );
    } catch (err) {
      console.error("Error marking as delivered:", err);

      // Check if there's an error response and display the detail message from the backend
      if (err.response && err.response.data && err.response.data.detail) {
        setError(err.response.data.detail);  // Show the detailed error message from the backend
        setSuccess(null);  // Reset success message if there's an error
      } else {
        setError("Failed to mark order as delivered.");  // Fallback error message
        setSuccess(null);  // Reset success message
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;  // Display the error message if there's one
  if (success) return <div className="text-green-500">{success}</div>;  // Display the success message if there's one

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center">📦 All Orders</h1>
      <div className="mt-8">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.id} className="bg-white shadow-md rounded-lg p-4 mb-6">
              <h2 className="text-xl font-semibold">Order ID: {order.id}</h2>
              <p><strong>User ID:</strong> {order.user_id}</p>
              <p><strong>Total Price:</strong> ${order.total_price}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Payment Status:</strong> {order.payment_status}</p>
              <p><strong>Shipment Status:</strong> {order.shipment_status}</p>
              <p><strong>Tracking ID:</strong> {order.tracking_id || 'Not available'}</p>

              <div className="mt-4">
                {/* Shipment update button */}
                {order.shipment_status !== 'Shipped' && order.payment_status === 'Paid' && (
                  <button
                    onClick={() => handleShipmentStatusUpdate(order.id, order.tracking_id || "default-tracking-id")}
                    className="bg-green-500 text-white py-2 px-4 rounded mr-2"
                  >
                    Mark as Shipped
                  </button>
                )}

                {/* Mark as delivered button */}
                {order.shipment_status === 'Shipped' && order.status !== 'Delivered' && (
                  <button
                    onClick={() => handleMarkAsDelivered(order.id, order.tracking_id)}
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                  >
                    Mark as Delivered
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default AllOrders;
