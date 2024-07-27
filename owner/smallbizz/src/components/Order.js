import React, { useState, useEffect } from "react";
import Side from "./Side";
import axios from "axios";
import "./order.css";

const Order = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/orders`);
      const ordersWithStatus = response.data.map((order) => ({
        ...order,
        status: order.orderStatus || "Pending", // Initialize with existing status or default to "Pending"
      }));
      setOrders(ordersWithStatus);
      console.log(ordersWithStatus);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    const order = orders.find((order) => order.orderId === orderId);
    if (!order) return;

    if (newStatus === "Done" || newStatus === "Cancelled") {
      try {
        await axios.post(`http://localhost:8000/api/orders`, {
          orderId: order.orderId,
          orderDate: order.orderDate,
          productName: order.productName,
          productId: order.productId,
          quantity: order.quantity,
          shopId: order.shopId, // Add shopId
          customerName: order.customerName,
          address: order.address, // Add address
          pincode: order.pincode, // Add pincode
          orderStatus: newStatus, // Change status to orderStatus
        });
        await axios.delete(`http://localhost:8000/api/orders/${orderId}`);
        setOrders((prevOrders) => prevOrders.filter((order) => order.orderId !== orderId));
      } catch (error) {
        console.error("Error updating order:", error);
      }
    } else {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderId === orderId ? { ...order, status: newStatus } : order
        )
      );
    }
  };

  return (
    <div>
      <Side />
      <div className="header">Orders</div>
      <div className="orders">
       
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Order Date</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Customer Name</th>
              <th>Address</th>
              <th>Pincode</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{new Date(order.orderDate).toLocaleString()}</td>
                <td>{order.productName}</td>
                <td>{order.quantity}</td>
                <td>{order.customerName}</td>
                <td>{order.address}</td>
                <td>{order.pincode}</td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Done">Done</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
