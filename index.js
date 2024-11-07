// index.js
require('dotenv').config(); // Load environment variables
const categoriesRouter = require('./routes/categories');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const postsRoutes = require('./routes/postsRoutes');  
const storyRoutes = require('./routes/storyRoutes'); 

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Kết nối tới MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 20000, // Thời gian timeout 20 giây
  })
  .then(() => console.log("Kết nối thành công tới MongoDB"))
  .catch((err) => console.error("Lỗi kết nối MongoDB:", err));

// Sử dụng storyRoutes cho đường dẫn /stories
app.use('/stories', storyRoutes);

// Sử dụng storyRoutes cho đường dẫn /categories
app.use('/categories', categoriesRouter);

// Sử dụng storyRoutes cho đường dẫn /posts
app.use('/posts', postsRoutes);  

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
