const mongoose = require('mongoose');

const Question = require('./Question');

const Schema = mongoose.Schema;

const answerSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  threadId: Schema.Types.ObjectId,
  body: {
    type: String,
    required: [true, 'Content cannot be empty'],
  },
  votes: {
    type: Number,
    default: 0,
  },
  upvotes: [{ type: Schema.Types.ObjectId }],
  downvotes: [{ type: Schema.Types.ObjectId }],
  editable: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

answerSchema.pre('save', function(next) {
  Question.findOneAndUpdate({ _id: this.threadId }, {$push: { answers: this._id }})
    .exec();
  next();
});

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;
