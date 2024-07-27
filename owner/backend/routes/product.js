const router = require('express').Router();
const { Product } = require('../models/product');
const Joi = require('joi');
const axios = require('axios');



// getting products
router.get('/', async (req, res) => {
    try {
 
    const response = await axios.get('http://localhost:8000/api/auth/shopId'); // Assuming the shop id is stored in the session
    console.log(response.data.ses);
    shopId=response.data.ses;
    // Query the database for products associated with the current shop id
    const products = await Product.find({ shopId });

    // Send the products back in the response
    res.status(200).json(products);
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.post('/', async (req, res) => {
    try {
        // Validate the request body
        const { error } = validateProduct(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }
        
        // Create the product
        const product = await new Product({
            name: req.body.name,
            price: req.body.price,
            shopId: req.body.shopId, // Associate the product with the shop
            description: req.body.description,
            image: req.body.image, // Assuming image is already base64 encoded
            quantity: req.body.quantity,
        }).save();

        res.status(201).send({ message: 'Product created successfully', data: product });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// for single user below:
router.get('/editproduct/:id', async (req, res) => {
    const id=req.params.id;
    try{
    
        const myprod=await Product.findById(id);
        res.json(myprod);
    }
    catch(error){
        console.log("Error while fetching the data get single product", error);
        
    }

});

// route for updating data
router.put('/editproduct/:id', async (req, res) => {
    const id = req.params.id;
    let newData = req.body;
    delete newData._id;
    delete newData.__v;
    try {
        const { error } = validateProduct(newData);
        if (error) {
            console.error("Validation Error:", error.details[0].message);
            return res.status(400).send({ message: error.details[0].message });
        }
      
      
        const myprod = await Product.findByIdAndUpdate(id, newData, { new: true });
        res.json(myprod);
    } catch (error) {
        console.log("Error while updating the product", error);
        res.status(500).send({ message: "Error while updating the product" });
    }
});

// For deleting
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const myprod = await Product.findByIdAndDelete(id);
        res.json(myprod);
    } catch (error) {
        console.log("Error while deleting the product", error);
        res.status(500).send({ message: "Error while deleting the product" });
    }
})

// Validation function for product
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

module.exports = router;
