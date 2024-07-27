import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './addproduct.css'; // Import CSS file for styling

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: '',
    description: '', // Add description field
    price: '',
    image: '', // Add image field
    shopId: '',
    quantity: '',
  });

  useEffect(() => {
    const fetchShopId = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/auth/shopId');
        console.log(response)
        const shopId = response.data.ses;
        console.log('Shop ID:', shopId);
        setProductData(prevData => ({ ...prevData, shopId }));
      } catch (error) {
        console.error('Error fetching shopId:', error);
      }
    };

    fetchShopId();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/products', productData);
      window.location.href = '/home';
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const [image, setImage] = useState(null); // State to store image file

  function convertto64(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result); // Set image preview
      setProductData({ ...productData, image: reader.result }); // Set image data in productData
    };
    reader.onerror = error => {
      console.error('Error reading file:', error);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="add-product-container">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Product Name" value={productData.name} onChange={handleChange} />
        <textarea name="description" placeholder="Product Description" value={productData.description} onChange={handleChange}></textarea>
        <input type="text" name="price" placeholder="Price" value={productData.price} onChange={handleChange} />

        <h4>Upload Image of the product</h4>
        <input accept="image/*" type="file" onChange={convertto64}></input>

        {image && <img src={image} alt="Preview" className="preview-image" />}
        <input type="number" name="quantity" placeholder="Quantity" value={productData.quantity} onChange={handleChange}/>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddProduct;
