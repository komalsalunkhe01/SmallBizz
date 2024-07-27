const express = require('express');
const bcrypt = require('bcrypt');
const { Shop, validate } = require('../models/shop');
const GovernId = require('../models/governId');
const auth = require('../middleware/auth');
const router = express.Router();
const { getShopDetails } = require('../controllers/shopController');

// Route to create a new shop
router.post('/', async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const govId = await GovernId.findOne({ gov_id: req.body.gov_id });
    if (!govId) return res.status(400).send({ message: 'Invalid government-issued registration ID' });

    const existingShop = await Shop.findOne({ email: req.body.email });
    if (existingShop) {
      return res.status(409).send({ message: "Shop with given email already exists" });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newShop = new Shop({
      ...req.body,
      password: hashedPassword
    });

    await newShop.save();

    res.status(201).send({ message: "Shop created successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Route to get shop details




// Route to get shop details
router.get('/me', auth, getShopDetails);

module.exports = router;

