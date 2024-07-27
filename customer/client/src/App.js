import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import 'firebase/compat/auth';
import WelcomeScreen from './WelcomeScreen';
import Profile from './components/Profile'; // Import the Profile component
import Cardlist from './components/Cardlist';
import ShopList from './components/ShopList';
import ProductList from './ProductList';
import Login from "./components/Login";
import Signup from "./components/Signup";
import BuyNowScreen from './BuyNowScreen';
import { useState } from "react";
import CartList from './components/CartList'; 


function App() {

  const [userId, setUserId] = useState(null);

  const handleLogin = (userId) => {
    setUserId(userId);
  };
  console.log(userId);
  return (
    <Router>
      <div>
      
        <Routes> {/* Use Routes instead of Switch */}
          <Route path="/welcome" element={<WelcomeScreen userId={userId} />} /> {/* Pass username as prop */}
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/" exact element={<Navigate replace to="/login" />} />
          <Route path="/login" exact element={<Login handleLogin={handleLogin} />} />
          <Route path="/shops" element={<Cardlist />} />
          
          <Route path="/shop-list/:category" element={<ShopList />} />
          <Route path="/shop/:shopId/products" element={<ProductList />} />
          <Route path="/buy-now/:productId" element={<BuyNowScreen userId={userId} />} /> {/* Route for BuyNowScreen */}
          <Route path="/cart" element={<CartList userId={userId} />} />
          <Route path="/profile" element={<Profile userId={userId} />} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;