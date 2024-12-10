const pool = require('../config/db');

const createOrder = async (orderData) => {
  const { userId, products, totalAmount, shippingAddress, status } = orderData;
  const [result] = await pool.query(
    'INSERT INTO orders (user_id, total_amount, shipping_address, status) VALUES (?, ?, ?, ?)',
    [userId, totalAmount, shippingAddress, status]
  );

  const orderId = result.insertId;

  for (const product of products) {
    await pool.query(
      'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
      [orderId, product.productId, product.quantity, product.price]
    );
  }

  return orderId;
};

const getOrdersByUserId = async (userId) => {
  const [orders] = await pool.query(
    'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
    [userId]
  );
  return orders;
};

const getOrderById = async (orderId) => {
  const [order] = await pool.query(
    'SELECT * FROM orders WHERE id = ?',
    [orderId]
  );
  const [items] = await pool.query(
    'SELECT * FROM order_items WHERE order_id = ?',
    [orderId]
  );

  return { ...order[0], items };
};

module.exports = { createOrder, getOrdersByUserId, getOrderById };
