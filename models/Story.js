const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  imageFileName: { type: String, required: true },
  iconFileName: { type: String, required: true },
  isViewed: { type: Boolean, required: true },
});

module.exports = mongoose.model('Story', storySchema);
