import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { addProduct } from "../api/api"; // Assuming this is the correct path to your addProduct function
import { CheckCircle, XCircle } from "lucide-react"; // Import the icons

const ProductAdd = () => {
  const { token } = useContext(AuthContext);  // Get token from AuthContext
  const navigate = useNavigate();

  // State to manage form data
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    expenditure_cost_inr: 0,
    discount_percentage: 0,
    total_stock: 0,
    category: "",
    image_url: "",
  });

  // State to manage loading, success, and error
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error
    setSuccessMessage(""); // Reset success message

    try {
      // Make API call to add product
      const response = await addProduct(token, formData);
      // If the response has a success message, show it
      if (response && response.message) {
        setSuccessMessage(response.message);  // Assuming backend sends a success message
      }
      // Navigate to the product list page after successful addition
      setTimeout(() => {
        navigate("/products");
      }, 2000); // Delay navigation to show the success message for 2 seconds
    } catch (err) {
      // Display error message from the backend
      setError(err?.response?.data?.detail || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-semibold text-gray-900 mb-2">Add Product</h1>
          <p className="text-lg text-gray-600">Fill in the details to add a new product.</p>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Product Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Product Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  rows="4"
                />
              </div>

              {/* Price */}
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price (INR)
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  className="mt-2 w-full p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Expenditure Cost */}
              <div>
                <label htmlFor="expenditure_cost_inr" className="block text-sm font-medium text-gray-700">
                  Expenditure Cost (INR)
                </label>
                <input
                  type="number"
                  id="expenditure_cost_inr"
                  name="expenditure_cost_inr"
                  value={formData.expenditure_cost_inr}
                  onChange={handleChange}
                  required
                  min="0"
                  className="mt-2 w-full p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Discount Percentage */}
              <div>
                <label htmlFor="discount_percentage" className="block text-sm font-medium text-gray-700">
                  Discount Percentage
                </label>
                <input
                  type="number"
                  id="discount_percentage"
                  name="discount_percentage"
                  value={formData.discount_percentage}
                  onChange={handleChange}
                  required
                  min="0"
                  max="100"
                  className="mt-2 w-full p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Total Stock */}
              <div>
                <label htmlFor="total_stock" className="block text-sm font-medium text-gray-700">
                  Total Stock
                </label>
                <input
                  type="number"
                  id="total_stock"
                  name="total_stock"
                  value={formData.total_stock}
                  onChange={handleChange}
                  required
                  min="0"
                  className="mt-2 w-full p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Image URL */}
              <div>
                <label htmlFor="image_url" className="block text-sm font-medium text-gray-700">
                  Image URL
                </label>
                <input
                  type="text"
                  id="image_url"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Error and Success Messages */}
              {error && (
                <div className="flex items-center text-red-500 text-sm">
                  <XCircle className="w-5 h-5 mr-2" />
                  <p>{error}</p>
                </div>
              )}
              {successMessage && (
                <div className="flex items-center text-green-500 text-sm">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <p>{successMessage}</p>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-6 py-3 bg-blue-600 text-white rounded-lg ${
                    loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
                  }`}
                >
                  {loading ? "Adding..." : "Add Product"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductAdd;
