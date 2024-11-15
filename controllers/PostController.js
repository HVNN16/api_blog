const Post = require('../models/Post');

// Hiển thị danh sách tất cả các posts và render trang quản lý
const managePosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.render('managePost', { posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy form để thêm post mới
const addNewPostForm = (req, res) => {
  res.render('addPost');
};

// Thêm post mới vào cơ sở dữ liệu
const addNewPost = async (req, res) => {
  try {
    const { id, title, caption, likes, time, isBookmarked, imageFileName } = req.body;

    const newPost = new Post({
      id,
      title,
      caption,
      likes,
      time,
      isBookmarked: isBookmarked === 'on',  // Chuyển 'on' thành true nếu checkbox được chọn
      imageFileName,
    });

    await newPost.save();
    res.redirect('/posts');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy form để chỉnh sửa post
const editPostForm = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.render('editPost', { post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Chỉnh sửa post trong cơ sở dữ liệu
const editPost = async (req, res) => {
  try {
    const { title, caption, likes, time, isBookmarked, imageFileName } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title,
        caption,
        likes,
        time,
        isBookmarked: isBookmarked === 'on',
        imageFileName,
      },
      { new: true }
    );
    res.redirect('/posts');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Xóa post khỏi cơ sở dữ liệu
const deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.redirect('/posts');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all posts as JSON (for API endpoint)
const getAllPostsJson = async (req, res) => {
  try {
    const posts = await Post.find();  // Retrieve all posts from the database
    res.json(posts);  // Return posts as a JSON response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  managePosts,       // Ensure this is properly defined and exported
  addNewPostForm,
  addNewPost,
  editPostForm,
  editPost,
  deletePost,
  getAllPostsJson,  // Make sure to export the new method
};
