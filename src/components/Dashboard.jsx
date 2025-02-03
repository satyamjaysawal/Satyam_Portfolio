import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const DashboardCard = ({ to, title, description, icon, color }) => (
  <Link 
    to={to}
    className={`block p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 ${color}`}
  >
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
      <span className="text-3xl ml-4">{icon}</span>
    </div>
  </Link>
);

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {getGreeting()}, {user?.username}! 👋
              </h1>
              <p className="text-gray-600">
                Welcome to your {user?.role === "admin" ? "admin" : "vendor"} dashboard
              </p>
            </div>
            <div className="hidden md:block">
              <div className={`px-4 py-2 rounded-full ${
                user?.role === "admin" 
                  ? "bg-blue-100 text-blue-800" 
                  : "bg-purple-100 text-purple-800"
              }`}>
                {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)} Account
              </div>
            </div>
          </div>
        </div>

        {/* Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {user?.role === "admin" && (
            <>
              <DashboardCard
                to="/users"
                title="Manage Users"
                description="View and manage user accounts, permissions, and roles"
                icon="👥"
                color="hover:bg-red-50"
              />
              
              <DashboardCard
                to="/orders-all"
                title="Order Management"
                description="Track orders and manage shipments across the platform"
                icon="📦"
                color="hover:bg-blue-50"
              />
              
              <DashboardCard
                to="/analytics"
                title="Analytics"
                description="View detailed statistics and performance metrics"
                icon="📊"
                color="hover:bg-green-50"
              />
              
              <DashboardCard
                to="/settings"
                title="Platform Settings"
                description="Configure system settings and preferences"
                icon="⚙️"
                color="hover:bg-yellow-50"
              />
            </>
          )}

          {user?.role === "vendor" && (
            <>
              <DashboardCard
                to="/products"
                title="Product Management"
                description="Add, edit, and manage your product catalog"
                icon="🛍️"
                color="hover:bg-purple-50"
              />
              
              <DashboardCard
                to="/vendor-orders"
                title="Your Orders"
                description="View and manage orders for your products"
                icon="📦"
                color="hover:bg-blue-50"
              />
              
              <DashboardCard
                to="/vendor-analytics"
                title="Sales Analytics"
                description="Track your sales performance and metrics"
                icon="📈"
                color="hover:bg-green-50"
              />
              
              <DashboardCard
                to="/vendor-profile"
                title="Store Settings"
                description="Manage your store profile and preferences"
                icon="🏪"
                color="hover:bg-yellow-50"
              />
            </>
          )}
        </div>

        {/* Quick Stats Section */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-600">Total Orders</p>
              <p className="text-2xl font-bold text-blue-800">150</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-600">Revenue</p>
              <p className="text-2xl font-bold text-green-800">₹45,250</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-purple-600">Active Users</p>
              <p className="text-2xl font-bold text-purple-800">1,234</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <p className="text-sm text-yellow-600">Products</p>
              <p className="text-2xl font-bold text-yellow-800">89</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;