require('dotenv').config(); // Đọc biến môi trường từ file .env
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors'); // Thêm cors

const userRoutes = require('./routes/userRoutes'); // Route cho người dùng
const authRoutes = require('./routes/authRoutes');  // Route cho đăng nhập
const storyRoutes = require('./routes/storyRoutes'); // Route cho stories
const categoriesRouter = require('./routes/categories'); // Route cho categories
const postsRoutes = require('./routes/postsRoutes'); // Route cho posts

const app = express();
const PORT = process.env.PORT || 8080;

// Cấu hình CORS để cho phép tất cả các origin
app.use(cors());  // Bạn cũng có thể sử dụng cors(corsOptions) nếu cần cấu hình cụ thể

// Cấu hình middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware cho session
app.use(session({
  secret: process.env.SECRET_KEY, // Dùng secret key từ .env
  resave: false,
  saveUninitialized: true,
}));

// Middleware for parsing form data
app.use(express.urlencoded({ extended: true }));  // For form submissions
app.use(express.json());  // For JSON requests

// Cấu hình EJS và thư mục views
app.set('view engine', 'ejs');
app.set('views', './views');
// Cấu hình Express để phục vụ hình ảnh từ thư mục assets
app.use('/assets', express.static('assets')); // Dòng này sẽ phục vụ hình ảnh từ thư mục assets

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
app.use('/categories', categoriesRouter); // Route cho categories
app.use('/posts', postsRoutes); // Route cho posts
app.use('/users', userRoutes); // Route cho users
