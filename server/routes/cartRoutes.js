const express = require('express');
const router = express.Router();
const { addToCart, deleteFromCart, getCart } = require('../controllers/cartController');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, getCart);
router.post('/', authMiddleware, addToCart);
router.delete('/', authMiddleware, deleteFromCart);

module.exports = router;