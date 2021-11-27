const express = require('express');
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
  .post(registerUser)
router.route('/login')
  .get(getLoginForm)
  .post(loginUser)
router.route('/logout')
  .get(logOut)

module.exports = router;
