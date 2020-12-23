const Cart = require('../models/Cart');

const addToCart = async (req, res) => {
  // Check if user has an existing cart
  const cart = await Cart.findOne({ user: req.body.user });
  if(cart) {
    let newProducts;
    // Check if product already exists in the cart
    const index = await cart.products.findIndex(product => product._id === req.body.productId);
    if(index > -1) {
      // Increase product quantity in cart
      newProducts = cart.products.map(product => product._id !== req.body.productId ?
        product : { ...product, quantity: product.quantity + req.body.quantity }
      )
    } else {
      // Add a new product to the cart
      newProducts = [
        ...cart.products,
        {
          _id: req.body.productId,
          name: req.body.productName,
          price: req.body.price,
          img: req.body.img,
          quantity: req.body.quantity
        }
      ]
    }
    
    const updatedCart = await Cart.updateOne({ _id: cart._id }, {
      quantity: cart.quantity + req.body.quantity,
      total: cart.total + (req.body.price * req.body.quantity),
      products: newProducts
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
        _id: req.body.productId,
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