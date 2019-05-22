const mongoose = require('mongoose');
const slug = require('slug');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    required: [true, 'Title cannot be empty'],
  },
  slug: {
    type: String,
    default: 'post',
  },
  body: {
    type: String,
    required: [true, 'Question cannot be empty'],
  },
  votes: {
    type: Number,
    default: 0,
  },
  answers: [{
    type: Schema.Types.ObjectId,
    ref: 'Answer',
  }],
  upvotes: [{ type: Schema.Types.ObjectId }],
  downvotes: [{ type: Schema.Types.ObjectId }],
  tags: [],
  editable: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

questionSchema.pre('save', function(next) {
  this.slug = slug(this.title);
  next();
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
