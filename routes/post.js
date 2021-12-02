const express = require('express');
const router = express.Router();

const { ensureAuthenticated } = require('../helpers/auth');

const { upload, videoUpload } = require('../utils/file-upload');

const {
  createPost,
  getUpdatePostForm,
  getCreatePostForm,
  getAddImageForm,
  getDeleteImageForm,
  getAddVideoForm,
  getDeleteVideoForm,
  listPost,
  deletePost,
  updatePost,
  detailPost,
  getDeletePost,
  addImage,
  deleteImage,
  addVideo,
  deleteVideo
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
router.route('/:postId/video')
  .get(ensureAuthenticated, getAddVideoForm)
  .post(ensureAuthenticated, videoUpload.single('file'), addVideo)
router.route('/:postId/video/delete')
  .get(ensureAuthenticated, getDeleteVideoForm)
  .post(ensureAuthenticated, deleteVideo)
router.route('/:postId/images/:imageId/delete')
  .get(ensureAuthenticated, getDeleteImageForm)
  .post(ensureAuthenticated, deleteImage)

module.exports = router;
