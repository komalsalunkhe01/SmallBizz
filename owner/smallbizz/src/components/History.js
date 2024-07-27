import React, { useState, useEffect } from "react";
import Side from "./Side";
import axios from "axios";

import "./history.css"; // Assuming this file contains your CSS styling

const History = () => {
  const [history, setHistory] = useState([]);

  const fetchOrderHistory = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/history`);
      setHistory(response.data); // Directly set the fetched data
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
      <div className="header">Transaction History</div>
      <div className="history">
  
        <table>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Order ID</th>
              <th>Amount</th>
              <th>Product Name</th>
              <th>Product ID</th>
              <th>Customer ID</th>
              <th>Order Date</th>
            </tr>
          </thead>
          <tbody>
            {history.map((transaction) => (
              <tr key={transaction.transactionId}>
                <td>{transaction.transactionId}</td>
                <td>{transaction.orderId}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.productName}</td>
                <td>{transaction.productId}</td>
                <td>{transaction.customerId}</td>
                <td>{new Date(transaction.orderDate).toLocaleDateString() + ' ' + new Date(transaction.orderDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
