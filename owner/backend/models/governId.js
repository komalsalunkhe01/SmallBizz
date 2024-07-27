const mongoose = require('mongoose');

const governIdSchema = new mongoose.Schema({
  gov_id: {
    type: String,
    required: true,
    unique: true
  }
});

const GovernId = mongoose.model('GovernId', governIdSchema);

module.exports = GovernId;
