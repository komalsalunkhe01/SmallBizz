const Joi = require("joi");
const { Customer, validate } = require('../models/shop');
const bcrypt = require("bcrypt");
const router = require('express').Router();

router.post('/', async (req, res) => {
  try {
    const { error } = validate(req.body, true);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const existingCustomer = await Customer.findOne({ email: req.body.email });
    if (existingCustomer) {
      return res.status(409).send({ message: "Customer with given email already exists" });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newCustomer = new Customer({
      ...req.body,
      password: hashedPassword
    });

    await newCustomer.save();

    req.session.custId = newCustomer._id;

    res.status(201).send({ message: "User created successfully", custId: newCustomer._id });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

module.exports = router;
