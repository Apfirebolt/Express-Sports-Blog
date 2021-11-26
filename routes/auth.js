const express = require('express');
const router = express.Router()

const {
  getLoginForm,
  getRegisterForm,
  logOut,
  loginUser,
  registerUser
} = require('../controllers/authController.js');

router.route('/register', )
  .get(getRegisterForm)
  .post(registerUser);
router.route('/login')
  .post(loginUser)
  .get(getLoginForm);
router
  .route('/logout')
  .get(logOut)

exports.router = router;
