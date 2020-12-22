const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  starrating: {
    type: Number,
    required: true
  }
})

const model = mongoose.model('Product', schema);

module.exports = model;