const express = require('express');
const router = express.Router();

const { ensureAuthenticated } = require('../helpers/auth');

const { upload } = require('../utils/file-upload');

const {
  createPost,
  getUpdatePostForm,
  getCreatePostForm,
  getAddImageForm,
  getDeleteImageForm,
  listPost,
  deletePost,
  updatePost,
  detailPost,
  getDeletePost,
  addImage,
  deleteImage
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
router.route('/:postId/images')
  .get(ensureAuthenticated, getAddImageForm)
  .post(ensureAuthenticated, upload.single('file'), addImage)
router.route('/:postId/images/:imageId/delete')
  .get(ensureAuthenticated, getDeleteImageForm)
  .post(ensureAuthenticated, deleteImage)
module.exports = router;
