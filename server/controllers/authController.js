const { signupValidation, loginValidation } = require('../utility/validation');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const signup = async (req, res) => {
  // Validate request body
  const {error} = signupValidation(req.body);
  if(error) return res.status(400).send({ error: error.details[0].message });

  //Check if user exists with request email
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
    // Create a JWT
    const token = jwt.sign({ _id: newUser._id }, process.env.TOKEN_SECRET);
    res.send({ user: newUser._id, token });
  } catch(err) {
    res.status(500).send(err.message);
  }
}

const login = async (req, res) => {
  // Validate request body
  const {error} = loginValidation(req.body);
  if(error) return res.status(400).send({ error: error.details[0].message });

  // Check if user exists
  const user = await User.findOne({ email: req.body.email });
  if(!user) return res.status(400).send({ error: 'User does not exist' });

  // Check if password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if(!validPass) return res.status(401).send({ error: 'Incorrect password' });

  // Create a JWT
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header('auth-token', token).send(token);
}

module.exports = {
  signup,
  login
}