import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewOrderPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/orders/products/${orderId}`);
        setOrder(response.data.order);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order:', error);
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <div>
      <h2>Order Details</h2>
      <p>Order ID: {order._id}</p>
      <p>User: {order.user.name}</p>
      <p>Email: {order.user.email}</p>
      <p>Shipping Address: {order.shippingAddress.name}, {order.shippingAddress.street}, {order.shippingAddress.landmark}, {order.shippingAddress.postalCode}</p>
      <p>Product: {order.products[0].name}</p>
      <p>Quantity: {order.products[0].quantity}</p>
      <p>Unit Price: ${order.products[0].price}</p>
      <p>Total Price: ${order.totalPrice}</p>
      <p>Payment Method: {order.paymentMethod}</p>
      <p>Order Date: {new Date(order.createdAt).toLocaleString()}</p>
    </div>
  );
};

export default ViewOrderPage;
