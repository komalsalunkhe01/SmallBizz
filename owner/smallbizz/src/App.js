import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AddProduct from "./components/AddProduct";
import History from "./components/History";
import Promo from "./components/Promo";
import Order from "./components/Order";
import Reviews from "./components/Reviews"
import OrderHistory from "./components/OrderHistory";
import EditProduct from "./components/EditProduct"
import Profile from "./components/Profile";


function App() {
  // const shop = localStorage.getItem("token");
  return (
    <Routes>
      <Route path="/login" exact element={<Login />} />
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/home" exact element={<Home />} />
      <Route path="/" exact element={<Navigate replace to="/login" />} />
      <Route path="/add-product" exact element={<AddProduct />} />
      <Route path="/history" exact element={<History />} />
      <Route path="/reviews" exact element={<Reviews />} />
      <Route path="/orders" exact element={<Order />} />
      <Route path="/orderhistory" exact element={<OrderHistory/>}/>
      <Route path="promo" exact element={<Promo />} />
      <Route path="/profile" exact element={<Profile />} />
    

      <Route path="/editproduct/:product_id" element={<EditProduct></EditProduct>}></Route>
    </Routes>
  );
}

export default App;