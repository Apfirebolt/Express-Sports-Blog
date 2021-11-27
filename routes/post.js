const express = require('express');
const router = express.Router();

const { ensureAuthenticated } = require('../helpers/auth');

const {
  createPost,
  getUpdatePostForm,
  getCreatePostForm,
  listPost,
  deletePost,
  updatePost,
  detailPost,
  getDeletePost
} = require('../controllers/postController.js');

router.route('/')
  .get(ensureAuthenticated, listPost)
router.route('/create')
  .get(ensureAuthenticated, getCreatePostForm)
  .post(ensureAuthenticated, createPost)
router.route('/:postId/detail')
  .get(ensureAuthenticated, detailPost)
router.route('/:postId/delete')
  .get(ensureAuthenticated, getDeletePost)
  .post(ensureAuthenticated, deletePost)
router.route('/:postId/update')
  .get(ensureAuthenticated, getUpdatePostForm)
  .post(ensureAuthenticated, updatePost)
module.exports = router;
