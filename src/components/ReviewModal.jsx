import React, { useState } from "react";
import { Star } from "lucide-react";

// Review Modal component
const ReviewModal = ({ productId, onClose, onReviewSubmitted }) => {
  const [rating, setRating] = useState(0); // Rating (0 - 5 stars)
  const [comment, setComment] = useState(""); // Comment for the review
  const [error, setError] = useState(null); // Error handling

  // Handle form submission
  const handleSubmit = async () => {
    if (rating === 0) {
      setError("Please select a rating.");
      return;
    }
  
    try {
      // Include productId in the review data
      const newReview = { productId, rating, comment }; 
      // Simulate review submission (e.g., via API call)
      setTimeout(() => {
        onReviewSubmitted(newReview);
      }, 500);
  
      // Close the modal after review submission
      onClose();
    } catch (err) {
      setError("Failed to submit the review. Please try again.");
    }
  };
  

  // Render star rating
  const renderStars = () => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-6 h-6 cursor-pointer ${
          index < rating ? "text-yellow-400" : "text-gray-300"
        }`}
        onClick={() => setRating(index + 1)}
      />
    ));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Write a Review</h2>

        {/* Rating Section */}
        <div className="flex items-center space-x-2">
          <div className="flex">{renderStars()}</div>
          <span className="text-sm text-gray-500">({rating}/5)</span>
        </div>

        {/* Comment Section */}
        <div className="space-y-2">
          <label htmlFor="comment" className="block text-gray-700">Your Comment</label>
          <textarea
            id="comment"
            rows="4"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="py-2 px-4 bg-gray-300 text-gray-800 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="py-2 px-4 bg-blue-500 text-white rounded-md"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
