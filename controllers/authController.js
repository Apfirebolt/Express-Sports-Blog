const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const passport = require("passport");

// Load User Model
require("../models/User");
const User = mongoose.model("User");

// User Login Route
exports.getLoginForm = (req, res) => {
  res.render("pages/auth/login");
};

// User Register Route
exports.getRegisterForm = (req, res) => {
  res.render("pages/auth/register");
};

// Login Form POST
exports.loginUser = (req, res, next) => {
  try {
    passport.authenticate("local", {
      successRedirect: "/category",
      failureRedirect: "/auth/login",
      failureFlash: true,
    })(req, res, next);
  } catch (err) {
    console.log("Error is ", err);
  }
};

// Register Form POST
exports.registerUser = (req, res) => {
  let errors = [];

  if (req.body.password != req.body.password2) {
    errors.push({ text: "Passwords do not match" });
  }

  if (req.body.password.length < 4) {
    errors.push({ text: "Password must be at least 4 characters" });
  }

  if (errors.length > 0) {
    res.render("pages/auth/register", {
      errors: errors,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      password2: req.body.password2,
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
                res.redirect("/users/login");
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
  res.redirect("/users/login");
};
