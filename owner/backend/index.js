require('dotenv').config();
const express = require('express');
const app = express();
const cors= require("cors");
const session = require('express-session'); // Import express-session
const connection=require("./db")
const shopRoutes=require("./routes/shop.js");
const authRoutes=require("./routes/auth.js");
const addprodRoutes=require("./routes/product.js");
const promoRoutes=require("./routes/promo.js");
const orderRoutes=require("./routes/order.js");
const transaction=require("./routes/transaction_history.js");
const reviewRoutes=require("./routes/reviews.js");
const orderhistoryroutes= require("./routes/historyOrder.js");
const bodyParser = require('body-parser');



connection();
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json({ limit: '10mb' })); // Set JSON payload size limit
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true })); // Set URL-encoded payload size limit

app.use(express.json());

// Add middleware for session management
app.use(session({
  secret: 'c6438a7fe3de5a86596e892c13994a33f7590c5228305aafae981344f059d5b5 ', // Change this to a secure random key
  resave: false,
  saveUninitialized: false
}));

app.use("/api/shops",shopRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/products",addprodRoutes);
app.use("/api/promo",promoRoutes);
app.use("/api/orders",orderRoutes);
app.use("/api/reviews",reviewRoutes);
app.use("/api/orderhistory",orderhistoryroutes);
app.use("/api/history",transaction);

const port=8000;
app.listen(port,()=>console.log("server is running on port 8000"))