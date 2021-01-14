const Product = require('../models/Product');

// Upload a product to db
const uploadProduct = async (req, res) => {
  const product = new Product({
    name: req.body.name,
    colors: req.body.colors,
    price: req.body.price,
    description: req.body.description,
    img: req.file.path,
    brand: req.body.brand,
    starrating: req.body.starrating
  });

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

// Search for products
const searchProducts = async(req, res) => {
  try {
    const data = await Product.aggregate([
      {
        $search: {
          "text": {
            "query": "mac",
            "path": "name"
          },
          "text": {
            "query": ""
          }
        }
      },
      {
        $limit: 5
      },
      {
        $project: {
          "_id": 0,
          "name": 1,
          "brand": 1,
          "description": 1
        }
      }
    ])
    res.json(data);
  } catch(err) {
    console.log(err);
    res.status(404).json({ error: err });
  }
}

module.exports = {
  uploadProduct,
  getProducts,
  getProduct,
  searchProducts
}