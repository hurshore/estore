const express = require('express');
const router = express.Router();
const { addToCart, batchAddToCart, deleteFromCart, getCart, clearFromCart, deleteCart } = require('../controllers/cartController');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, getCart);
router.post('/', authMiddleware, addToCart);
router.post('/batch', authMiddleware, batchAddToCart);
router.delete('/', authMiddleware, deleteFromCart);
router.delete('/clear', authMiddleware, clearFromCart);
router.delete('/all', authMiddleware, deleteCart);

module.exports = router;