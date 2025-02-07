import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { addProduct } from "../api/api";
import { useNavigate } from "react-router-dom";
import { Package, AlertCircle, CheckCircle2, Image, DollarSign, Percent, Box, Tags, FileText } from "lucide-react";

const ProductAdd = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    discount_percentage: "",
    total_stock: "",
    category: "",
    image_url: "",
    expenditure_cost_inr: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await addProduct(token, formData);
      setSuccess(true);
      navigate("/products");
    } catch (err) {
      setError(err.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-slate-800 shadow-2xl rounded-2xl p-6 sm:p-8 border border-slate-700">
          <div className="flex items-center mb-8">
            <Package className="h-8 w-8 text-emerald-400 mr-3" />
            <h2 className="text-2xl font-bold text-white">Add New Product</h2>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 rounded-xl flex items-center border border-red-500/20">
              <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
              <p className="text-red-400">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-emerald-500/10 rounded-xl flex items-center border border-emerald-500/20">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 mr-2" />
              <p className="text-emerald-400">Product added successfully!</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1" htmlFor="name">
                  Product Name
                </label>
                <div className="relative">
                  <Package className="h-5 w-5 text-slate-500 absolute top-3 left-3" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="pl-10 w-full rounded-xl border border-slate-600 bg-slate-700/50 py-2 px-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1" htmlFor="category">
                  Category
                </label>
                <div className="relative">
                  <Tags className="h-5 w-5 text-slate-500 absolute top-3 left-3" />
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="pl-10 w-full rounded-xl border border-slate-600 bg-slate-700/50 py-2 px-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-300 mb-1" htmlFor="description">
                  Description
                </label>
                <div className="relative">
                  <FileText className="h-5 w-5 text-slate-500 absolute top-3 left-3" />
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="pl-10 w-full rounded-xl border border-slate-600 bg-slate-700/50 py-2 px-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
                  ></textarea>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1" htmlFor="price">
                  Price
                </label>
                <div className="relative">
                  <DollarSign className="h-5 w-5 text-slate-500 absolute top-3 left-3" />
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    min="0"
                    className="pl-10 w-full rounded-xl border border-slate-600 bg-slate-700/50 py-2 px-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1" htmlFor="discount_percentage">
                  Discount Percentage
                </label>
                <div className="relative">
                  <Percent className="h-5 w-5 text-slate-500 absolute top-3 left-3" />
                  <input
                    type="number"
                    id="discount_percentage"
                    name="discount_percentage"
                    value={formData.discount_percentage}
                    onChange={handleChange}
                    required
                    min="0"
                    max="100"
                    className="pl-10 w-full rounded-xl border border-slate-600 bg-slate-700/50 py-2 px-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1" htmlFor="total_stock">
                  Total Stock
                </label>
                <div className="relative">
                  <Box className="h-5 w-5 text-slate-500 absolute top-3 left-3" />
                  <input
                    type="number"
                    id="total_stock"
                    name="total_stock"
                    value={formData.total_stock}
                    onChange={handleChange}
                    required
                    min="0"
                    className="pl-10 w-full rounded-xl border border-slate-600 bg-slate-700/50 py-2 px-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1" htmlFor="expenditure_cost_inr">
                  Expenditure Cost (INR)
                </label>
                <div className="relative">
                  <DollarSign className="h-5 w-5 text-slate-500 absolute top-3 left-3" />
                  <input
                    type="number"
                    id="expenditure_cost_inr"
                    name="expenditure_cost_inr"
                    value={formData.expenditure_cost_inr}
                    onChange={handleChange}
                    required
                    min="0"
                    className="pl-10 w-full rounded-xl border border-slate-600 bg-slate-700/50 py-2 px-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-300 mb-1" htmlFor="image_url">
                  Image URL
                </label>
                <div className="relative">
                  <Image className="h-5 w-5 text-slate-500 absolute top-3 left-3" />
                  <input
                    type="url"
                    id="image_url"
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleChange}
                    required
                    className="pl-10 w-full rounded-xl border border-slate-600 bg-slate-700/50 py-2 px-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-lg text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding Product...
                  </>
                ) : (
                  "Add Product"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductAdd;