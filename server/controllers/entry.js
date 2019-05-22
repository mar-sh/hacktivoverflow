const kue = require('kue');

const User = require('../models/User');

const emailConfig = require('../config/email');
const { createAccessToken } = require('../helpers/token');
const { verifyPassword } = require('../helpers/entry');

const {
  transporter,
  mailOptions,
} = emailConfig;

const job = kue.createQueue();

job.process("send-mail", (job, done) => {
  mailOptions.to = job.data.to;
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
      done();
    };
  });
});

class EntryController {

  static postUserRegister(req, res, next) {
    const {
      username,
      email,
      password,
    } = req.body;

    const newUser = new User({
      username,
      email,
      password,
    });

    job.create('send-mail', { to: email }).attempts(5).save();

    newUser.save()
      .then((user) => {
        const accessToken = createAccessToken({
          id: user._id,
          email: user.email,
        });

        res.status(201).json({
          token: accessToken,
          userLogin: {
            userId: user._id,
            username: user.username,
            email: user.email,
          },
        });
      })
      .catch((error) => {
        next(error);
      });
  };

  static postUserLogin(req, res, next) {
    const {
      email,
      password,
    } = req.body;

    User.findOne({ email })
      .then((user) => {
        if(user && verifyPassword(password, user.password)) {
          const accessToken = createAccessToken({
            id: user._id,
            email: user.email,
          });

          res.status(200).json({
            token: accessToken,
            userLogin: {
              userId: user._id,
              username: user.username,
              email: user.email,
            },
          });
        } else {
          throw new Error('Wrong email/password');
        };
      })
      .catch((error) => {
        next(error);
      });
  };

};

module.exports = EntryController;
