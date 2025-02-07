import React, { useEffect, useState, useCallback } from "react";
import Glide from "@glidejs/glide";
import { Package } from "lucide-react"; // Icon for loading
import { getProducts } from "../api/api"; // Fetch API
import { useNavigate } from "react-router-dom";

const ProductsSlider = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch products and filter out duplicates
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        // Remove duplicate products based on `id`
        const uniqueProducts = Array.from(
          new Map(data.map((item) => [item.id, item])).values()
        );
        setProducts(uniqueProducts);
        console.log("✅ Products fetched:", uniqueProducts); // Debugging log

        // Initialize Glide.js only after products are set
        if (uniqueProducts.length > 0) {
          setTimeout(() => {
            new Glide(".glide", {
              type: "carousel",
              perView: 4,
              gap: 20,
              focusAt: "center",
              autoplay: 3000, // Smooth autoplay speed
              hoverpause: true,
              breakpoints: {
                1200: { perView: 3 },
                768: { perView: 2 },
                480: { perView: 1 },
              },
            }).mount();
          }, 100);
        }
      } catch (error) {
        console.error("❌ Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Navigate to product details page
  const handleViewDetails = useCallback(
    (id) => {
      console.log(`🟢 Navigating to Product Details page for ID: ${id}`); // Debugging log
      navigate(`/products/${id}`);
    },
    [navigate]
  );

  return (
    <div className="products-slider bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl p-6 mb-8 shadow-lg overflow-hidden">
      <h2 className="text-4xl text-white font-extrabold mb-6 text-center">
        Featured Products
      </h2>
      <div className="glide relative max-w-screen-xl mx-auto">
        <div className="glide__track overflow-hidden" data-glide-el="track">
          <ul className="glide__slides flex space-x-6">
            {products.length === 0 ? (
              <div className="text-center text-white w-full">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4 animate-spin" />
                <p className="text-lg font-semibold">No products available</p>
              </div>
            ) : (
              products.map((product) => (
                <li className="glide__slide" key={product.id}>
                  <div className="w-64 h-[400px] bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out mx-auto flex flex-col">
                    <div className="relative">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-40 object-cover rounded-t-2xl mb-2 transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <div className="p-4 flex flex-col flex-1 justify-between">
                      <h3 className="text-lg text-white font-semibold mb-1 line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-gray-300 text-sm mb-2 flex-1 line-clamp-2">
                        {product.description || "No description available"}
                      </p>
                      <div className="mt-2">
                        <p className="text-lg text-green-400 font-semibold">
                          ₹{product.price_after_discount.toLocaleString()}
                        </p>
                      </div>
                      {/* View Details Button */}
                      <div className="flex justify-center items-center mt-auto">
                        <button
                          onClick={() => {
                            console.log(`🟡 View Details clicked for Product ID: ${product.id}`); // Debugging log
                            handleViewDetails(product.id);
                          }}
                          className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-2 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 font-medium"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductsSlider;
