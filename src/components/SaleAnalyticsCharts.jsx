import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart, 
  Pie, 
  Cell 
} from "recharts";
import {
  getTotalRevenue,
  getDailySalesTrend,
  getMonthlyRevenue,
  getBestPerformingProducts,
  getPopularProducts,
} from "../api/api";
import { 
  BarChart as BarChartIcon, 
  TrendingUp, 
  Calendar, 
  Loader2, 
  AlertTriangle, 
  ShoppingBag, 
  CreditCard, 
  ArrowUpRight 
} from "lucide-react";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 p-4 rounded-lg shadow-lg">
        <p className="font-bold text-gray-800">{label}</p>
        <p className="text-blue-600">{`Value: $${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const SaleAnalyticsCharts = () => {
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
        dailySalesTrend: dailySalesTrendData.sales_trend.map(item => ({
          ...item,
          date: new Date(item.date).toLocaleDateString()
        })),
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

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header and Error Handling - Same as previous implementation */}
        
        {/* Charts Container */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Daily Sales Trend */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <TrendingUp className="mr-3 text-blue-400" />
              Daily Sales Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData.dailySalesTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="date" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="total_sales" 
                  stroke="#3B82F6" 
                  strokeWidth={3} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Monthly Revenue Bar Chart */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <BarChartIcon className="mr-3 text-green-400" />
              Monthly Revenue ({selectedYear})
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData.monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="month" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="total_revenue" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Product Performance */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Best Performing Products Pie Chart */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <ShoppingBag className="mr-3 text-purple-400" />
              Best Performing Products
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={salesData.bestPerformingProducts.slice(0, 5)}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="units_sold"
                  nameKey="name"
                >
                  {salesData.bestPerformingProducts.slice(0, 5).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Popular Products Pie Chart */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <CreditCard className="mr-3 text-pink-400" />
              Popular Products
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={salesData.popularProducts.slice(0, 5)}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="wishlist_count"
                  nameKey="name"
                >
                  {salesData.popularProducts.slice(0, 5).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleAnalyticsCharts;