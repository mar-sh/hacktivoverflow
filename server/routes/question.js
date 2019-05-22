const express = require('express');

const controller = require('../controllers/question');
const authMiddleware = require('../middlewares/auth');
const imageMiddleware = require('../middlewares/awsimage');

const {
  userAuthentication,

} = authMiddleware;

const { } = imageMiddleware;

const {
  postCreateQuestion,
  getAllQuestions,
  getQuestionById,
  putEditQuestionById,
  patchRemoveQuestionById,
  deleteQuestionbyId,
} = controller;

const router = express.Router();

router.post('/', userAuthentication, postCreateQuestion);
router.get('/', getAllQuestions);
router.get('/:id', getQuestionById);
router.put('/:id', putEditQuestionById);
router.patch('/:id', patchRemoveQuestionById);
router.delete('/:id', deleteQuestionbyId);

module.exports = router;
