const Product = require('../models/Product');

const uploadProduct = async (req, res) => {
  const product = new Product(req.body);

  try {
    const savedProduct = await product.save();
    res.send(savedProduct);
  } catch(err) {
    res.status(400).send('Bad Request');
  }
}

const getProducts = async(req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch(err) {
    res.status(500).send('Something went wrong');
  }
}

module.exports = {
  uploadProduct,
  getProducts
}