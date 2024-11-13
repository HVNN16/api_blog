const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  name: { type: String, required: true },
  imageFileName: { type: String, required: true },
  iconFileName: { type: String, required: true },
  isViewed: { type: Boolean, required: true }
});


storySchema.pre('save', async function (next) {
  if (this.isNew && !this.id) {  
    const lastStory = await this.constructor.findOne().sort('-id');  
    this.id = lastStory ? lastStory.id + 1 : 1;  
  }
  next();
});

module.exports = mongoose.model('Story', storySchema);
