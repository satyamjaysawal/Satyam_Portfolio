import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { searchProducts } from "../api/api"; // API call for searching products
import { Link } from "react-router-dom"; // Add the Link import here

const ProductSearch = () => {
  const [results, setResults] = useState([]); // Store the search results
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(""); 
  const [responseMessage, setResponseMessage] = useState(""); // Message to show when no results are found

  const location = useLocation(); // Get the location object to extract search query from URL
  const query = new URLSearchParams(location.search).get('q'); // Extract query parameter from URL

  useEffect(() => {
    const handleSearch = async () => {
      if (query.trim() === "") return;
  
      setLoading(true);
      setError("");
      setResults([]);  // Clear previous results before making a new request
      setResponseMessage(""); // Reset the response message before searching
  
      try {
        const data = await searchProducts(query);
        
        if (data.length === 0) {
          setResponseMessage("No results found for your search.");
        } else {
          setResponseMessage(`Found ${data.length} result(s) for "${query}".`);
        }
  
        setResults(data); // Set the results after successful search
      } catch (error) {
        setError("Failed to search products.");
        setResults([]);  // Clear results if the search fails
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    };
  
    if (query) {
      handleSearch();
    }
  }, [query]);

  return (
    <div className="container mx-auto px-4 md:px-8 py-6 mt-16">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">🔍 Search Products</h1>

      {/* Response Message */}
      {responseMessage && (
        <p className="text-center text-xl font-medium text-gray-700 mb-6">{responseMessage}</p>
      )}

      {/* Error Message */}
      {error && <p className="text-center text-red-500 text-lg mb-6">{error}</p>}

      {/* Loading Spinner */}
      {loading && (
        <div className="text-center mt-8">
          <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 border-solid border-gray-900 rounded-full" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}

      {/* Results Grid */}
      {!loading && results.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
          {results.map((product) => (
            <div key={product.id} className="border border-gray-200 rounded-lg p-4 bg-white shadow-lg hover:shadow-xl transition-all hover:scale-105 hover:transform">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-48 object-cover mb-4 rounded-md shadow-md"
              />
              <h2 className="text-lg font-semibold text-gray-900 truncate">{product.name}</h2>
              <p className="text-gray-600">{product.category}</p>
              <div className="mt-4 flex justify-between items-center">
                <p className="text-lg font-semibold text-green-600">₹{product.price_after_discount.toFixed(2)}</p>
                <Link
                  to={`/products/${product.id}`}
                  className="text-sm text-blue-500 hover:text-blue-700 font-medium transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* If no results, show a message */}
      {!loading && results.length === 0 && query.trim() && (
        <p className="text-center text-gray-500 text-lg mt-8">No products found matching "{query}".</p>
      )}
    </div>
  );
};

export default ProductSearch;
