const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Get reviews for a specific product
router.get('/:productId', reviewController.getProductReviews);

// Add a new review
router.post('/', reviewController.addReview);

module.exports = router;
