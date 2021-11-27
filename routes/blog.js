const express = require('express');
const router = express.Router();

const { ensureAuthenticated } = require('../helpers/auth');

const {
  createCategory,
  getUpdateCategoryForm,
  getCreateCategoryForm,
  detailCategory,
  getDeleteCategory,
  deleteCategory,
  updateCategory,
  listCategory,
} = require('../controllers/blogController.js');

router.route('/create')
  .get(ensureAuthenticated, getCreateCategoryForm)
  .post(ensureAuthenticated, createCategory)
router.route('/:categoryId/delete')
  .get(ensureAuthenticated, getDeleteCategory)
  .post(ensureAuthenticated, deleteCategory)
router.route('/:categoryId/update')
  .get(ensureAuthenticated, getUpdateCategoryForm)
  .post(ensureAuthenticated, updateCategory)
router.route('/')
  .get(ensureAuthenticated, listCategory)

module.exports = router;
