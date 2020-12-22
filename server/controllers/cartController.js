const Cart = require('../models/Cart');

const addToCart = async (req, res) => {
  // Check if user has an existing cart
  const cart = await Cart.findOne({ user: req.body.user });
  if(cart) {
    const updatedCart = await Cart.updateOne({ _id: cart._id }, {
      quantity: cart.quantity + req.body.quantity,
      total: cart.total + (req.body.price * req.body.quantity),
      products: [
        ...cart.products,
        {
          ...req.body
        }
      ]
    })
    return res.send(req.body);
  }

  // Create a new cart if there isn't an existing cart
  const newCart = new Cart({
    user: req.body.user,
    quantity: req.body.quantity,
    total: req.body.price * req.body.quantity,
    products: [
      {
        name: req.body.productName,
        price: req.body.price,
        img: req.body.img,
        quantity: req.body.quantity
      }
    ]
  });

  try {
    const savedProduct = await newCart.save();
    res.send(savedProduct);
  } catch(err) {
    res.status(500).send(err);
  }
}

module.exports = { addToCart }