const router = require('express').Router();
const { Shop } = require('../models/shop');
const Joi = require("joi");
const bcrypt = require("bcrypt");

let ses;

const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password"),
    });
    return schema.validate(data);
};

router.get('/shopId', (req, res) => {
    // const shopId = ses;
    
    try {
        // console.log(ses)
        // console.log('Retrieved shopId from session:', ses);
        res.status(200).send({ ses });
    } catch (error) {
        console.error('Error retrieving shopId:', error);
        res.status(500).send({ message: error.message });
    }
});


router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }

        const shop = await Shop.findOne({ email: req.body.email });
        if (!shop) {
            return res.status(401).send({ message: "Invalid email or password" });
        }

        const validPassword = await bcrypt.compare(req.body.password, shop.password);
        if (!validPassword) {
            return res.status(401).send({ message: "Invalid email or password" });
        }

        // Assign shop _id to session upon successful login
        ses = shop._id;

        // Log the assigned shopId for debugging
        // console.log('Assigned shopId to session:', ses);

        const token = shop.generateAuthToken();
        res.status(200).send({ data: token, message: "Logged in successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});


module.exports = router;
