const User = require('../models/User');

// Hiển thị danh sách người dùng
exports.manageUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.render('manageUsers', { users });
  } catch (error) {
    res.status(500).send('Error retrieving users');
  }
};

// Hiển thị form thêm người dùng
exports.addUserForm = (req, res) => {
  res.render('addUser');
};

// Thêm người dùng mới
exports.addUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const newUser = new User({ username, password });
    await newUser.save();
    res.redirect('/users/manage');
  } catch (error) {
    res.status(500).send('Error adding user');
  }
};

// Hiển thị form sửa người dùng
exports.editUserForm = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.render('editUser', { user });
  } catch (error) {
    res.status(500).send('Error retrieving user');
  }
};

// Cập nhật thông tin người dùng
exports.editUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { username, password },
      { new: true }
    );
    res.redirect('/users/manage');
  } catch (error) {
    res.status(500).send('Error updating user');
  }
};

// Xóa người dùng
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.redirect('/users/manage');
  } catch (error) {
    res.status(500).send('Error deleting user');
  }
};
