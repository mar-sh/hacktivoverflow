const express = require('express');

const controller = require('../controllers/answer');
const authMiddleware = require('../middlewares/auth');

const {
  userAuthentication,
} = authMiddleware;

const {
  postCreateAnswer,
  putEditAnswerById,
} = controller;

const router = express.Router();

router.post('/', userAuthentication, postCreateAnswer);
router.put('/:id', userAuthentication, putEditAnswerById);

module.exports = router;