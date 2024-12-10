const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// Public Routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// Protected Route (requires token)
const verifyToken = require('../middleware/authMiddleware');
router.get('/profile', verifyToken, userController.getUserProfile);

module.exports = router;
