const model = require("../models/Cart");
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('auth-token');
  if(!token) return res.status(401).send('Unauthorized');
  
  try {
    const verified = jwt.decode(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch(err) {
    res.status(400).send('Invalid token');
  }
}