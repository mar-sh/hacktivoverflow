const Answer = require('../models/Answer');

class AnswerController {
  static postCreateAnswer(req, res, next) {
    const userId = req.authenticated.id;

    const {
      threadId,
      body,
    } = req.body;

    const newAnswer = new Answer({
      userId,
      threadId,
      body,
    });

    newAnswer.save()
      .then((answer) =>{
        res.status(201).json(answer);
      })
      .catch((error) => {
        next(error)
      })
  };

  static putEditAnswerById(req, res, next) {
    const { id } = req.params;

    const {
      body,
    } = req.body;

    const updated = {
      body,
    };

    Answer.findOneAndUpdate({ _id: id }, updated, { new: true , runValidators: true })
      .then((answer) => {
        res.status(200).json(answer);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

module.exports = AnswerController;

