// models/Transaction.js

const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    customerId: {
        type: String,
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now
    }
}, {
    toJSON: { virtuals: true } // Ensure virtuals are included when converting to JSON
});

// Virtual getter for transactionId
transactionSchema.virtual('transactionId').get(function() {
    return this._id.toHexString(); // Convert ObjectId to hexadecimal string
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
