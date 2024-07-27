// routes/transactionRoutes.js

const express = require('express');
const router = express.Router();
const Transaction = require('../models/history.js');

// GET all transactions
router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.status(200).json(transactions);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
