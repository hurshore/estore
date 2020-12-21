const { signupValidation } = require('../utility/validation');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
  // Validate request body
  const {error} = signupValidation(req.body);
  if(error) return res.status(400).send({ error: error.details[0].message });

  //Check if user exists
  const user = await User.findOne({ email: req.body.email });
  if(user) return res.status(400).send({ error: 'Email already exists' });

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create new user
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  })

  try {
    // Save new user to database
    const savedUser = await newUser.save()
    res.send({ user: user._id });
  } catch(err) {
    res.status(500).send('Something went wrong');
  }
}

module.exports = {
  signup
}