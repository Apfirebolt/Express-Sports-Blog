const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const moment = require("moment");

// Load Blog Model
require("../models/Category");
const Category = mongoose.model("Category");

// Create Category Form
exports.getCreateCategoryForm = (req, res) => {
  res.render("pages/category/create", {
    errors: [],
  });
};

// Update Category Form
exports.getUpdateCategoryForm = (req, res) => {
  try {
    Category.findOne({
      createdBy: req.user._id,
      _id: req.params.categoryId,
    }).then((category) => {
      if (category) {
        res.render("pages/category/update", {
          category,
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

// Confirm Delete Category
exports.getDeleteCategory = (req, res) => {
  try {
    Category.findOne({
      createdBy: req.user._id,
      _id: req.params.categoryId,
    }).then((category) => {
      if (category) {
        res.render("pages/category/confirmDelete", {
          category,
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

// Create Category Form POST
exports.createCategory = (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    const fieldErrors = [];
    errors.errors.forEach((item) => fieldErrors.push(item.msg));
    return res.render("pages/category/create", {
      errors: fieldErrors,
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
            .then((category) => {
              req.flash("success_msg", "Category created successfully.");
              res.redirect("/category");
            });
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
};

// Detail Category
exports.detailCategory = (req, res) => {
  Category.findOne({
    createdBy: req.user._id,
    _id: req.params.categoryId,
  }).then((category) => {
    res.render("pages/category/detail", {
      category,
    });
  });
};

// List Category, add query params for pagination
exports.listCategory = (req, res) => {
  const itemsPerPage = 2;
  const startPage = req.query.page || 1;
  Category.find({ createdBy: req.user._id })
    .skip(itemsPerPage * startPage - itemsPerPage)
    .limit(itemsPerPage)
    .exec(function (err, categories) {
      Category.countDocuments().exec(function (err, count) {
        if (err) return next(err);
        res.render("pages/category/list", {
          categories,
          moment,
          errors: [],
          itemsPerPage,
          startPage,
          lastPage: Math.ceil(count / itemsPerPage),
        });
      });
    });
};

// Post Confirm Delete Category
exports.deleteCategory = (req, res) => {
  Category.findOneAndDelete(
    { createdBy: req.user._id, _id: req.params.categoryId },
    {
      useFindAndModify: false,
    }
  ).then((isDeleted) => {
    if (isDeleted) {
      req.flash("success_msg", "Category successfully deleted.");
      res.redirect("/category");
    }
  });
};

// Post Update Category
exports.updateCategory = async (req, res) => {
  if (!req.body.name) {
    req.flash("error_msg", "Category name is required.");
    res.redirect("/category");
  } else {
    Category.findOneAndUpdate(
      {
        createdBy: req.user._id,
        _id: req.params.categoryId,
      },
      { name: req.body.name },
      {
        useFindAndModify: false,
      }
    ).then((isUpdated) => {
      if (isUpdated) {
        req.flash("success_msg", "Category successfully updated.");
        res.redirect("/category");
      }
    });
  }
};
