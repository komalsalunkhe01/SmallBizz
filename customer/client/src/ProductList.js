import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './ProductList.module.css'; // Import CSS module
import ReviewForm from './components/ReviewForm';

const ProductList = () => {
  const { shopId, userId } = useParams(); // Get shopId and userId from URL params
  const [shop, setShop] = useState(null);  
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const reviewFormRef = useRef(null); // Ref to the ReviewForm component

  useEffect(() => {
    if (shopId) {
      async function fetchData() {
        try {
          const response = await fetch(`http://localhost:5000/shop/${shopId}/products`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          if (data.length > 0) {
            const shopObject = data[0]; // Get the first element from the array for shop details
            setShop(shopObject); // Set shop state with shop details
            setProducts(data); // Set products state with all products
          } else {
            throw new Error('Shop data is empty');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
          setError('Failed to fetch data. Please try again later.');
        }
      }
      fetchData(); // Fetch shop details and products
    }
  }, [shopId]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (reviewFormRef.current && !reviewFormRef.current.contains(event.target)) {
        setShowReviewForm(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <div className={styles.navLeft}>
          <h1>Products</h1>
          <p>User ID: {userId}</p> {/* Display user ID */}
        </div>
        <button onClick={() => setShowReviewForm(!showReviewForm)}>
          {showReviewForm ? 'Close Reviews' : 'Add Reviews'}
        </button>
      </nav>
      {error && <div className={styles.error}>Error: {error}</div>}
      <div className={styles.productContainer}>
        {products.map(product => (
          <div className={styles.productCard} key={product._id}>
            {product.image && <img src={product.image} alt={product.name} />}
            <Link to={`/buy-now/${product._id}`} key={product._id}>
              <h3>{product.name}</h3>
            </Link>
            <p>Price: {product.price}</p>
            <p>Description: {product.description}</p>
          </div>
        ))}
      </div>
      {showReviewForm &&
        <div ref={reviewFormRef}>
          <ReviewForm shopId={shopId} shopName={shop ? shop.name : ''} />
        </div>
      }
    </div>
  );
};

export default ProductList;
