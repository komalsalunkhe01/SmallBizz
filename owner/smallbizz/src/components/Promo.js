import React, { useEffect, useState } from "react";
import Side from "./Side";
import "./promo.css";
import { TextField, Button, Typography } from '@mui/material';
import axios from "axios";


const Promo = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image:'',
    shopId:''
  });
 
  useEffect(() => {
    const fetchShopId = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/auth/shopId');
        console.log(response)
        const shopId = response.data.ses;
        console.log('Shop ID:', shopId);
        setFormData(prevData => ({ ...prevData, shopId }));
      } catch (error) {
        console.error('Error fetching shopId:', error);
      }
    };

    fetchShopId();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/promo', formData);
      window.location.href = '/home';
    } catch (error) {
      console.error('Error adding promotion/achievement:', error);
    }
  };
  const [image, setImage] = useState(null);
   function convertto64(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result); // Set image preview
      setFormData({ ...formData, image: reader.result }); // Set image data in productData
    };
    reader.onerror = error => {
      console.error('Error reading file:', error);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div>
      <Side />
      <div className="header">Achievements</div>
      <div className="promo-form-container">
        <Typography variant="h5">Promote Your Small Business</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="title"
            label="Title of Your Achievement"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.title}
            onChange={handleChange}
          />
          <TextField
            name="description"
            label="Description"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            margin="normal"
            value={formData.description}
            onChange={handleChange}
          />
         
          <h4>Upload Image of the Proof</h4>
        <input accept="image/*" type="file" onChange={convertto64}></input>

        {image && <img src={image} alt="Preview" className="preview-image" />}

          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Promo;
