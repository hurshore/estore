const express = require('express');
const router = express.Router();
const { addToCart, deleteFromCart } = require('../controllers/cartController');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, addToCart);
router.delete('/', authMiddleware, deleteFromCart);

module.exports = router;