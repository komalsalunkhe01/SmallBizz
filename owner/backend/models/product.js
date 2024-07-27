const mongoose = require('mongoose');
const Joi = require('joi');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  quantity:{
    type: Number,
    required: true
  }

});

const Product = mongoose.model('Product', productSchema);

// // Validation function for product
const validateProduct = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().label('Product Name'),
    price: Joi.number().required().label('Price'),
    shopId: Joi.string().required().label('Shop ID'), // Validate shopId
    description: Joi.string().required().label('Description'),
    image: Joi.string().required().label('Image'),
    quantity: Joi.number().required().label('Quantity')
  });
  return schema.validate(data);
};

module.exports = {
  Product,
  validateProduct
};
