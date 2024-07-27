import React, { useState, useEffect } from "react";
import Side from "./Side";
import axios from "axios";
import "./order.css"; // Reuse the same CSS for styling

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);

  const fetchOrderHistory = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/orderhistory`); // Assuming this endpoint exists
      setOrderHistory(response.data); // Directly set the fetched data
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching order history:", error);
    }
  };

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  return (
    <div>
      <Side />
      <div className="header">Order History</div>
      <div className="orders">
        <h2>Order History</h2>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Order Date</th>
              <th>Product Name</th>
              <th>Product ID</th>
              <th>Quantity</th>
              <th>Customer ID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orderHistory.map((order) => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{new Date(order.orderDate).toLocaleString()}</td>
                <td>{order.productName}</td>
                <td>{order.productId}</td>
                <td>{order.quantity}</td>
                <td>{order.customerId}</td>
                <td>{order.orderStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistory;
