import React, { useState, useEffect } from "react";
import Side from "./Side";
import "./home.css";
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Tooltip } from "@mui/material";
import styled from "@emotion/styled";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Tablestyle = styled(Table)`
  width: 75%;
  margin: 20px;
  margin-left: 250px;
  margin-top: 20px;
`;

const Thead = styled(TableHead)`
  background-color: black;
`;

const Tableheadcell = styled(TableCell)`
  color: white;
  font-size: 20px;
  margin-left: 30px;
`;

const DescriptionCell = styled(TableCell)`
  max-width: 200px; /* Adjust this value as per your requirement */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const DescriptionTooltip = ({ description }) => (
  <Tooltip title={description} placement="top">
    <span>{description}</span>
  </Tooltip>
);

const Home = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deletetheprod = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/products/${id}`);
    } catch (error) {
      console.log("Error while deleting the API", error);
    }
  };

  const deleteProduct = async (Id) => {
    await deletetheprod(Id);
    fetchProducts();
  };

  return (
    <div>
      <div className="header">Products</div>
      <Side />
      <button onClick={() => (window.location.href = "/add-product")} className="add-product-button">
        Add Product
      </button>
      <Tablestyle>
        <Thead>
          <TableRow>
            <Tableheadcell>Product Id</Tableheadcell>
            <Tableheadcell>Product Name</Tableheadcell>
            <Tableheadcell>Price</Tableheadcell>
            <Tableheadcell>Quantity</Tableheadcell>
            <Tableheadcell>Description</Tableheadcell>
            <Tableheadcell></Tableheadcell>
          </TableRow>
        </Thead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id}>
              <TableCell>{product._id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <DescriptionCell>
                <DescriptionTooltip description={product.description} />
              </DescriptionCell>
              <TableCell>
                <Button
                  onClick={() => {
                    console.log("Edit clicked with id:", product._id);
                    navigate(`/editproduct/${product._id}`);
                  }}
                >
                  <EditIcon />
                </Button>
                <Button onClick={() => deleteProduct(product._id)}>
                  <DeleteIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Tablestyle>
    </div>
  );
};

export default Home;