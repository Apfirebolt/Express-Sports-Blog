const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const {
  getLoginForm,
  getRegisterForm,
  logOut,
  loginUser,
  registerUser
} = require('../controllers/authController.js');

router.route('/register')
  .get(getRegisterForm)
  .post([
    body('email', 'Email field is required').notEmpty(),
    body('first_name', 'First Name field is required').notEmpty(),
    body('last_name', 'Last Name field is required').notEmpty(),
    body('password', 'Password field is required').notEmpty(),
  ], registerUser)
router.route('/login')
  .get(getLoginForm)
  .post([
    body('email', 'Email field is required').notEmpty(),
    body('password', 'Password field is required').notEmpty(),
  ], loginUser)
router.route('/logout')
  .get(logOut)

module.exports = router;
