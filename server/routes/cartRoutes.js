const express = require('express');
const router = express.Router();
const { addToCart, batchAddToCart, deleteFromCart, getCart } = require('../controllers/cartController');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, getCart);
router.post('/', authMiddleware, addToCart);
router.post('/batch', authMiddleware, batchAddToCart);
router.delete('/', authMiddleware, deleteFromCart);

module.exports = router;