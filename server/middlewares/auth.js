const User = require("../models/User");
const Question = require("../models/Question");
const Answer = require("../models/Answer");

const { verifyAccessToken } = require("../helpers/token");

const userAuthentication = (req, res, next) => {
  try {
    if (req.headers.hasOwnProperty("authorization")) {
      const decode = verifyAccessToken(req.headers.authorization);

      User.findById(decode.id)
        .then(user => {
          if (user) {
            req.authenticated = decode;
            return next();
          } else {
            throw new Error("User not found");
          }
        })
        .catch(error => {
          next(error);
        });
    } else {
      throw new Error("Please login first");
    }
  } catch (err) {
    next(err);
  }
};

const upvotePermission = (req, res, next) => {
  const target = req.params.questionId
    ? req.params.questionId
    : req.params.answerId;
  const Model = req.params.questionId ? Question : Answer;
  const userId = req.authenticated.id;

  Model.findById(target)
    .then(model => {
      if (
        model.upvotes.indexOf(userId) < 0 &&
        model.downvotes.indexOf(userId) < 0
      ) {
        Model.update({ _id: target }, { $push: { upvotes: userId } }).exec();
        return next();
      } else if (
        model.upvotes.indexOf(userId) < 0 &&
        model.downvotes.indexOf(userId) > -1
      ) {
        Model.update({ _id: target }, { $pull: { downvotes: userId } }).exec();
        next();
      } else if (model.upvotes.indexOf(userId) > -1) {
        throw new Error("You can not upvote this anymore");
      }
    })
    .catch(err => {
      next(err);
    });
};

const downvotePermission = (req, res, next) => {
  const target = req.params.questionId
    ? req.params.questionId
    : req.params.answerId;
  const Model = req.params.questionId ? Question : Answer;
  const userId = req.authenticated.id;

  Model.findById(target)
    .then(model => {
      if (
        model.upvotes.indexOf(userId) < 0 &&
        model.downvotes.indexOf(userId) < 0
      ) {
        Model.update({ _id: target }, { $push: { downvotes: userId } }).exec();
        return next();
      } else if (
        model.downvotes.indexOf(userId) < 0 &&
        model.upvotes.indexOf(userId) > -1
      ) {
        Model.update({ _id: target }, { $pull: { upvotes: userId } }).exec();
        next();
      } else if (model.downvotes.indexOf(userId) > -1) {
        throw new Error("You can not downvote this anymore");
      }
    })
    .catch(err => {
      next(err);
    });
};

const tagPermission = (req, res, next) => {
  const id = req.authenticated.id;
  const { tag } = req.body;
  let tags = [];

  Question.find({})
      .then((questions) => {
        
        questions.forEach((question) => {
          tags = tags.concat([...question.tags]);
        });
        tags = tags.filter((tag, index) => tags.indexOf(tag) === index);
        
        if(tags.indexOf(tag) < 0) {
          throw new Error('No such tag');
        } else {
          return User.findOne({ _id: id })
        }
      })
      .then((user) => {
        if(user.watchedTags.indexOf(tag) > -1) {
          throw new Error('You already have this on watch')
        } else {
          return next();
        };
      })
      .catch((err) => {
        next(err);
      })
};

const userAuthorization = (req, res, next) => {
  const { id } = req.params;
  const Model = req.originalUrl.match('/questions')  ? Question : Answer
  console.log(req.originalUrl)

  Model.findById(id)
    .then((model) => {
      if(model && model.userId == req.authenticated.id) {
        next()
      } else if(model && model.userId !== req.authenticated.id) {
        throw new Error('Unauthorized')
      } else {
        throw new Error('Not found')
      }
    })
    .catch((err) => {
      next(err);
    })
};

module.exports = {
  userAuthentication,
  userAuthorization,
  upvotePermission,
  downvotePermission,
  tagPermission,
};
