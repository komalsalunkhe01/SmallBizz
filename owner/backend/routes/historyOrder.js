const express = require('express');
const OrderHistory = require('../models/orderHistory');
const router = express.Router();

// GET route to fetch order history
router.get('/', async (req, res) => {
  try {
    const orderHistory = await OrderHistory.find();
    res.status(200).json(orderHistory);
  } catch (error) {
    console.error('Error fetching order history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;