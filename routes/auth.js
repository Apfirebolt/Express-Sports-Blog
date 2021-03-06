const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const {
  getLoginForm,
  getRegisterForm,
  getSettingsForm,
  logOut,
  loginUser,
  registerUser,
  updateSettings,
  updatePassword,
  updateProfilePicture
} = require('../controllers/authController.js');

const { ensureAuthenticated } = require('../helpers/auth');

const { profilePictureUpload } = require('../utils/file-upload');

router.route('/register')
  .get(getRegisterForm)
  .post([
    body('email', 'Email field is required').notEmpty().isEmail().withMessage('Must be a valid email address'),
    body('first_name', 'First Name field is required').notEmpty(),
    body('last_name', 'Last Name field is required').notEmpty(),
    body('password', 'Password field is required').notEmpty().isLength({min:4, max:16})
    .withMessage('Password must be between 4 to 16 characters'),
  ], registerUser)
router.route('/login')
  .get(getLoginForm)
  .post([
    body('email', 'Email field is required').notEmpty(),
    body('password', 'Password field is required').notEmpty(),
  ], loginUser)
router.route('/settings')
  .get(ensureAuthenticated, getSettingsForm)
  .post(ensureAuthenticated, updateSettings)
router.route('/change-password')
  .post(ensureAuthenticated, updatePassword)
router.route('/change-picture')
  .post(ensureAuthenticated, profilePictureUpload.single('file'), updateProfilePicture)
router.route('/logout')
  .get(ensureAuthenticated, logOut)

module.exports = router;
