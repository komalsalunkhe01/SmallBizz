import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Counter from './Counter';
import './cartItem.css';
import QuantityCounter from '../QuantityCounter';

function CartList({ userId }) {
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:5000/cart/${userId}/items`)
        .then(response => {
          setCartItems(response.data);
        })
        .catch(error => {
          console.error('Error fetching cart items:', error);
        });
    }
  }, [userId]);

  const handleCountUpdate = (itemId, newCount) => {
    axios.put(`http://localhost:5000/cart/${itemId}/count, { count: newCount }`)
      .then(response => {
        if (newCount === 0) {
          handleDeleteItem(itemId);
        } else {
          setCartItems(prevItems => {
            const updatedItems = prevItems.map(item => {
              if (item._id === itemId) {
                return { ...item, count: newCount };
              }
              return item;
            });
            return updatedItems;
          });
        }
      })
      .catch(error => {
        console.error('Error updating count:', error);
      });
  };

  const handleDeleteItem = (itemId) => {
    axios.delete(`http://localhost:5000/cart/${itemId}`)
      .then(response => {
        setCartItems(prevItems => prevItems.filter(item => item._id !== itemId));
      })
      .catch(error => {
        console.error('Error deleting item:', error);
      });
  };

  const handleBuyNow = async (productId) => {
    try {
      const product = cartItems.find(item => item.productId === productId);
      const data = {
        orderDate: new Date(),
        productName: product.productName,
        productId: product.productId,
        quantity: product.count,
        shopId: product.shopId,
        customerId: userId,
        orderStatus: 'pending'
      };
      await axios.post('http://localhost:5000/buy-now', data);
      console.log('Product bought successfully');
      
      // Clear the particular product from the cart items state
      setCartItems(prevItems => prevItems.filter(item => item._id !== product._id));
    } catch (error) {
      console.error('Error buying product:', error);
    }
  };
  

  return (
    <div>
      <h1>Cart Items</h1>
      <div className="cart-container">
        {cartItems.map(item => (
          <div className="card" key={item._id}>
            <h3>{item.productName}</h3>
            <p>Price: {item.price}</p>
            <p>Description: {item.description}</p>
            {/* <Counter initialValue={item.count} onUpdate={newCount => handleCountUpdate(item._id, newCount)} /> */}
            <QuantityCounter
            quantity={quantity}
            onChange={(newQuantity) => setQuantity(newQuantity)}
          />
            <p>Count in Cart: {item.count}</p>
            <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
            <button onClick={() => handleBuyNow(item.productId)}>Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CartList;