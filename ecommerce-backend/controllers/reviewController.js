const pool = require('../config/db');

// Get all reviews for a product
const getProductReviews = async (req, res) => {
    try {
        const [reviews] = await pool.query(
            'SELECT r.*, u.name as user_name FROM reviews r JOIN users u ON r.user_id = u.id WHERE product_id = ? ORDER BY r.created_at DESC',
            [req.params.productId]
        );
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add a new review
const addReview = async (req, res) => {
    const { product_id, user_id, rating, comment } = req.body;
    if (!product_id || !user_id || !rating || rating < 1 || rating > 5) {
        return res.status(400).json({ message: "Invalid input data" });
    }

    try {
        const [result] = await pool.query(
            'INSERT INTO reviews (product_id, user_id, rating, comment) VALUES (?, ?, ?, ?)',
            [product_id, user_id, rating, comment]
        );
        res.status(201).json({ message: "Review added", id: result.insertId });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getProductReviews, addReview };
