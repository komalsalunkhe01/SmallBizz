import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { AccountCircle, ShoppingBasket } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Navbar({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/profile/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
        setError('Error fetching user details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserDetails();
    } else {
      setLoading(false);
    }
  }, [userId]);

  return (
    <AppBar position="static" sx={{ backgroundColor: '#7c3b9f' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
           BizzConnect
        </Typography>
        <div>
          {/* Link to Cart */}
          <IconButton size="large" edge="end" color="inherit" component={Link} to="/cart">
            <ShoppingBasket />
          </IconButton>
          {/* Link to Profile */}
          <IconButton size="large" edge="end" color="inherit" component={Link} to="/profile">
            <AccountCircle />
          </IconButton>
          {/* Display user info or loading/error message */}
          <Typography variant="body1" sx={{ ml: 1 }}>
            {loading && 'Loading...'}
            {!loading && error && error}
            {!loading && !error && user && `Welcome, ${user.name}`}
            {!loading && !error && !user && 'Welcome, Guest'}
          </Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
