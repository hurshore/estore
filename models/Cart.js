const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  quantity: {
    type: Number,
    required: true
  },
  products: {
    type: Array,
    required: true,
  },
  user: {
    type: String,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
})

const model = mongoose.model('Cart', schema);

module.exports = model;