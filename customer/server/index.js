require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const multer = require('multer');
const Razorpay = require('razorpay');
const shopRoutes = require("./router/cust");
const authRoutes = require("./router/auth");
const User = require('./schema/dataschema.js');
const { Customer, validate } = require('./models/shop');

// Initialize Express
const app = express();

// Enable CORS
app.use(cors());
app.options('*', cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://ayushgurav6:Ayush123@smallbizz.rwgr6tg.mongodb.net/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
});

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: 'rzp_test_wvOxIU5j9WDMOH',
    key_secret: 'Bo9Y5uh8Uq9x8Uhzx3VHAivw',
});

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads'); // Upload files to the 'uploads' directory
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Generate unique filename
    }
});

// Multer file filter to accept only image files
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Only images are allowed'), false); // Reject the file
    }
};

// Initialize multer with the storage and fileFilter configurations
const upload = multer({ storage: storage, fileFilter: fileFilter });

// Define schema for shop collection
const shopSchema = new mongoose.Schema({
    name: String,
    category: String,
    // Add more fields as per your data structure
});

// Define model for shop collection
const Shop = mongoose.model('Shop', shopSchema);

// Define schema for product collection
const productSchema = new mongoose.Schema({
    name: String,
    shopId: mongoose.Types.ObjectId,
    quantity: Number,
    // Add more fields as per your data structure
});

// Define model for product collection
const Product = mongoose.model('Product', productSchema);

// Define schema for buy now collection
const buyNowSchema = new mongoose.Schema({
    productId: mongoose.Types.ObjectId,
    quantity: Number, // Ensure quantity is defined as a number
    shopId: mongoose.Types.ObjectId,
    orderId: String,
    orderDate: Date,
    productName: String,
    customerId: mongoose.Types.ObjectId,
    orderStatus: { type: String, default: 'pending' },
    customerName: String, // New fields
    address: String,
    city: String,
    state: String,
    pincode: String,
    email: String,
    contact: String
});

// Define model for buy now collection
const BuyNow = mongoose.model('Buynow', buyNowSchema);

// Fetch all data from shop collection
const fetchShops = async () => {
    try {
        const shops = await Product.find({});
        console.log("All Shops:", shops);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

// Call fetchShops to fetch data
fetchShops();

const transactionSchema = new mongoose.Schema({
    productId: { type: mongoose.Types.ObjectId, required: true },
    quantity: { type: Number, required: true },
    shopId: { type: mongoose.Types.ObjectId, required: true },
    orderId: { type: String, required: true },
    amount: { type: Number, required: true },
    orderDate: { type: Date, required: true },
    productName: { type: String, required: true },
    customerId: { type: mongoose.Types.ObjectId, required: true },
    orderStatus: { type: String, default: 'completed', required: true }
}, { timestamps: true }); // Add timestamps for createdAt and updatedAt fields

const Transaction = mongoose.model('Transaction', transactionSchema);

// Route to record a transaction
app.post('/record-transaction', async (req, res) => {
    const { productId, quantity, shopId, orderId, productName, customerId, amount } = req.body;

    try {
        const transaction = new Transaction({
            productId,
            quantity,
            shopId,
            orderId,
            orderDate: new Date(),
            productName,
            customerId,
            amount,
        });

        await transaction.save();
        res.status(200).json({ message: 'Transaction recorded successfully' });
    } catch (error) {
        console.error('Error recording transaction:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Define a route to display all shops
app.get('/users', async (req, res) => {
    try {
        const shops = await Shop.find({});
        res.json(shops);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Define a route to display shops by category
app.get('/users/:category', async (req, res) => {
    const category = req.params.category;
    try {
        const shops = await Shop.find({ category: category });
        res.json(shops);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Modify the route to fetch products by shop ID
app.get('/shop/:shopId/products', async (req, res) => {
    const shopId = req.params.shopId;
    try {
        const products = await Product.find({ shopId: shopId });
        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Inserting reviews 
app.post('/insert', upload.single('image'), async (req, res) => {
    const shopId = req.body.shopId;
    const shopName = req.body.shopName;
    const review = req.body.review;
    const image = req.file ? req.file.path : null; // Get the uploaded image path or null if no image is uploaded

    const formData = new User({
        shopId: shopId,
        name: shopName,
        review: review,
        image: image // Add image path to the formData
    });

    try {
        await formData.save();
        console.log("Data inserted:", formData);
        res.send("Inserted data successfully.");
    } catch (err) {
        console.error("Error inserting data:", err);
        res.status(500).send("Internal Server Error");
    }
});

app.get('/products/:productId', async (req, res) => {
    const productId = req.params.productId;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error("Error fetching product details:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Add middleware for session management
app.use(session({
    secret: 'c6438a7fe3de5a86596e892c13994a33f7590c5228305aafae981344f059d5b5 ',
    resave: false,
    saveUninitialized: false
}));

// Define schema for cart collection
const cartSchema = new mongoose.Schema({
    userId: mongoose.Types.ObjectId,
    productId: mongoose.Types.ObjectId,
    productName: String,
    price: Number,
    description: String,
    count: { type: Number, default: 1 },
    shopId: mongoose.Types.ObjectId, // Add shopId to match BuyNow schema
    orderStatus: { type: String, default: 'pending' } // Add orderStatus to match BuyNow schema
});

// Define model for cart collection
const CartItem = mongoose.model('CartItem', cartSchema);

// Route to add product to cart
app.post('/add-to-cart', async (req, res) => {
    const { userId, productId, productName, price, description, shopId } = req.body; // Ensure shopId is included in the request
    try {
        const cartItem = new CartItem({
            userId,
            productId,
            productName,
            price,
            description,
            shopId // Include shopId in the cart item data
        });
        await cartItem.save();
        res.json({ message: 'Product added to cart successfully' });
    } catch (error) {
        console.error("Error adding product to cart:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Route to buy a product
app.post('/buy-now', async (req, res) => {
    try {
        // Create a new BuyNow document using the data from req.body
        const product = new BuyNow(req.body);
        
        // Validate quantity
        const parsedQuantity = parseInt(req.body.quantity, 10);
        if (isNaN(parsedQuantity)) {
            return res.status(400).json({ message: 'Quantity is not a valid number' });
        }

        // Save the new BuyNow document to the database
        await product.save();

        res.status(200).json({ message: 'Product purchased successfully' });
    } catch (error) {
        console.error('Error buying product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



// Route to create an order for Razorpay
app.post('/create-order', async (req, res) => {
    const { amount, currency, receipt } = req.body;
    try {
        const order = await razorpay.orders.create({ amount, currency, receipt });
        res.json({ orderId: order.id });
    } catch (error) {
        res.status(500).send('Error creating order');
    }
});

// Route to fetch cart items for a user
app.get('/cart/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const cartItems = await CartItem.find({ userId });
        res.json(cartItems);
    } catch (error) {
        console.error("Error fetching cart items:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Route to count total number of cart items for a user
app.get('/cart/:userId/count', async (req, res) => {
    const userId = req.params.userId;
    try {
        const cartItemCount = await CartItem.countDocuments({ userId });
        res.json({ count: cartItemCount });
    } catch (error) {
        console.error("Error counting cart items:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get('/cart/:userId/items', async (req, res) => {
    const userId = req.params.userId;
    try {
        const cartItems = await CartItem.find({ userId });
        res.json(cartItems);
    } catch (error) {
        console.error("Error fetching cart items:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Route to update the count of a cart item
app.put('/cart/:itemId/count', async (req, res) => {
    const itemId = req.params.itemId;
    const { count } = req.body;
    try {
        // Find the cart item by its ID and update the count
        const updatedItem = await CartItem.findByIdAndUpdate(itemId, { count }, { new: true });
        if (!updatedItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }
        res.json(updatedItem);
    } catch (error) {
        console.error("Error updating cart item count:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Route to delete a cart item
app.delete('/cart/:itemId', async (req, res) => {
    const itemId = req.params.itemId;
    try {
        // Delete the cart item by its ID
        const deletedItem = await CartItem.findByIdAndDelete(itemId);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }
        res.json({ message: 'Cart item deleted successfully' });
    } catch (error) {
        console.error("Error deleting cart item:", error);
        res.status(500).send("Internal Server Error");
    }
});
app.get('/profile/users/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        console.log("Received request for user profile with ID:", userId);
        const user = await Customer.findById(userId);
        if (!user) {
            console.log("User not found with ID:", userId);
            return res.status(404).json({ message: 'User not found' });
        }
        console.log("User found:", user);
        res.json(user);
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.use("/api/shops", shopRoutes);
app.use("/api/auth", authRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Function to generate unique order ID
function generateOrderId() {
    return 'ORDER-' + Math.random().toString(36).substr(2, 9);
}
