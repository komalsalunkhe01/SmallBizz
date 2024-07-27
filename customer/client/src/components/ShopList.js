
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchShopDataByCategory } from '../service/api';
import Card from './Card';
import { useNavigate } from 'react-router-dom';
import styles from './ShopList.module.css';

const ShopList = () => {
  const { category } = useParams();
  const [shopData, setShopData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchShopDataByCategory(category);
        setShopData(data);
        setFilteredData(data);
      } catch (error) {
        console.error('Error fetching shop data:', error);
        setError('Failed to fetch shop data. Please try again later.');
      }
    }
    fetchData();
  }, [category]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    const filtered = shopData.filter((shop) =>
      shop.pinCode.toString().startsWith(e.target.value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleCardClick = (shopId) => {
    navigate(`/shop/${shopId}/products`);
  };

  return (
    <div className={styles.shopListContainer}>
      <h1 className={styles.pageTitle}>Shops for {category}</h1>
      <div>
        <input
          type="text"
          placeholder="Search by address"
          value={searchTerm}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
        <button className={styles.searchButton}>SEARCH</button>
      </div>
      {error && <div>Error: {error}</div>}
      <div className={styles.cardContainer}>
        {filteredData.map((shop) => (
          <Link key={shop._id} to={`/shop/${shop._id}/products`} className={styles.cardLink}>
            <Card shop={shop} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ShopList;
