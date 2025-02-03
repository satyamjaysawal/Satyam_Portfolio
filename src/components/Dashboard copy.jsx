import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getOrders } from "../api/api";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user, token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user?.role === "customer") {
      getOrders(token)
        .then((data) => setOrders(data))
        .catch(() => setError("Failed to fetch orders"))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user, token]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">📊 Dashboard</h1>

      {/* User Info */}
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 border">
        <h2 className="text-xl font-semibold">👤 Welcome, {user?.username}</h2>
        <p className="text-gray-600">Role: {user?.role}</p>
      </div>

      {/* 📦 Customer Dashboard */}
      {user?.role === "customer" && (
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 border mt-6">
          <h3 className="text-xl font-semibold mb-4">🛒 Recent Orders</h3>
          {loading ? (
            <p>Loading orders...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : orders.length === 0 ? (
            <p>No recent orders.</p>
          ) : (
            <ul>
              {orders.slice(0, 5).map((order) => (
                <li key={order.id} className="border-b py-2">
                  Order #{order.id} - ${order.total_price.toFixed(2)}
                  <span className="ml-2 text-sm text-gray-600">
                    ({order.status})
                  </span>
                </li>
              ))}
            </ul>
          )}
          <Link to="/orders" className="mt-4 block text-center bg-blue-500 text-white py-2 rounded hover:bg-blue-700">
            View All Orders
          </Link>
        </div>
      )}

      {/* 🏪 Vendor Dashboard */}
      {user?.role === "vendor" && (
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 border mt-6">
          <h3 className="text-xl font-semibold mb-4">📦 Vendor Panel</h3>
          <Link to="/products" className="block bg-purple-500 text-white py-2 rounded text-center hover:bg-purple-700">
            Manage Products
          </Link>
          <Link to="/orders" className="block mt-4 bg-yellow-500 text-white py-2 rounded text-center hover:bg-yellow-700">
            View Orders
          </Link>
          <Link to="/sales" className="block mt-4 bg-orange-500 text-white py-2 rounded text-center hover:bg-orange-700">
            Sales Report
          </Link>
        </div>
      )}

      {/* 🔧 Admin Dashboard */}
      {user?.role === "admin" && (
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 border mt-6">
          <h3 className="text-xl font-semibold mb-4">🔧 Admin Panel</h3>
          <Link to="/users" className="block bg-red-500 text-white py-2 rounded text-center hover:bg-red-700">
            Manage Users
          </Link>
          <Link to="/sales" className="block mt-4 bg-indigo-500 text-white py-2 rounded text-center hover:bg-indigo-700">
            View Sales Reports
          </Link>
          <Link to="/products" className="block mt-4 bg-teal-500 text-white py-2 rounded text-center hover:bg-teal-700">
            Monitor Products
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
