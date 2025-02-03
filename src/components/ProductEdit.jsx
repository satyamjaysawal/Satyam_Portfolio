import React, { useEffect, useState, useContext } from 'react'; 
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getProductById, updateProduct } from '../api/api';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { AuthContext } from '../context/AuthContext'; // Import the AuthContext

const ProductEdit = () => {
  const { productId } = useParams();  // Extract product ID from URL parameters
  const location = useLocation();
  const navigate = useNavigate();
  const { user, token, loading: authLoading } = useContext(AuthContext); // Access token and user from AuthContext
  const [product, setProduct] = useState(location.state?.productData || null);
  const [loading, setLoading] = useState(!location.state?.productData);
  const [error, setError] = useState('');
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    category: '',
    price: 0,
    discount_percentage: 0,
    total_stock: 0,
    image_url: '',
  });

  // Fetch product if not already loaded via state
  useEffect(() => {
    if (!product) {
      const fetchProduct = async () => {
        try {
          const data = await getProductById(productId);  // Use productId here
          setProduct(data);
          setProductData({
            name: data.name,
            description: data.description,
            category: data.category,
            price: data.price_before_discount,
            discount_percentage: data.discount_percentage,
            total_stock: data.total_stock,
            image_url: data.image_url,
          });
        } catch (err) {
          setError('Failed to load product details');
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [productId, product]);  // Ensure to use productId in the dependency array

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateProduct = async () => {
    if (!token) {
      setError('Please log in to update the product.');
      return;
    }

    try {
      const updatedProduct = await updateProduct(token, productId, productData);  // Pass productId and data
      setProduct(updatedProduct);  // Update local product state with the updated product
      navigate(`/products/${productId}`);  // Navigate back to the product page

    } catch (err) {
      setError('Failed to update product');
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <p className="text-lg text-red-600 mb-4">{error || 'Product not found'}</p>
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-6">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Product_ID complete details</h1>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Products
            </button>
          </div>

          {/* Product Details Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column - Product Info */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product ID</label>
                <div className="p-2 bg-gray-100 rounded-lg">{product?.id || 'N/A'}</div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={productData.name}
                  onChange={handleInputChange}
                  className="p-2 bg-gray-100 rounded-lg w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={productData.description}
                  onChange={handleInputChange}
                  className="p-2 bg-gray-100 rounded-lg w-full min-h-[100px]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input
                  type="text"
                  name="category"
                  value={productData.category}
                  onChange={handleInputChange}
                  className="p-2 bg-gray-100 rounded-lg w-full"
                />
              </div>
            </div>

            {/* Right Column - Pricing/Stock */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Original Price</label>
                <input
                  type="number"
                  name="price"
                  value={productData.price}
                  onChange={handleInputChange}
                  className="p-2 bg-gray-100 rounded-lg w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Discount Percentage</label>
                <input
                  type="number"
                  name="discount_percentage"
                  value={productData.discount_percentage}
                  onChange={handleInputChange}
                  className="p-2 bg-gray-100 rounded-lg w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Stock</label>
                <input
                  type="number"
                  name="total_stock"
                  value={productData.total_stock}
                  onChange={handleInputChange}
                  className="p-2 bg-gray-100 rounded-lg w-full"
                />
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
            <div className="bg-gray-100 rounded-xl p-4 flex justify-center">
              {product?.image_url ? (
                <img
                  src={product?.image_url}
                  alt={product?.name}
                  className="max-h-64 object-contain rounded-lg"
                />
              ) : (
                <div className="text-gray-400">No image available</div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleUpdateProduct}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Update Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductEdit;
