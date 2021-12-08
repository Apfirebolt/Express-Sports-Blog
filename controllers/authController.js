const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const passport = require("passport");

// Load User Model
require("../models/User");
const User = mongoose.model("User");

// User Login Route
exports.getLoginForm = (req, res) => {
  res.render("pages/auth/login", {
    errors: [],
  });
};

// User Register Route
exports.getRegisterForm = (req, res) => {
  res.render("pages/auth/register", {
    errors: []
  });
};

// User Settings Route
exports.getSettingsForm = (req, res) => {
  User.findOne({
    _id: req.user._id,
  }).then((user) => {
    res.render("pages/auth/settings", {
      errors: [],
      user
    });
  });
};

// Login Form POST
exports.loginUser = (req, res, next) => {
  try {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      const fieldErrors = [];
      errors.errors.forEach((item) => fieldErrors.push(item.msg));
      return res.render("pages/auth/login", {
        errors: fieldErrors,
      });
    }
    console.log('Inside login function', errors);
    passport.authenticate("local", {
      successRedirect: "/category",
      failureRedirect: "/auth/login",
      failureFlash: true,
      successFlash: "You are successfully logged in",
    })(req, res, next);
  } catch (err) {
    console.log("Error is ", err);
  }
};

// Register Form POST
exports.registerUser = (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    const fieldErrors = [];
    errors.errors.forEach((item) => fieldErrors.push(item.msg));
    return res.render("pages/auth/register", {
      errors: fieldErrors,
    });
  } else {
    User.findOne({ email: req.body.email }).then((user) => {
      if (user) {
        req.flash("error_msg", "Email already exists.");
        res.redirect("/auth/register");
      } else {
        const newUser = new User({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          password: req.body.password,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                req.flash(
                  "success_msg",
                  "You are now registered and can log in"
                );
                res.redirect("/auth/login");
              })
              .catch((err) => {
                console.log(err);
                return;
              });
          });
        });
      }
    });
  }
};

// Logout User
exports.logOut = (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/auth/login");
};

// Update user settings
exports.updateSettings = async (req, res) => {
  User.findOne({
    _id: req.user._id
  })
  .then(user => {
    // new values
    user.email = req.body.email || user.email;
    user.first_name = req.body.first_name || user.first_name;
    user.last_name = req.body.last_name || user.last_name;
    user.save()
      .then(user => {
        req.flash('success_msg', 'User settings successfully updated');
        res.redirect('/auth/settings');
      })
  });
};

// Update user password
exports.updatePassword = async (req, res) => {
  const errors = [];
  if (req.body.password !== req.body.password2) {
    errors.push("Confirm password is not same as the password.");
  }
  if (errors.length > 0) {
    res.render("pages/auth/settings", {
      errors: errors,
    });
  } else {
    User.findOne({
      _id: req.user._id
    })
    .then(user => {
      // update password and call save method
      user.password = req.body.password
      user.save()
        .then(user => {
          req.flash('success_msg', 'User password successfully changed');
          res.redirect('/auth/settings');
        })
    });
  }
};

// Update user profile picture
exports.updateProfilePicture = async (req, res) => {
  User.findOne({
    _id: req.user._id
  })
  .then(user => {
    // update profile image and call save method
    user.profile_picture = req.file.filename
    user.save()
      .then(user => {
        req.flash('success_msg', 'User profile picture successfully changed');
        res.redirect('/auth/settings');
      })
  });
};