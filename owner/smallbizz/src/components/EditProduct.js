import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './addproduct.css'; // Import CSS file for styling
import { useParams } from 'react-router-dom';

const EditProduct = () => {
    const { product_id } = useParams();

    const [productData, setProductData] = useState({
        name: '',
        description: '', // Add description field
        price: '',
        image: '', // Add image field
        shopId: '',
        quantity: ''
    });

    useEffect(() => {
        loadProductEdit();
    },[]);

    const getSingleProduct = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/products/editproduct/${id}`);
            return response.data;
        } catch (error) {
            console.log("Error while calling the API", error);
        }
    };

    const UpdateProduct = async (e) => {
        e.preventDefault();
        try {
           
            await axios.put(`http://localhost:8000/api/products/editproduct/${product_id}`, productData);
            window.location.href = '/home';
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const loadProductEdit = async () => {
      
        const product = await getSingleProduct(product_id);
        console.log(product);
        setProductData(product);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
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
            <h2>Edit Product</h2>
            <form onSubmit={UpdateProduct}>
                <input type="text" name="name" placeholder="Product Name" value={productData.name} onChange={handleChange}></input>
                <textarea name="description" placeholder="Product Description" value={productData.description} onChange={handleChange}></textarea>
                <input type="text" name="price" placeholder="Price" value={productData.price} onChange={handleChange}></input>

                <h4>Upload Image of the product</h4>
                <input accept="image/*" type="file" onChange={convertto64}></input>

                {image && <img src={image} alt="Preview" className="preview-image" />}
                <input type="number" name="quantity" placeholder="Quantity" value={productData.quantity} onChange={handleChange}/>
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default EditProduct;
