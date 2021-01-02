const Cart = require('../models/Cart');

const getCart = async (req, res) => {
  // Find the user's cart
  const cart = await Cart.findOne({ user: req.user._id });
  if(!cart) return res.json({});

  res.json(cart);
}

const addToCart = async (req, res) => {
  // Check if user has an existing cart
  const cart = await Cart.findOne({ user: req.user._id });
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

    try {
      const updatedCart = await Cart.updateOne({ _id: cart._id }, {
        quantity: cart.quantity + req.body.quantity,
        total: cart.total + (req.body.price * req.body.quantity),
        products: newProducts
      })
      return res.json(req.body);
    } catch(err) {
      res.json(err);
    }
  }

  // Create a new cart if there isn't an existing cart
  const newCart = new Cart({
    user: req.user._id,
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
    res.json(savedProduct);
  } catch(err) {
    res.status(500).json(err);
  }
}

const batchAddToCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });
  if(cart) {
    let newProducts = [...cart.products];

    req.body.products.forEach(product => {
      const index = newProducts.findIndex(p => p._id === product._id);
      if(index > -1) {
        newProducts = newProducts.map(prod => {
          return prod._id !== product._id ?
          prod : { ...prod, quantity: prod.quantity + product.quantity }
        })
      } else {
        newProducts = [
          ...newProducts,
          {
            _id: product._id,
            name: product.name,
            price: product.price,
            img: product.img,
            quantity: product.quantity
          }
        ]
      }
    })

    try {
      await Cart.updateOne({ _id: cart._id }, {
        quantity: cart.quantity + req.body.quantity,
        total: cart.total + req.body.total,
        products: newProducts
      })
      return res.json(req.body);
    } catch(err) {
      res.json(err);
    }
  }

  // Create a new cart if there isn't an existing cart
  const newCart = new Cart({
    user: req.user._id,
    quantity: req.body.quantity,
    total: req.body.total,
    products: req.body.products
  });

  try {
    const savedProduct = await newCart.save();
    res.json(savedProduct);
  } catch(err) {
    res.status(500).json(err);
  }
}

// Reduce product quantity in cart;
const deleteFromCart = async (req, res) => {
  // Find the user's cart
  const cart = await Cart.findOne({ user: req.user._id })
  if(!cart) {
    return res.status(400).json('You do not have a cart');
  }

  // Find product in cart
  const productToDelete = cart.products.find(product => product._id === req.body.productId);
  if(!productToDelete) return res.status(400).json('Product not found in cart');
  const productQuantity = productToDelete.quantity;
  const productPrice = productToDelete.price;

  let newProducts;
  if(productQuantity < req.body.quantity) {
    return res.status(400).json('Not enough items in cart');
  } else if(productQuantity === req.body.quantity) {
    newProducts = cart.products.filter(product => product._id !== req.body.productId);
  } else {
    newProducts = cart.products.map(product => product._id !== req.body.productId ?
      product : { ...product, quantity: product.quantity - req.body.quantity }  
    )
  }
  
  // Update the cart
  await Cart.updateOne({ _id: cart._id }, {
    quantity: cart.quantity - req.body.quantity,
    total: cart.total - (productPrice * req.body.quantity),
    products: newProducts
  })
  
  res.json('Product deleted successfully');
}

// Clear product from cart
const clearFromCart = async (res, req) => {
  const cart = await Cart.findOne({ user: req.user._id })
  if(!cart) {
    return res.status(400).json('You do not have a cart');
  }

  // Find product in cart
  const productToDelete = cart.products.find(product => product._id === req.body.productId);
  if(!productToDelete) return res.status(400).json('Product not found in cart');

  let newProducts;
  newProducts = cart.products.filter(product => product._id !== productToDelete._id);

  // Update the cart
  await Cart.updateOne({ _id: cart._id }, {
    quantity: cart.quantity - productToDelete.quantity,
    total: cart.total - (productToDelete.price * productToDelete.quantity),
    products: newProducts
  })
  
  res.json('Product cleared successfully');
}

module.exports = { addToCart, batchAddToCart, deleteFromCart, clearFromCart, getCart }