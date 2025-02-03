import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ManageShipments = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all orders with shipment status
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/orders-all`, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
        setOrders(response.data);
      } catch (err) {
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user.token]);

  // Handle Shipment Status Update
  const handleShipmentStatusUpdate = async (orderId, trackingId) => {
    try {
      await axios.put(
        `${API_BASE_URL}/orders/${orderId}/shipment`,
        { tracking_id: trackingId },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      alert("Shipment status updated successfully.");
      // Re-fetch orders after update
      setOrders(orders.map(order =>
        order.id === orderId ? { ...order, shipment_status: 'Shipped' } : order
      ));
    } catch (err) {
      alert("Failed to update shipment status.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center">📦 Manage Shipments</h1>
      <div className="mt-8">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.id} className="bg-white shadow-md rounded-lg p-4 mb-6">
              <h2 className="text-xl font-semibold">Order ID: {order.id}</h2>
              <p><strong>User:</strong> {order.user_id}</p>
              <p><strong>Total Price:</strong> ${order.total_price}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Shipment Status:</strong> {order.shipment_status}</p>

              <div className="mt-4">
                {order.shipment_status !== 'Shipped' && (
                  <button
                    onClick={() => handleShipmentStatusUpdate(order.id, order.tracking_id)}
                    className="bg-green-500 text-white py-2 px-4 rounded"
                  >
                    Mark as Shipped
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No orders found with pending shipment.</p>
        )}
      </div>
    </div>
  );
};

export default ManageShipments;
