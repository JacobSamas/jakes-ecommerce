const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

// Get all products
router.get('/', productController.getAllProducts);

// Get a single product
router.get('/:id', productController.getProductById);

// Add a new product
router.post('/', productController.addProduct);

// Update a product
router.put('/:id', productController.updateProduct);

// Delete a product
router.delete('/:id', productController.deleteProduct);

module.exports = router;