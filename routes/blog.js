const express = require('express');
const { body } = require('express-validator');
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
  .post(ensureAuthenticated, [
    body('name', 'Category Name field is required').notEmpty(),
  ], createCategory)
router.route('/:categoryId/delete')
  .get(ensureAuthenticated, getDeleteCategory)
  .post(ensureAuthenticated, deleteCategory)
router.route('/:categoryId/detail')
  .get(ensureAuthenticated, detailCategory)
router.route('/:categoryId/update')
  .get(ensureAuthenticated, getUpdateCategoryForm)
  .post(ensureAuthenticated, [
    body('name', 'Category Name field is required').notEmpty(),
  ], updateCategory)
router.route('/')
  .get(ensureAuthenticated, listCategory)

module.exports = router;
