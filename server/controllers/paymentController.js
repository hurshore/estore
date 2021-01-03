const stripe = require("stripe")(process.env.STRIPE_SK_TEST);
const Cart = require('../models/Cart');

const calculateOrderAmount = async () => {
  // Find the user's cart
  const cart = await Cart.findOne({ user: req.user._id });
  if(!cart) return res.status(400).json({ error: 'Your cart is empty' });
  
  return cart.total;
};

const createPaymentIntent = async (req, res) => {
  const { items } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd"
  });
  res.send({
    clientSecret: paymentIntent.client_secret
  });
}

module.exports = { createPaymentIntent };