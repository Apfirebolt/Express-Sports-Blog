const mongoose = require("mongoose");
const moment = require("moment");

// Load User Model
require("../models/User");
const User = mongoose.model("User");

// Detail User
exports.detailUser = (req, res) => { 
  User.findOne({
    createdBy: req.user._id,
    username: req.params.username,
  }).then((user) => {
    res.render("pages/users/detail", {
      user,
    });
  });
};

// List User, add query params for pagination
exports.listUser = (req, res) => {
  const itemsPerPage = 6;
  const startPage = req.query.page || 1;
  User.find()
    .skip(itemsPerPage * startPage - itemsPerPage)
    .limit(itemsPerPage)
    .exec(function (err, users) {
      User.countDocuments().exec(function (err, count) {
        if (err) return next(err);
        res.render("pages/users/list", {
          users,
          moment,
          errors: [],
          itemsPerPage,
          startPage,
          lastPage: Math.ceil(count / itemsPerPage),
        });
      });
    });
};


