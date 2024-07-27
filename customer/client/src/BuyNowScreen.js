import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import QuantityCounter from './QuantityCounter';
import UserDetailsForm from './UserDetailsForm';
import styles from './BuyNowScreen.module.css';

const BuyNowScreen = ({ userId }) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/products/${productId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleBuyNowClick = () => {
    setShowForm(true);
  };

  const handleFormSubmit = (details) => {
    setUserDetails(details);
    handleBuyNow(details);
  };

  const handleBuyNow = async (details) => {
    try {
      const orderData = {
        amount: product.price * quantity * 100,
        currency: 'INR',
        receipt: `receipt_${new Date().getTime()}`,
      };

      const orderResponse = await axios.post('http://localhost:5000/create-order', orderData);
      const { orderId } = orderResponse.data;

      const options = {
        key: 'rzp_test_wvOxIU5j9WDMOH',
        amount: orderData.amount,
        currency: 'INR',
        name: product.name,
        description: product.description,
        image: product.image,
        order_id: orderId,
        handler: async (response) => {
          const paymentData = {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            productId: product._id,
            amount: orderData.amount / 100,
            currency: 'INR',
            productName: product.name,
            quantity: quantity,
            shopId: product.shopId,
            customerId: userId,
            orderStatus: 'completed',
            orderDate: new Date(),
            customerName: details.customerName,
            address: details.address,
            city: details.city,
            state: details.state,
            pincode: details.pincode,
            email: details.email,
            contact: details.contact,
          };

          try {
            await axios.post('http://localhost:5000/buy-now', paymentData);
            console.log('Buy done');
          } catch (error) {
            console.log("Failed to call buy now", error);
          }
          try {
            await axios.post('http://localhost:5000/record-transaction', paymentData);
            console.log('Product bought successfully');
          } catch (error) {
            console.log("Failed to record transaction", error);
          }
          navigate(`/buy-now/${productId}`);
        },
        prefill: {
          name: details.customerName,
          email: details.email,
          contact: details.contact,
        },
        notes: {
          address: details.address,
        },
        theme: {
          color: '#F37254',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Error during payment process:', error);
    }
  };

  const handleAddToCart = async () => {
    try {
      const data = {
        userId: userId,
        productId: product._id,
        productName: product.name,
        price: product.price,
        description: product.description,
        quantity: quantity,
        shopId: product.shopId,
      };
      await axios.post('http://localhost:5000/add-to-cart', data);
      console.log('Product added to cart');
      navigate('/cart');
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  return (
    <div className={styles.container}>
      {loading ? (
        <p>Loading...</p>
      ) : product ? (
        <div className={styles.productDisplay}>
          <div className={styles.imageContainer}>
            <img src={product.image} alt={product.name} className={styles.productImage} />
          </div>
          <div className={styles.detailsContainer}>
            <h1 className={styles.productName}>{product.name}</h1>
            <p className={styles.productDescription}>{product.description}</p>
            <p className={styles.productPrice}>Price: ₹{product.price}</p>
            <div className={styles.quantityCounter}>
              <QuantityCounter
                quantity={quantity}
                onChange={(newQuantity) => setQuantity(newQuantity)}
              />
            </div>
            <div className={styles.buttons}>
              <button className={styles.buyButton} onClick={handleBuyNowClick}>Buy Now</button>
              <button className={styles.cartButton} onClick={handleAddToCart}>Add to Cart</button>
            </div>
            {showForm && <UserDetailsForm onSubmit={handleFormSubmit} />}
          </div>
        </div>
      ) : (
        <p>No product found</p>
      )}
    </div>
  );
};

export default BuyNowScreen;
