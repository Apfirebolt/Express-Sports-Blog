const express = require('express');
const router = express.Router();

const {
  createCategory,
  getUpdateCategoryForm,
  getCreateCategoryForm,
  detailCategory,
  listCategory,
} = require('../controllers/blogController.js');

router.route('/create')
  .get(getCreateCategoryForm)
  .post(createCategory)
router.route('/create')
  .get(getCreateCategoryForm)
  .post(createCategory)
router.route('/:categoryId')
  .get(detailCategory)
router.route('/')
  .get(listCategory)

module.exports = router;
