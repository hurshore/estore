const Product = require('../models/Product');

// Upload a product to db
const uploadProduct = async (req, res) => {
  const product = new Product(req.body);

  try {
    const savedProduct = await product.save();
    res.send(savedProduct);
  } catch(err) {
    res.status(400).send('Bad Request');
  }
}

// Get all products from db
const getProducts = async(req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch(err) {
    res.status(500).send('Something went wrong');
  }
}

// Get a single product from db
const getProduct = async(req, res) => {
  try {
    const products = await Product.findOne({ _id: req.params.productId })
    res.send(products);
  } catch(err) {
    res.status(500).send(err);
  }
}

module.exports = {
  uploadProduct,
  getProducts,
  getProduct
}