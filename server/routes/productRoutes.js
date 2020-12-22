const express = require('express');
const router = express.Router();
const { uploadProduct, getProducts } = require('../controllers/productController');

router.post('/upload', uploadProduct);
router.get('/', getProducts);

module.exports = router;