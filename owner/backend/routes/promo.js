// Import necessary modules and models
const express = require('express');
const Promotion = require('../models/promotion');

const router = express.Router();

const Joi = require('joi');

// Define validation schema using Joi
const promotionSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string().required(),
  shopId: Joi.string().required(),

});

// Route to handle POST request to insert promotion/achievement
router.post('/', async (req, res) => {
  // Validate the incoming data
  const { error } = promotionSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    // Create a new instance of Promotion model with validated data
    const promotion = new Promotion(req.body);
    // Save the promotion to the database
    await promotion.save();
    // Return success message or the inserted promotion data
    res.status(201).json(promotion);
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error adding promotion/achievement:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
