// routes/categories.js
const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');

// Route để hiển thị tất cả categories và trang quản lý
router.get('/', CategoryController.manageCategories);

// Route để lấy form thêm category mới
router.get('/add', CategoryController.addNewCategoryForm);

// Route để thêm category mới vào cơ sở dữ liệu
router.post('/add', CategoryController.addNewCategory);

// Route để lấy form chỉnh sửa một category
router.get('/edit/:id', CategoryController.editCategoryForm);

// Route để cập nhật category trong cơ sở dữ liệu
router.post('/edit/:id', CategoryController.editCategory);

// Route để xóa một category khỏi cơ sở dữ liệu
router.post('/delete/:id', CategoryController.deleteCategory);

module.exports = router;
