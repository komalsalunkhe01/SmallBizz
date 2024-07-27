import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './ReviewForm.css';
import { TextField, Button, Typography } from '@mui/material';

function ReviewForm({ shopId }) {
  const [formData, setFormData] = useState({
    shopName: '',
    review: '',
    image: '',
  });

  useEffect(() => {
    setFormData(prevData => ({ ...prevData, shopId }));
  }, [shopId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result }); // Update formData with the base64 encoded image
    };
    reader.onerror = error => {
      console.error('Error reading file:', error);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = {
      shopId: formData.shopId,
      shopName: formData.shopName,
      review: formData.review,
      image: formData.image, // Send base64 encoded image
    };

    try {
      const response = await Axios.post('http://localhost:5000/insert', formDataToSend);
      console.log("Data inserted successfully:", response.data);
      alert("Data inserted successfully!");
    } catch (error) {
      console.error("Error inserting data:", error);
      alert("Failed to insert data. Please try again.");
    }
  };

  return (
    <div className="review-form-container">
      <Typography variant="h5">Submit a Review</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="shopName"
          label="Product Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.shopName}
          onChange={handleChange}
        />
        <TextField
          name="review"
          label="Review"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          margin="normal"
          value={formData.review}
          onChange={handleChange}
        />
        <Typography variant="subtitle1">Upload Image (Optional)</Typography>
        <input
          accept="image/*"
          type="file"
          onChange={handleImageChange}
        />
        {formData.image && <img src={formData.image} alt="Preview" className="preview-image" />}
        <Button type="submit" variant="contained" color="primary">Submit</Button>
      </form>
    </div>
  );
}

export default ReviewForm;