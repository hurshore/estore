const model = require("../models/Cart");
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  // Check if there is a token in the header
  const token = req.header('auth-token');
  if(!token) return res.status(401).json('Unauthorized');
  
  try {
    // Verify the token
    const verified = await jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch(err) {
    res.status(400).json('Invalid token');
  }
}