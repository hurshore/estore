const express = require('express');
const router = express.Router();
const { uploadProduct, getProducts, getProduct } = require('../controllers/productController');
const { fileUpload } = require('../utility/fileUpload');

router.post('/upload', fileUpload.single('image'), uploadProduct);
router.get('/', getProducts);
router.get('/:productId', getProduct);

module.exports = router;