// controllers/storyController.js
const Story = require('../models/Story');

// Get all stories and render the manage stories page
const manageStories = async (req, res) => {
  try {
    const stories = await Story.find();
    res.render('manageStory', { stories });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get the form to add a new story
const addNewStoryForm = (req, res) => {
  res.render('addStory');  // Render the form to add a new story
};

// Add a new story to the database
const addNewStory = async (req, res) => {
    try {
      const { name, imageFileName, iconFileName, isViewed } = req.body;
  
      // Convert the 'on' value of the checkbox to true or false
      const newStory = new Story({
        name,
        imageFileName,
        iconFileName,
        isViewed: isViewed === 'on',  // Convert 'on' to true, otherwise false
      });
  
      await newStory.save();  // Save the story
      res.redirect('/stories');  // Redirect to manage stories page after adding
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Get the form to edit a story
const editStoryForm = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }
    res.render('editStory', { story });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Edit a story in the database
const editStory = async (req, res) => {
  try {
    const { name, imageFileName, iconFileName, isViewed } = req.body;
    const updatedStory = await Story.findByIdAndUpdate(
      req.params.id, 
      {
        name,
        imageFileName,
        iconFileName,
        isViewed: isViewed === 'on',  // Convert "on" to true for checkbox
      }, 
      { new: true }  // Return the updated story
    );
    res.redirect('/stories');  // Redirect to manage stories page after updating
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a story from the database
const deleteStory = async (req, res) => {
  try {
    await Story.findByIdAndDelete(req.params.id);
    res.redirect('/stories');  // Redirect to manage stories page after deletion
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  manageStories,
  addNewStoryForm,
  addNewStory,
  editStoryForm,
  editStory,
  deleteStory,
};
