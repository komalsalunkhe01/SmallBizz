// ../models/promotion.js
const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' }
});

const Promotion = mongoose.model('Promotion', promotionSchema);

module.exports = Promotion;
