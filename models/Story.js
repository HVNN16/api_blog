const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  id: { 
    type: Number, 
    unique: true,  // Chắc chắn rằng id là duy nhất
    required: false,  // Không yêu cầu trực tiếp, vì bạn sẽ tự động gán
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

// Tự động gán id khi lưu story mới
storySchema.pre('save', async function (next) {
  if (this.isNew && this.id === undefined) {  // Nếu không có id, gán id mới
    const lastStory = await this.constructor.findOne().sort('-id');  // Tìm story có id lớn nhất
    this.id = lastStory ? lastStory.id + 1 : 1;  // Nếu không có story nào, gán id = 1
  }
  next();  // Tiến hành lưu story
});

module.exports = mongoose.model('Story', storySchema);
