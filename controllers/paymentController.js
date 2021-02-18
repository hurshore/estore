const stripe = require("stripe")(process.env.STRIPE_SK_TEST);
const Cart = require('../models/Cart');

const calculateOrderAmount = async (uid, res) => {
  // Find the user's cart
  const cart = await Cart.findOne({ user: uid });
  if(!cart) return res.status(400).json({ error: 'Your cart is empty' });
  
  return cart.total;
};

const createPaymentIntent = async (req, res) => {
  // Create a PaymentIntent with the order amount and currency
  const amount = await calculateOrderAmount(req.user._id, res);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100,
    currency: "usd"
  });
  res.json({
    clientSecret: paymentIntent.client_secret
  });
}

module.exports = { createPaymentIntent };