const express = require('express');
const router = express.Router();
const { uploadProduct, getProducts, getProduct, searchProducts } = require('../controllers/productController');
const { fileUpload } = require('../utility/fileUpload');

router.post('/upload', fileUpload.single('image'), uploadProduct);
router.post('/search', searchProducts);
router.get('/', getProducts);
router.get('/:productId', getProduct);

module.exports = router;