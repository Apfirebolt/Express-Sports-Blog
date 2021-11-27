const express = require('express');
const router = express.Router();

const {
  createCategory,
  getUpdateCategoryForm,
  getCreateCategoryForm,
  listCategory,
} = require('../controllers/blogController.js');

router.route('/create')
  .get(getCreateCategoryForm)
  .post(createCategory)
router.route('/')
  .get(listCategory)

module.exports = router;
