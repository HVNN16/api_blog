require('dotenv').config(); // Đọc biến môi trường từ file .env
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');

// Import các route
const authRoutes = require('./routes/authRoutes');  // Route cho đăng nhập
const storyRoutes = require('./routes/storyRoutes'); // Route cho stories
const categoriesRouter = require('./routes/categories'); // Route cho categories
const postsRoutes = require('./routes/postsRoutes'); // Route cho posts

const app = express();
const PORT = process.env.PORT || 8080;

// Cấu hình middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware cho session
app.use(session({
  secret: process.env.SECRET_KEY, // Dùng secret key từ .env
  resave: false,
  saveUninitialized: true,
}));

// Cấu hình EJS và thư mục views
app.set('view engine', 'ejs');
app.set('views', './views');

// Kết nối MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Kết nối thành công đến MongoDB');

    // Chỉ bắt đầu server khi kết nối thành công
    app.listen(PORT, () => {
      console.log(`Server đang chạy tại http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Lỗi kết nối MongoDB:', err);
  });

// Sử dụng các route đã khai báo
app.use('/', authRoutes); // Route cho đăng nhập
app.use('/stories', storyRoutes); // Route cho stories
app.use('/users', authRoutes); // Route cho stories
app.use('/categories', categoriesRouter); // Route cho categories
app.use('/posts', postsRoutes); // Route cho posts
