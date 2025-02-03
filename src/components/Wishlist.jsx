import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getWishlist, removeFromWishlist } from '../api/api';
import { Heart, Trash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
  const { user, token } = useContext(AuthContext);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user && token) {
      console.log('Fetching wishlist items...');
      getWishlist(token)
        .then((data) => {
          if (data && Array.isArray(data)) {
            console.log('Wishlist items:', data);
            setWishlistItems(data);
          } else {
            // Handle case where wishlist is empty or data is not in expected format
            setError(data?.detail || "Your wishlist is empty.");
            setWishlistItems([]);
          }
        })
        .catch((err) => {
          setError('Error fetching wishlist items');
          console.error('❌ Error:', err);
        })
        .finally(() => setLoading(false));
    }
  }, [user, token]);

  const handleRemoveFromWishlist = (productId) => {
    console.log(`Removing item from wishlist: ${productId}`);
    removeFromWishlist(token, productId)
      .then(() => {
        console.log(`Item removed from wishlist: ${productId}`);
        // Remove the item from the wishlist state
        setWishlistItems((prevItems) => prevItems.filter(item => item.product.id !== productId));
      })
      .catch((err) => {
        setError('Failed to remove item');
        console.error('❌ Error:', err);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Wishlist</h1>
      <div className="bg-white rounded-xl shadow-sm p-4">
        {wishlistItems.length === 0 ? (
          <p>{error || "Your wishlist is empty."}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <div key={item.product.id} className="bg-gray-100 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img src={item.product.image_url} alt={item.product.name} className="w-16 h-16 mr-4" />
                    <span className="font-semibold">{item.product.name}</span>
                  </div>
                  <button
                    onClick={() => handleRemoveFromWishlist(item.product.id)}
                    className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
                <p className="mt-2">Price: ₹{item.product.price_after_discount}</p>
                <p className="mt-2 text-sm">Description: {item.product.description}</p>
                <p className="mt-2 text-sm">Category: {item.product.category}</p>
                <p className="mt-2">Rating: {item.product.product_rating} ⭐</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
