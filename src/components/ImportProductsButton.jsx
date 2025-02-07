import React, { useState, useContext } from "react";
import { Upload, FileJson, CheckCircle, AlertCircle, Loader } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { uploadProducts } from "../api/api";
import { useNavigate } from "react-router-dom";

const ImportProductsButton = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setError(null);
    setSuccess(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file.type === "application/json") {
      setSelectedFile(file);
      setError(null);
      setSuccess(false);
    } else {
      setError("Please upload a JSON file.");
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      setError("Please select a JSON file to upload.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const products = JSON.parse(reader.result);
        if (!Array.isArray(products)) {
          throw new Error("Invalid file format. Please upload a JSON array of products.");
        }
        await uploadProductsToAPI(products);
      } catch (error) {
        setError(error.message || "Invalid JSON file format.");
      }
    };
    reader.readAsText(selectedFile);
  };

  const uploadProductsToAPI = async (products) => {
    try {
      setLoading(true);
      await uploadProducts(products, token);
      setSuccess(true);
      setSelectedFile(null);
      setTimeout(() => {
        navigate("/products");
      }, 4000);
    } catch (error) {
      setError(error.message || "Failed to upload products.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-xl">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-3xl shadow-2xl border border-slate-700">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Import Products
            </h2>
            <p className="text-slate-400 mt-2">
              Upload your JSON file containing product data
            </p>
          </div>

          {/* Upload Area */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative transition-all duration-300 ease-in-out
              ${isDragging ? 'scale-105 border-emerald-400' : 'border-slate-600'}
              ${selectedFile ? 'border-emerald-500/50' : ''}
              border-2 border-dashed rounded-2xl p-8`}
          >
            <input
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            
            <label
              htmlFor="file-upload"
              className="cursor-pointer block"
            >
              <div className="flex flex-col items-center space-y-4">
                <div className={`p-4 rounded-full bg-slate-800/50 transition-transform duration-300 
                  ${isDragging ? 'scale-110' : ''}`}>
                  <FileJson className={`w-12 h-12 transition-colors duration-300
                    ${selectedFile ? 'text-emerald-400' : 'text-slate-400'}`} />
                </div>
                <div className="text-center">
                  <p className="text-sm text-slate-400 mb-2">
                    {selectedFile ? (
                      <span className="text-emerald-400 font-medium">{selectedFile.name}</span>
                    ) : (
                      "Drag and drop your JSON file here"
                    )}
                  </p>
                  <span className="text-xs text-slate-500">
                    or click to browse
                  </span>
                </div>
              </div>
            </label>
          </div>

          {/* Action Button */}
          <button
            onClick={handleFileUpload}
            disabled={loading || !selectedFile}
            className={`w-full mt-6 flex items-center justify-center space-x-2 py-4 px-6 rounded-xl font-medium
              transition-all duration-300 transform hover:scale-[1.02]
              ${loading || !selectedFile 
                ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-emerald-400 to-teal-400 text-white shadow-lg hover:shadow-emerald-500/25'}`}
          >
            {loading ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : (
              <Upload className="w-5 h-5" />
            )}
            <span>{loading ? "Uploading..." : "Upload Products"}</span>
          </button>

          {/* Status Messages */}
          {error && (
            <div className="mt-6 flex items-center space-x-2 text-red-400 bg-red-400/10 p-4 rounded-xl animate-fade-in">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="mt-6 flex items-center space-x-2 text-emerald-400 bg-emerald-400/10 p-4 rounded-xl animate-fade-in">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">Products imported successfully! Redirecting...</p>
            </div>
          )}

          {/* JSON Format Example */}
          {!selectedFile && !error && !success && (
            <div className="mt-8 space-y-3">
              <p className="text-sm text-slate-400">Example JSON format:</p>
              <div className="bg-slate-800 rounded-xl p-4 overflow-hidden">
                <pre className="text-xs text-slate-300 overflow-x-auto">
{`[
  {
    "name": "Camera 1",
    "description": "High-definition camera with 4K video recording",
    "price": 15000,
    "expenditure_cost_inr": 12000,
    "discount_percentage": 10,
    "total_stock": 50,
    "category": "Electronics",
    "image_url": "https://example.com/assets/camera.jpg",
    "vendor_id": 5
  }
]`}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImportProductsButton;