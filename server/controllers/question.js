const Question = require('../models/Question');


class QuestionController {

  static postCreateQuestion(req, res, next) {
    const userId = req.authenticated.id;

    const {
      title,
      body,
      tags,
    } = req.body;

    const newQuestion = new Question({
      userId,
      title,
      body,
      tags,
    });

    newQuestion.save()
      .then((question) => {
        res.status(201).json(question);
      })
      .catch((error) => {
        next(error)
      });
  };

  static getAllQuestions(req, res, next) {
    console.log(req.originalUrl)
    let { 
      title, 
      tags,
    } = req.query;

    let queries = {};
  
    if( title || tags ){ 
      title = new RegExp(`${title}`);
      tags = new RegExp(`${tags}`);
      queries = { $or: [
        { 'title' : { $regex: title , $options: 'ig' } },
        { 'tags' : { $regex: tags, $options: 'ig' } },
      ]};
    };

    Question.find(queries)
      .populate({
        path: 'userId',
        select: ['username', 'email'],
      })
      .populate({
        path: 'answers',
        populate: {
          path: 'userId',
        },
      })
      .then((questions) => {
        res.status(200).json(questions);
      })
      .catch((error) => {
        next(error);
      });
  };

  static getQuestionById(req, res, next) {
    const { id } = req.params;

    Question.findOne({ _id: id })
      .populate({
        path: 'userId',
        select: ['username', 'email'],
      })
      .populate({
        path: 'answers',
        populate: {
          path: 'userId',
        },
      })
      .then((question) => {
        res.status(200).json(question);
      })
      .catch((error) => {
        next(error);
      });
  };

  static getQuestionsByUserId(req, res, next) {
    const userId = req.authenticated.id;

    Question.find({ userId })
    .populate({
      path: 'userId',
      select: ['username', 'email'],
    })
    .populate({
      path: 'answers',
      populate: {
        path: 'userId',
      },
    })
      .then((questions) => {
        res.status(200).json(questions);
      })
      .catch((err) => {
        next(err);
      });
  };

  static putEditQuestionById(req, res, next) {
    const { id } = req.params;

    const {
      title,
      body,
      tags,
    } = req.body;

    const updated = {
      title,
      body,
      tags,
    };

    Question.findOneAndUpdate({ _id: id }, updated, { new: true, runValidators: true } )
      .then((updated) => {
        res.status(200).json(updated);
      })
      .catch((error) => {
        next(error);
      });
  };

  static patchRemoveQuestionById(req, res, next) {
    const { id } = req.params;

    const updated = {
      title: 'Removed',
      body: 'This post was removed',
      editable: false,
    };

    Question.findOneAndUpdate({ _id: id }, updated, { new: true, runValidators: true } )
      .then((updated) => {
        res.status(200).json(updated);
      })
      .catch((error) => {
        next(error);
      });
    
  };

  static deleteQuestionbyId(req, res, next) {
    const { id } = req.params;
    
    Question.findOneAndDelete({ _id: id })
      .then(() => {
        res.status(204).json();
      })
      .catch((error) => {
        next(error);
      })
  };

};

module.exports = QuestionController;
