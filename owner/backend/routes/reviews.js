const express = require('express');
const Review = require('../models/review');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  try {
    // Fetch the shop ID from the authentication service
    const response = await axios.get(`http://localhost:8000/api/auth/shopId`);
    const shopId = response.data.ses; // Assuming this is correct

    // Query the database for reviews associated with the current shop ID
    const reviews = await Review.find({ shopId });
        res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;