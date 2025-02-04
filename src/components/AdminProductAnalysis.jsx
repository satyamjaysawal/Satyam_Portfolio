// AdminProductAnalysis.jsx

import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getProductsForAnalysis } from '../api/api';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { 
  Package, 
  Star, 
  DollarSign, 
  ShoppingCart, 
  TrendingUp,
  Search,
  AlertCircle
} from 'lucide-react';

const AdminProductAnalysis = () => {
  const { token } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const COLORS = ['#6366F1', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981'];

  useEffect(() => {
    if (!token) {
      setError("You need to be logged in as an admin to access this page.");
      setLoading(false);
      return;
    }

    const fetchProducts = async () => {
      try {
        const data = await getProductsForAnalysis(token);
        setProducts(data);
      } catch (err) {
        setError("Error fetching product analysis.");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [token]);

  const getCategories = () => {
    const categories = new Set(products.map(p => p.category));
    return ['all', ...Array.from(categories)];
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryData = () => {
    const categoryCount = {};
    products.forEach(product => {
      categoryCount[product.category] = (categoryCount[product.category] || 0) + 1;
    });
    return Object.entries(categoryCount).map(([name, value]) => ({ name, value }));
  };

  // Stats data
  const statsData = [
    {
      title: "Total Products",
      value: products.length,
      icon: <Package className="h-8 w-8 text-purple-400" />,
      bgColor: "from-purple-500/20 to-purple-600/20"
    },
    {
      title: "Average Rating",
      value: (products.reduce((acc, curr) => acc + curr.product_rating, 0) / products.length).toFixed(1),
      icon: <Star className="h-8 w-8 text-yellow-400" />,
      bgColor: "from-yellow-500/20 to-yellow-600/20"
    },
    {
      title: "Low Stock Items",
      value: products.filter(p => p.stock_remaining < 10).length,
      icon: <ShoppingCart className="h-8 w-8 text-red-400" />,
      bgColor: "from-red-500/20 to-red-600/20"
    },
    {
      title: "Total Reviews",
      value: products.reduce((acc, curr) => acc + curr.reviews.length, 0),
      icon: <TrendingUp className="h-8 w-8 text-emerald-400" />,
      bgColor: "from-emerald-500/20 to-emerald-600/20"
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="bg-red-900/30 text-red-200 p-6 rounded-lg backdrop-blur-sm border border-red-500/20">
          <AlertCircle className="w-8 h-8 mb-2 text-red-400" />
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl shadow-lg p-6 mb-8 border border-gray-700/50">
          <h1 className="text-3xl font-bold text-white mb-2">Product Analysis Dashboard</h1>
          <p className="text-gray-400">Manage and analyze your product performance</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsData.map((stat, index) => (
            <div 
              key={index} 
              className={`bg-gradient-to-br ${stat.bgColor} backdrop-blur-sm p-6 rounded-xl shadow-lg 
                border border-gray-700/50 transform hover:scale-105 transition-all duration-300`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                </div>
                {stat.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl shadow-lg p-6 mb-8 border border-gray-700/50">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg 
                  focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg 
                focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {getCategories().map(category => (
                <option key={category} value={category} className="bg-gray-900">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Category Distribution Chart */}
          <div className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-gray-700/50">
            <h3 className="text-xl font-semibold mb-4 text-white">Category Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={getCategoryData()}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {getCategoryData().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Price Distribution Chart */}
          <div className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-gray-700/50">
            <h3 className="text-xl font-semibold mb-4 text-white">Price Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={filteredProducts}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} />
                  <Bar dataKey="price_before_discount" fill="#6366F1" />
                  <Bar dataKey="price_after_discount" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-gray-800/50 backdrop-blur-lg rounded-xl shadow-lg p-6 
                border border-gray-700/50 transform hover:scale-105 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">{product.name}</h3>
                <span className="px-2 py-1 bg-purple-500/20 text-purple-200 rounded-full text-sm border border-purple-500/30">
                  {product.category}
                </span>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Original Price</span>
                  <span className="text-white font-medium">₹{product.price_before_discount}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Discounted Price</span>
                  <span className="text-emerald-400 font-medium">₹{product.price_after_discount}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Rating</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-white font-medium">{product.product_rating}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Stock</span>
                  <span className={`font-medium ${
                    product.stock_remaining < 10 ? 'text-red-400' : 'text-white'
                  }`}>
                    {product.stock_remaining} units
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Reviews</span>
                  <span className="text-white font-medium">{product.reviews.length}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProductAnalysis;