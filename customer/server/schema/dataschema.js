const mongoose = require('mongoose');

const ReactFormDataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    shopId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    image: String // Add an optional field for the image URL
});

const User = mongoose.model('customer_reviews', ReactFormDataSchema);
module.exports = User;
