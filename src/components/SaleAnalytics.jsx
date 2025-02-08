import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  getTotalRevenue,
  getDailySalesTrend,
  getMonthlyRevenue,
  getBestPerformingProducts,
  getPopularProducts,
} from "../api/api";
import { 
  BarChart, 
  TrendingUp, 
  Calendar, 
  Loader2, 
  AlertTriangle, 
  ShoppingBag, 
  CreditCard, 
  ArrowUpRight, 
  BarChart2 } from "lucide-react"; // Use BarChart2 or another icon here
import { useNavigate } from "react-router-dom";

const SaleAnalytics = () => {
  const { token } = useContext(AuthContext);
  const [salesData, setSalesData] = useState({
    totalRevenue: 0,
    dailySalesTrend: [],
    monthlyRevenue: [],
    bestPerformingProducts: [],
    popularProducts: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState("2025-01-01");
  const [endDate, setEndDate] = useState("2025-01-31");
  const [selectedYear, setSelectedYear] = useState(2025);
  const navigate = useNavigate();

  const fetchSalesData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [totalRevenueData, dailySalesTrendData, monthlyRevenueData, bestPerformingProductsData, popularProductsData] =
        await Promise.all([
          getTotalRevenue(token),
          getDailySalesTrend(startDate, endDate, token),
          getMonthlyRevenue(selectedYear, token),
          getBestPerformingProducts(token),
          getPopularProducts(token),
        ]);

      setSalesData({
        totalRevenue: totalRevenueData.total_revenue,
        dailySalesTrend: dailySalesTrendData.sales_trend,
        monthlyRevenue: monthlyRevenueData.monthly_revenue,
        bestPerformingProducts: bestPerformingProductsData.best_performing_products,
        popularProducts: popularProductsData.popular_products,
      });
    } catch (error) {
      setError(error.message || "Error fetching sales data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchSalesData();
    } else {
      setError("You are not authorized. Please log in.");
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
            Sales Analytics Dashboard
          </h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={fetchSalesData}
              className="bg-gradient-to-r from-teal-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition flex items-center"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
              ) : (
                <ArrowUpRight className="w-5 h-5 mr-2" />
              )}
              Update Data
            </button>
          </div>
        </header>

        {/* Error Handling */}
        {error && (
          <div className="bg-red-600/20 border border-red-500 rounded-lg p-4 flex items-center justify-center mb-6">
            <AlertTriangle className="w-6 h-6 mr-3 text-red-500" />
            <span className="text-red-300">{error}</span>
          </div>
        )}

        {/* Input Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <Calendar className="w-6 h-6 text-teal-400 mr-3" />
              <h3 className="text-xl font-semibold text-white">Date Range</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Start Date</label>
                <input
                  type="text"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">End Date</label>
                <input
                  type="text"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none transition"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <Calendar className="w-6 h-6 text-teal-400 mr-3" />
              <h3 className="text-xl font-semibold text-white">Year Selection</h3>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Select Year</label>
              <input
                type="text"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none transition"
              />
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Total Revenue */}
          <div className="bg-gradient-to-br from-blue-900/50 to-teal-900/50 border border-blue-800/30 rounded-xl p-6 flex flex-col justify-between">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">Total Revenue</h3>
              <BarChart className="w-8 h-8 text-teal-400" />
            </div>
            <p className="text-3xl font-bold text-teal-300">₹{salesData.totalRevenue.toLocaleString()}</p>
          </div>

          {/* Best Performing Products */}
          <div className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border border-purple-800/30 rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">Top Performers</h3>
              <ShoppingBag className="w-8 h-8 text-purple-400" />
            </div>
            <ul className="space-y-2">
              {salesData.bestPerformingProducts.slice(0, 3).map((product, index) => (
                <li key={index} className="flex justify-between text-sm">
                  <span className="font-medium text-white">{product.name}</span>
                  <span className="text-purple-300">{product.units_sold} units</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Products */}
          <div className="bg-gradient-to-br from-pink-900/50 to-rose-900/50 border border-pink-800/30 rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">Popular Products</h3>
              <CreditCard className="w-8 h-8 text-pink-400" />
            </div>
            <ul className="space-y-2">
              {salesData.popularProducts.slice(0, 3).map((product, index) => (
                <li key={index} className="flex justify-between text-sm">
                  <span className="font-medium text-white">{product.name}</span>
                  <span className="text-pink-300">Wishlist: {product.wishlist_count}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Monthly Revenue */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold text-white">Monthly Revenue ({selectedYear})</h3>
            <TrendingUp className="w-8 h-8 text-green-400" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {salesData.monthlyRevenue.map((monthData, index) => (
              <div 
                key={index} 
                className="bg-gray-800 rounded-lg p-3 text-center hover:bg-gray-700 transition"
              >
                <p className="text-sm text-gray-400">Month {monthData.month}</p>
                <p className="text-green-400 font-bold">₹{monthData.total_revenue}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Button to navigate to Sale Analytics Chart */}
        <div className="mt-6">
          <button
            onClick={() => navigate("/sale-analytics-chart")}
            className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 rounded-lg flex items-center"
          >
            <BarChart2 className="w-5 h-5 mr-2" />  {/* Updated icon */}
            View Analytics Chart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaleAnalytics;
