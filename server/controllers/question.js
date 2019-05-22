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

    console.log(newQuestion);

    newQuestion.save()
      .then((question) => {
        res.status(201).json(question);
      })
      .catch((error) => {
        next(error)
      });
  };

  static getAllQuestions(req, res, next) {
    let queries = {};

    for(let key in req.query){
        queries[key] = {$regex: new RegExp(req.query[key]), $options: 'ig'};
    };
  
    const condition = { $or: [queries] };

    // console.log(condition);

    Question.find(condition)
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
