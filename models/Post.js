// models/Post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  caption: { type: String, required: true },
  likes: { type: String, required: true },
  time: { type: String, required: true },
  isBookmarked: { type: Boolean, required: true },
  imageFileName: { type: String, required: true },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
