const User = require('../models/User');
const Question = require('../models/Question');
const Answer = require('../models/Answer');

class ActionController {

  static imageUpload(req, res) {
    console.log(req.file);
    res.send(req.file.location);
  };

  static getAllTags(req, res, next) {
    Question.find({})
      .then((questions) => {
        let tags = [];
        questions.forEach((question) => {
          tags = tags.concat([...question.tags]);
        });
        tags = tags.filter((tag, index) => tags.indexOf(tag) === index);

        res.status(200).json(tags);
      })
      .catch((err) => {
        next(err);
      })
  };

  static getUserTags(req, res, next) {
    const id = req.authenticated.id;

    User.findOne({ _id: id })
      .then((user) => {
        res.status(200).json(user.watchedTags);
      })
      .catch((err) => {
        next(err);
      });
  };

  static patchUserUpvote(req, res, next) {
    const target = req.params.questionId ? req.params.questionId : req.params.answerId;
    const Model = req.params.questionId ? Question : Answer;
    const userId = req.authenticated.id;

    Model.findOneAndUpdate({ _id: target }, { $inc: { 'votes': 1} }, { new: true })
      .then((model) => {
        res.status(200).json(model);
      })
      .catch((err) => {
        next(err);
      });
  };

  static patchUserDownvote(req, res, next) {
    const target = req.params.questionId ? req.params.questionId : req.params.answerId;
    const Model = req.params.questionId ? Question : Answer;
    const userId = req.authenticated.id;

    Model.findOneAndUpdate({ _id: target }, { $inc: { 'votes': -1} }, { new: true })
      .then((model) => {
        res.status(200).json(model);
      })
      .catch((err) => {
        next(err);
      });
  };

  static postAddWatchedTag(req, res, next) {
    const id = req.authenticated.id;

    const { tag } = req.body;

    User.findOneAndUpdate({ _id: id }, { $push: { watchedTags: tag }})
      .then((user) => {
        res.status(200).json(user.tags)
      })
      .catch((err) => {
        next(err);
      })
  };

  static deleteRemoveWatchedTag(req, res, next) {
    const id = req.authenticated.id;

    const { tag } = req.body;

    User.findOneAndUpdate({ _id: id }, { $pull: { watchedTags: tag }})
      .then((user) => {
        res.status(200).json(user.tags);
      })
      .catch((err) => {
        next(err);
      })
  }

};

module.exports = ActionController;
