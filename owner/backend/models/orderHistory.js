// models/orderHistory.js

const mongoose = require('mongoose');

const orderHistorySchema = new mongoose.Schema({
    orderId: {
        type: String,
       required: true,
       unique: true
     },
     orderDate: {
       type: Date,
       required: true,
       default: Date.now
     },
     productName: {
       type: String,
       required: true
     },
     productId: {
        type: mongoose.Schema.Types.ObjectId,
       required: true
     },
     quantity: {
       type: Number,
       required: true
     },
     shopId: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Shop',
       required: true
     },
     customerId: {
        type: mongoose.Schema.Types.ObjectId,
       required: true
     },
     orderStatus: {
    type: String,
    required: true,
    enum: ['Pending', 'Cancelled', 'Done'], // Add 'Done' to the enum values
    default: 'Pending'
  }
});

const OrderHistory = mongoose.model('OrderHistory', orderHistorySchema);

module.exports = OrderHistory;