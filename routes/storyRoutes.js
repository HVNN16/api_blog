// routes/storyRoutes.js
const express = require('express');
const router = express.Router();
const Story = require('../models/Story');

// Lấy danh sách tất cả stories
router.get('/', async (req, res) => {
  try {
    const stories = await Story.find();
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Thêm mới một story
router.post('/', async (req, res) => {
  const story = new Story(req.body);
  try {
    const savedStory = await story.save();
    res.status(201).json(savedStory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Cập nhật một story theo ID
router.put('/:id', async (req, res) => {
  try {
    const updatedStory = await Story.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedStory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Xóa một story theo ID
router.delete('/:id', async (req, res) => {
  try {
    await Story.findByIdAndDelete(req.params.id);
    res.json({ message: 'Story deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
