const mongoose = require("mongoose");

// Load Blog Model
require("../models/Category");
require("../models/User");
const Category = mongoose.model("Category");

// Create Category Form
exports.getCreateCategoryForm = (req, res) => {
  res.render("pages/category/create");
};

// Update Category Form
exports.getUpdateCategoryForm = (req, res) => {
  res.render("pages/category/update");
};

// Create Category Form POST
exports.createCategory = (req, res) => {
  let errors = [];

  if (!req.body.name) {
    errors.push({ text: "Blog Category cannot be empty" });
  }

  if (errors.length > 0) {
    res.render("pages/auth/register", {
      errors: errors,
      name: req.body.name,
    });
  } else {
    try {
      Category.findOne({ name: req.body.name }).then((category) => {
        if (category) {
          req.flash("error_msg", "Category already created by user.");
          res.redirect("/category");
        } else {
          new Category({
            name: req.body.name,
            createdBy: req.user._id,
          })
          .save()
          .then(category => {
            req.flash('success_msg', 'Category created successfully.');
            res.redirect('/category');
          })
        }
      });
      
    } catch (err) {
      console.log(err);
    }
  }
};

// Detail Category
exports.detailCategory = (req, res) => {
  Category.find({ createdBy: req.user._id, _id: req.params.categoryId }).then((category) => {
    res.render("pages/category/detail", {
      category,
    });
  });
};

// List Category
exports.listCategory = (req, res) => {
  
  Category.find({ createdBy: req.user._id }).then((categories) => {
    res.render("pages/category/list", {
      categories,
    });
  });
};
