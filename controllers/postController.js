const mongoose = require("mongoose");
const moment = require("moment");
const ObjectId = require("mongodb").ObjectID;
const fs = require("fs");
const path = require("path");

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
          errors: [],
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
      _id: req.params.postId,
      createdBy: req.user._id,
    });
    res.render("pages/post/update", {
      categories,
      post,
    });
  } catch (err) {
    console.log(err);
  }
};

// Add Image Form
exports.getAddImageForm = async (req, res) => {
  try {
    const post = await Post.findOne({
      _id: req.params.postId,
      createdBy: req.user._id,
    });
    res.render("pages/post/addImage", {
      post,
    });
  } catch (err) {
    console.log(err);
  }
};

// Delete Image Form
exports.getDeleteImageForm = async (req, res) => {
  try {
    const post = await Post.findOne({
      _id: req.params.postId,
      createdBy: req.user._id,
    });
    const selectedImage = post.pictures.find(
      (item) => item._id.toHexString() === req.params.imageId
    );
    res.render("pages/post/confirmDeleteImage", {
      post,
      image: selectedImage,
    });
  } catch (err) {
    console.log(err);
  }
};

// Add Video Form
exports.getAddVideoForm = async (req, res) => {
  try {
    const post = await Post.findOne({
      _id: req.params.postId,
      createdBy: req.user._id,
    });
    res.render("pages/post/addVideo", {
      post,
    });
  } catch (err) {
    console.log(err);
  }
};

// Delete Video Form
exports.getDeleteVideoForm = async (req, res) => {
  try {
    const post = await Post.findOne({
      _id: req.params.postId,
      createdBy: req.user._id,
    });
    res.render("pages/post/confirmDeleteVideo", {
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
      createdBy: req.user._id,
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
exports.createPost = async (req, res) => {
  let errors = [];

  if (!req.body.title) {
    errors.push("Post Title cannot be empty");
  }

  if (!req.body.description) {
    errors.push("Post Description cannot be empty");
  }

  if (errors.length > 0) {
    const categories = await Category.find({ createdBy: req.user._id });
    res.render("pages/post/create", {
      errors: errors,
      title: req.body.title,
      description: req.body.description,
      categories,
    });
  } else {
    try {
      new Post({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        createdBy: req.user._id,
      })
        .save()
        .then(() => {
          req.flash("success_msg", "Post created successfully.");
          res.redirect("/post");
        });
    } catch (err) {
      console.log(err);
    }
  }
};

// List Post
exports.listPost = (req, res) => {
  const itemsPerPage = 2;
  const startPage = req.query.page || 1;
  Post.find()
    .skip(itemsPerPage * startPage - itemsPerPage)
    .limit(itemsPerPage)
    .populate("category")
    .exec(function (err, posts) {
      Post.countDocuments().exec(function (err, count) {
        if (err) return next(err);
        res.render("pages/post/list", {
          posts,
          moment,
          errors: [],
          itemsPerPage,
          startPage,
          lastPage: Math.ceil(count / itemsPerPage),
        });
      });
    });
};

// Update Single Post
exports.updatePost = (req, res) => {
  if (!req.body.title || !req.body.description) {
    req.flash("error_msg", "Post Title and Description are required.");
    res.redirect("/post");
  } else {
    Post.findOneAndUpdate(
      {
        _id: req.params.postId,
        createdBy: req.user._id,
      },
      {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
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
  }
};

// Delete Single Post
exports.deletePost = (req, res) => {
  Post.findOneAndDelete(
    {
      _id: req.params.postId,
      createdBy: req.user._id,
    },
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
      createdBy: req.user._id,
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

// Add images to a single post
exports.addImage = (req, res) => {
  const newPicture = {
    title: req.body.title,
    name: req.file.filename,
  };
  Post.findOneAndUpdate(
    {
      _id: req.params.postId,
      createdBy: req.user._id,
    },
    { $push: { pictures: newPicture } },
    {
      useFindAndModify: false,
    }
  ).then((isUpdated) => {
    if (isUpdated) {
      req.flash("success_msg", "Image successfully added to the post.");
      res.redirect("/post");
    }
  });
};

// Delete Single Image from a post
exports.deleteImage = (req, res) => {
  Post.findOneAndUpdate(
    {
      _id: req.params.postId,
      createdBy: req.user._id,
    },
    { $pull: { pictures: { _id: ObjectId(req.params.imageId) } } },
    {
      useFindAndModify: false,
    }
  ).then((isUpdated) => {
    if (isUpdated) {
      selectedImage = isUpdated.pictures.find(
        (item) => item._id.toHexString() === req.params.imageId
      );
      const filePath = path.join(__dirname, `../uploads/${selectedImage.name}`);
      fs.unlink(filePath, (err) => {
        if (err) console.log(err);
      });
      req.flash("success_msg", "Image successfully deleted from the post.");
      res.redirect("/post");
    }
  });
};

// Add video to a single post
exports.addVideo = (req, res) => {
  Post.findOneAndUpdate(
    {
      _id: req.params.postId,
      createdBy: req.user._id,
    },
    { $set: { video: req.file.filename } },
    {
      useFindAndModify: false,
    }
  )
    .then((isUpdated) => {
      if (isUpdated) {
        req.flash("success_msg", "Video successfully added to the post.");
        res.redirect("/post");
      }
    })
    .catch((err) => {
      console.log("Error is ", err);
    });
};

// Delete video associated with Post
exports.deleteVideo = (req, res) => {
  Post.findOneAndUpdate(
    {
      _id: req.params.postId,
      createdBy: req.user._id,
    },
    { $set: { video: "" } },
    {
      useFindAndModify: false,
    }
  )
    .then((isUpdated) => {
      if (isUpdated) {
        const filePath = path.join(__dirname, `../uploads/${isUpdated.video}`);
        fs.unlink(filePath, (err) => {
          if (err) console.log(err);
        });
        req.flash("success_msg", "Video successfully deleted from the post.");
        res.redirect("/post");
      }
    })
    .catch((err) => {
      console.log("Error is ", err);
    });
};
