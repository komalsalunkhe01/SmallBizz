const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

const shopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  mobileNo: { type: Number, required: true },
  landmark: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: Number, required: true }
});

shopSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id, name: this.name }, process.env.JWTPRIVATEKEY, { expiresIn: "7d" });
  return token;
};

const Customer = mongoose.model('Customer', shopSchema);

const complexityOptions = {
  min: 8,
  max: 30,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 4
};

const validate = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().label("Name"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity(complexityOptions).required().label("Password"),
    mobileNo: Joi.number().required().label("Mobile No"),
    landmark: Joi.string().required().label("Landmark"),
    city: Joi.string().required().label("City"),
    state: Joi.string().required().label("State"),
    pincode: Joi.number().required().label("Pincode")
  });
  return schema.validate(data);
};

module.exports = { Customer, validate };
