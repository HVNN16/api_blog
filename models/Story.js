const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  id: { 
    type: Number, 
    unique: true,
    required: true,
  },
  name: { 
    type: String, 
    required: true 
  },
  imageFileName: { 
    type: String, 
    required: true 
  },
  iconFileName: { 
    type: String, 
    required: true 
  },
  isViewed: { 
    type: Boolean, 
    required: true,
    default: false  // Set default to false if not provided
  }
});

storySchema.pre('save', async function (next) {
  if (this.isNew && !this.id) {  
    const lastStory = await this.constructor.findOne().sort('-id');  // Tìm story có id lớn nhất
    this.id = lastStory ? lastStory.id + 1 : 1;  // Nếu không có story nào, gán id = 1
  }
  next();
});
  // Proceed with saving


module.exports = mongoose.model('Story', storySchema);
