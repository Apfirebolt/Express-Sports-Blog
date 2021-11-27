const express = require('express');
const router = express.Router();

const { ensureAuthenticated } = require('../helpers/auth');

const {
  createCategory,
  getUpdateCategoryForm,
  getCreateCategoryForm,
  detailCategory,
  listCategory,
} = require('../controllers/blogController.js');

router.route('/create')
  .get(ensureAuthenticated, getCreateCategoryForm)
  .post(ensureAuthenticated, createCategory)
router.route('/:categoryId')
  .get(detailCategory)
router.route('/')
  .get(ensureAuthenticated, listCategory)

module.exports = router;
