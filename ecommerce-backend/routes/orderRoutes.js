const express = require('express');
const { createOrder, getUserOrders, getOrderDetails } = require('../controllers/orderController');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

// Create a new order
router.post('/', authenticate, createOrder);

// Get all user orders
router.get('/', authenticate, getUserOrders);

// Get specific order details
router.get('/:id', authenticate, getOrderDetails);

module.exports = router;
