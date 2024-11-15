const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Hiển thị danh sách người dùng
router.get('/manage', userController.manageUsers);

// Hiển thị form thêm người dùng
router.get('/add', userController.addUserForm);

// Thêm người dùng mới
router.post('/add', userController.addUser);

// Hiển thị form sửa người dùng
router.get('/edit/:id', userController.editUserForm);

// Cập nhật người dùng
router.post('/edit/:id', userController.editUser);

// Xóa người dùng
router.get('/delete/:id', userController.deleteUser);

module.exports = router;
