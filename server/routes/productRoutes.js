const express = require('express');
const router = express.Router();
const { uploadProduct, getProducts, getProduct } = require('../controllers/productController');

router.post('/upload', uploadProduct);
router.get('/', getProducts);
router.get('/:productId', getProduct);

module.exports = router;