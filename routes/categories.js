// routes/categories.js
const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');

// Route to display all categories and management page (HTML page)
router.get('/', CategoryController.manageCategories);

// Route to get all categories in JSON format
router.get('/api', CategoryController.getCategoriesJson);  // This will serve the JSON data

// Route to get the form for adding a new category
router.get('/add', CategoryController.addNewCategoryForm);

// Route to add a new category to the database
router.post('/add', CategoryController.addNewCategory);

// Route to get the form for editing a category
router.get('/edit/:id', CategoryController.editCategoryForm);

// Route to update a category in the database
router.post('/edit/:id', CategoryController.editCategory);

// Route to delete a category from the database
router.post('/delete/:id', CategoryController.deleteCategory);

module.exports = router;
