const express = require('express');

const controller = require('../controllers/action');
const authMiddleware = require('../middlewares/auth');
const imageMiddleware = require('../middlewares/awsimage');

const { imageUploadAWS } = imageMiddleware;

const {
  userAuthentication,
  upvotePermission,
  downvotePermission,
  tagPermission,
} = authMiddleware;

const {
  imageUpload,
  getAllTags,
  getUserTags,
  patchUserUpvote,
  patchUserDownvote,
  postAddWatchedTag,
  deleteRemoveWatchedTag,
} = controller;

const router = express.Router();

router.get('/tags', getAllTags);
router.post('/upload', imageUploadAWS, imageUpload);
router.get('/user/tags', userAuthentication, getUserTags);
router.post('/add/tags', userAuthentication, tagPermission, postAddWatchedTag);
router.delete('/remove/tags', userAuthentication, deleteRemoveWatchedTag)
router.patch('/upvote/question/:questionId', userAuthentication, upvotePermission, patchUserUpvote);
router.patch('/downvote/question/:questionId', userAuthentication, downvotePermission, patchUserDownvote);
router.patch('/upvote/answer/:answerId', userAuthentication, upvotePermission, patchUserUpvote);
router.patch('/downvote/answer/:answerId', userAuthentication, downvotePermission, patchUserDownvote);

module.exports = router;