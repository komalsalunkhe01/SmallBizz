const { Shop } = require('../models/shop');
const Promotion = require('../models/promotion');
const GovernId = require('../models/governId'); // Assuming your model is named 'GovernId'

// Controller to get shop details along with promotions
const getShopDetails = async (req, res) => {
  try {
    const shop = await Shop.findById(req.user._id).select('-password');
    if (!shop) return res.status(404).send('Shop not found');

    const govId = await GovernId.findOne({ gov_id: shop.gov_id });
    if (!govId) return res.status(404).send('Government ID not found');

    const promotions = await Promotion.find({ shopId: shop._id }).select('title description');

    res.send({ shop, govId, promotions });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

module.exports = { getShopDetails };
