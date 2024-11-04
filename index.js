// index.js
require('dotenv').config(); // Load environment variables

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Story = require('./models/Story');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB using the connection string from .env
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.get('/stories', async (req, res) => {
  try {
    const stories = await Story.find();
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/stories', async (req, res) => {
  const story = new Story(req.body);
  try {
    const savedStory = await story.save();
    res.status(201).json(savedStory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/stories/:id', async (req, res) => {
  try {
    const updatedStory = await Story.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedStory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/stories/:id', async (req, res) => {
  try {
    await Story.findByIdAndDelete(req.params.id);
    res.json({ message: 'Story deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
