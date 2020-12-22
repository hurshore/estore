const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const app = express();
dotenv.config();

// Connect to the database
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log('Connected to db');
  app.listen(5000, () => {
    console.log('Server up and running');
  })
});

app.use(express.json());

// Route middleware
app.use('/api/user', authRoutes);
app.use('/api/products', productRoutes);