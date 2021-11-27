const express = require('express');
const router = express.Router();

const { ensureAuthenticated } = require('../helpers/auth');

const {
  createPost,
  getUpdateCategoryForm,
  getCreatePostForm,
  listPost,
  deletePost,
  getDeletePost
} = require('../controllers/postController.js');

router.route('/')
  .get(ensureAuthenticated, listPost)
router.route('/create')
  .get(ensureAuthenticated, getCreatePostForm)
  .post(ensureAuthenticated, createPost)
router.route('/:postId/delete')
  .get(ensureAuthenticated, getDeletePost)
  .post(ensureAuthenticated, deletePost)

module.exports = router;
