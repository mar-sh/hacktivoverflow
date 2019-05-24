const Question = require('../models/Question');

const cronJob = () => {
  Question.deleteMany({ editable: false })
    .exec();
}

const config =  {
  scheduled: true,
  timezone: "Asia/Jakarta"
}

module.exports = { 
  cronJob,
  config,
}