import React from 'react';
import './Card.css'; // Import the CSS file for styling
import styles from './Card.module.css'; // Import CSS module


const Card = ({ shop }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2>{shop.shopName}</h2>
        <p className={styles.category}>Category: {shop.category}</p>
      </div>
      <div className={styles.cardBody}>
        <p className={styles.address}>Pin Code: {shop.pinCode}</p>
        <p className={styles.mobile}>Mobile No: {shop.mobileNo}</p>
        <p className={styles.ID}> ID: {shop._id}</p>
        {/* Add more shop information as needed */}
      </div>
    </div>
  );
};

export default Card;
