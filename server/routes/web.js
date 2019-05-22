const express = require('express');

const entryRoute = require('./entry');
const questionRoute = require('./question');
const answerRoute = require('./answer');
const actionRoute = require('./action');

const router = express.Router();

router.use('/', entryRoute);
router.use('/answers', answerRoute);
router.use('/questions', questionRoute);
router.use('/actions', actionRoute);

module.exports = router;

