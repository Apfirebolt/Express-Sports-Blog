const express = require('express');
const router = express.Router();

const { ensureAuthenticated } = require('../helpers/auth');

const {
  detailUser,
  listUser,
} = require('../controllers/userController.js');

router.route('/:username')
  .get(ensureAuthenticated, detailUser)
router.route('/')
  .get(ensureAuthenticated, listUser)

module.exports = router;
