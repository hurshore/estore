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

module.exports = {
  uploadProduct
}