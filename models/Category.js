// models/Category.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageFileName: { type: String, required: true },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
