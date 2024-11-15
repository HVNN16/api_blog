const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController');

// Route to display all posts and render the management page
router.get('/', PostController.managePosts);

// Route to get all posts in JSON format (API endpoint)
router.get('/api', PostController.getAllPostsJson);

// Route to get form for adding a new post
router.get('/add', PostController.addNewPostForm);

// Route to add a new post to the database
router.post('/add', PostController.addNewPost);

// Route to get form for editing a post
router.get('/edit/:id', PostController.editPostForm);

// Route to update a post in the database
router.post('/edit/:id', PostController.editPost);

// Route to delete a post from the database
router.post('/delete/:id', PostController.deletePost);

module.exports = router;
