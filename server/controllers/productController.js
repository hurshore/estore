const Product = require('../models/Product');

// Upload a product to db
const uploadProduct = async (req, res) => {
  const product = new Product(req.body);

  try {
    const savedProduct = await product.save();
    res.json(savedProduct);
  } catch(err) {
    res.status(400).json('Bad Request');
  }
}

// Get all products from db
const getProducts = async(req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch(err) {
    res.status(500).json('Something went wrong');
  }
}

// Get a single product from db
const getProduct = async(req, res) => {
  try {
    const products = await Product.findOne({ _id: req.params.productId })
    res.json(products);
  } catch(err) {
    res.status(500).json(err);
  }
}

module.exports = {
  uploadProduct,
  getProducts,
  getProduct
}