// controllers/CategoryController.js
const Category = require('../models/Category');

// Hiển thị tất cả các categories và render trang quản lý categories
const manageCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.render('manageCategory', { categories });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy form để thêm một category mới
const addNewCategoryForm = (req, res) => {
  res.render('addCategory');  // Render form thêm category mới
};

// Thêm category mới vào cơ sở dữ liệu
const addNewCategory = async (req, res) => {
  try {
    const { title, imageFileName } = req.body;

    const newCategory = new Category({
      title,
      imageFileName,
    });

    await newCategory.save();  // Lưu category mới
    res.redirect('/categories');  // Chuyển đến trang quản lý categories
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy form để chỉnh sửa một category
const editCategoryForm = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.render('editCategory', { category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Chỉnh sửa category trong cơ sở dữ liệu
const editCategory = async (req, res) => {
  try {
    const { title, imageFileName } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { title, imageFileName },
      { new: true }
    );
    res.redirect('/categories');  // Chuyển đến trang quản lý categories
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Xóa category khỏi cơ sở dữ liệu
const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.redirect('/categories');  // Chuyển đến trang quản lý categories
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy tất cả categories dưới dạng JSON
const getCategoriesJson = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);  // Trả về categories dưới dạng JSON
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  manageCategories,
  addNewCategoryForm,
  addNewCategory,
  editCategoryForm,
  editCategory,
  deleteCategory,
  getCategoriesJson,  // Export the new function
};
