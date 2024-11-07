// routes/postsRoutes.js
const express = require('express');
const router = express.Router();
const Post = require('../models/Post.js');

// Lấy danh sách tất cả posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();  // Assuming you have a Post model and database setup
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Thêm mới một post
router.post('/', async (req, res) => {
  const post = new Post(req.body);
  try {
    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Cập nhật một post theo ID
router.put('/:id', async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Xóa một post theo ID
router.delete('/:id', async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
