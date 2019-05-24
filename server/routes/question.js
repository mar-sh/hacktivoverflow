const express = require('express');

const controller = require('../controllers/question');
const authMiddleware = require('../middlewares/auth');

const {
  userAuthentication,
  userAuthorization,
} = authMiddleware;

const {
  postCreateQuestion,
  getAllQuestions,
  getQuestionById,
  getQuestionsByUserId,
  putEditQuestionById,
  patchRemoveQuestionById,
  deleteQuestionbyId,
} = controller;

const router = express.Router();

router.post('/', userAuthentication, postCreateQuestion);
router.get('/', getAllQuestions);
router.get('/users', userAuthentication, getQuestionsByUserId);
router.get('/:id', getQuestionById);
router.put('/:id', userAuthentication, userAuthorization, putEditQuestionById);
router.patch('/:id', userAuthentication, userAuthorization, patchRemoveQuestionById);
router.delete('/:id', deleteQuestionbyId);

module.exports = router;
