// routes/categories.js
const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// Lấy danh sách tất cả categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find(); // Get all categories from the database
    res.json(categories); // Send the categories as a JSON response
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle errors
  }
});

// Thêm mới một category
router.post('/', async (req, res) => {
  const category = new Category(req.body); // Create a new category instance from the request body
  try {
    const savedCategory = await category.save(); // Save the new category to the database
    res.status(201).json(savedCategory); // Send back the saved category with a 201 status
  } catch (error) {
    res.status(400).json({ message: error.message }); // Handle errors (e.g. validation errors)
  }
});

// Cập nhật một category theo ID
router.put('/:id', async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Update category by ID
    res.json(updatedCategory); // Send back the updated category
  } catch (error) {
    res.status(400).json({ message: error.message }); // Handle errors (e.g. invalid data)
  }
});

// Xóa một category theo ID
router.delete('/:id', async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id); // Delete the category by ID
    res.json({ message: 'Category deleted' }); // Send success message
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle errors
  }
});

module.exports = router;
