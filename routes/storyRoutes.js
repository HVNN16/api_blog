const express = require('express');
const router = express.Router();
const Story = require('../models/Story');

// GET: Manage stories page
router.get('/', async (req, res) => {
  try {
    const stories = await Story.find();
    res.render('manageStory', { stories });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET: Form to add a new story
router.get('/add', (req, res) => {
  res.render('addStory');
});

// POST: Add new story
router.post('/', async (req, res) => {
  const { name, imageFileName, iconFileName, isViewed } = req.body;

  const newStory = new Story({
    name,
    imageFileName,
    iconFileName,
    isViewed: isViewed === 'on',  // Convert "on" to true
  });

  try {
    await newStory.save();
    res.redirect('/stories');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET: Edit story form
router.get('/edit/:id', async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }
    res.render('editStory', { story });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST: Update a story
router.post('/edit/:id', async (req, res) => {
  const { name, imageFileName, iconFileName, isViewed } = req.body;

  try {
    const updatedStory = await Story.findByIdAndUpdate(
      req.params.id, 
      { name, imageFileName, iconFileName, isViewed: isViewed === 'on' },
      { new: true }
    );
    res.redirect('/stories');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE: Delete a story
router.get('/delete/:id', async (req, res) => {
  try {
    await Story.findByIdAndDelete(req.params.id);
    res.redirect('/stories');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
