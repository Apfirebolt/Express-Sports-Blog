const mongoose = require("mongoose");

// Load Blog Model
require("../models/Category");
require("../models/Post");
const Post = mongoose.model("Post");
const Category = mongoose.model("Category");

// Create Category Form
exports.getCreatePostForm = (req, res) => {
  try {
    Category.find({
      createdBy: req.user._id,
    }).then((categories) => {
      if (categories) {
        res.render("pages/post/create", {
          categories,
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

// Update Post Form
exports.getUpdatePostForm = async (req, res) => {
  try {
    const categories = await Category.find({});
    const post = await Post.findOne({
      _id: req.params.postId
    })
    res.render("pages/post/update", {
      categories,
      post,
    });
  } catch (err) {
    console.log(err);
  }
};

// Confirm Delete Post
exports.getDeletePost = (req, res) => {
  try {
    Post.findOne({
      _id: req.params.postId,
    }).then((post) => {
      if (post) {
        res.render("pages/post/confirmDelete", {
          post,
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

// Create Category Form POST
exports.createPost = (req, res) => {
  let errors = [];

  if (!req.body.title) {
    errors.push({ text: "Post Title cannot be empty" });
  }

  if (!req.body.description) {
    errors.push({ text: "Post Description cannot be empty" });
  }

  if (errors.length > 0) {
    res.render("pages/post/create", {
      errors: errors,
      title: req.body.title,
      description: req.body.description
    });
  } else {
    try {
      new Post({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
      })
        .save()
        .then((post) => {
          req.flash("success_msg", "Post created successfully.");
          res.redirect("/category");
        });
    } catch (err) {
      console.log(err);
    }
  }
};

// List Post
exports.listPost = (req, res) => {
  Post.find().then((posts) => {
    res.render("pages/post/list", {
      posts,
    });
  });
};

// Update Single Post
exports.updatePost = (req, res) => {
  Post.findOneAndUpdate(
    { _id: req.params.postId },
    { 
      title: req.body.title,
      description: req.body.description,
      category: req.body.category 
    },
    {
      useFindAndModify: false,
    }
  ).then((isUpdated) => {
    if (isUpdated) {
      req.flash("success_msg", "Post successfully updated.");
      res.redirect("/post");
    }
  });
};


// Delete Single Post
exports.deletePost = (req, res) => {
  Post.findOneAndDelete(
    { _id: req.params.postId },
    {
      useFindAndModify: false,
    }
  ).then((isDeleted) => {
    if (isDeleted) {
      req.flash("success_msg", "Post successfully deleted.");
      res.redirect("/post");
    }
  });
};

// Details of Single Post
exports.detailPost = (req, res) => {
  try {
    Post.findOne({
      _id: req.params.postId,
    }).then((post) => {
      if (post) {
        res.render("pages/post/detail", {
          post,
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};