const express = require('express');
const router = express.Router();
const { uploadProduct } = require('../controllers/productController');

router.post('/upload', uploadProduct);

module.exports = router;