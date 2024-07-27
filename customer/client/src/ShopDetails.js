// ShopDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ShopDetails() {
  const { category } = useParams();
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const fetchShopsByCategory = async () => {
      try {
        const response = await fetch(`/shops/${category}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setShops(data);
      } catch (error) {
        console.error('Error fetching shop data:', error);
      }
    };

    fetchShopsByCategory();
  }, [category]);

  return (
    <div>
      <h1>Shops in {category}</h1>
      <ul>
        {shops.map((shop) => (
          <li key={shop._id}>{shop.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ShopDetails;
