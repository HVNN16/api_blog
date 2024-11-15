// routes/posts.js
const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController');

// Route để hiển thị tất cả posts và trang quản lý
router.get('/', PostController.managePosts);

// Route để lấy form thêm post mới
router.get('/add', PostController.addNewPostForm);

// Route để thêm post mới vào cơ sở dữ liệu
router.post('/add', PostController.addNewPost);

// Route để lấy form chỉnh sửa post
router.get('/edit/:id', PostController.editPostForm);

// Route để cập nhật post trong cơ sở dữ liệu
router.post('/edit/:id', PostController.editPost);

// Route để xóa post khỏi cơ sở dữ liệu
router.post('/delete/:id', PostController.deletePost);

module.exports = router;
