const express = require('express');
const Order = require('../models/order');
const OrderHistory = require('../models/orderHistory');
const router = express.Router();
const Joi = require('joi');
const axios = require('axios');

const orderSchema = Joi.object({
  orderId: Joi.string().required(),
  orderDate: Joi.date().required(),
  productName: Joi.string().required(),
  productId: Joi.string().required(),
  quantity: Joi.number().required(),
  customerName:Joi.string().required(),
  shopId: Joi.string().required(),
  address: Joi.string().required(), // Add address
  pincode: Joi.string().required(), // Add pincode
  orderStatus: Joi.string().required()
});


// GET route to fetch orders associated with the current shop id
router.get('/', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:8000/api/auth/shopId');
    const shopId = response.data.ses;

    const orders = await Order.find({ shopId });
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST route to add a new order to orderHistory
router.post('/', async (req, res) => {
  const { error } = orderSchema.validate(req.body);
  if (error) {
    console.error('Error validating order:', error);
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const orderHistory = new OrderHistory(req.body);
    await orderHistory.save();
    res.status(201).json({ message: 'Order added to history successfully', data: orderHistory });
  } catch (error) {
    console.error('Error adding order to history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE route to delete an order
router.delete('/:orderId', async (req, res) => {
  const { orderId } = req.params;
  try {
    const deletedOrder = await Order.findOneAndDelete({ orderId });
    if (!deletedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;