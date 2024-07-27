const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  review: {
    type: String,
    required: true
  },
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop', // Assuming 'Shop' is the name of your shop model
    required: true
  },
  image:String
});

const Review = mongoose.model('customer_review', reviewSchema); // Use 'customer_reviews' as the collection name

module.exports = Review;