import React, { useState, useEffect } from "react";
import Side from "./Side";
import axios from "axios";
import "./review.css";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/reviews`);
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleClosePopup = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <Side />
      <div className="header">Reviews</div>
      <div className="reviews">
        <h2>Reviews</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Review</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review._id}>
                <td>{review.name}</td>
                <td>{review.review}</td>
                <td>
                  <img
                    src={review.image}
                    alt={review.name}
                    className="review-image"
                    onClick={() => handleImageClick(review.image)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedImage && (
        <div className="popup" onClick={handleClosePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage}
              alt="Full size"
              className="full-size-image"
              onClick={handleClosePopup} // Close popup when clicking on the image
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;