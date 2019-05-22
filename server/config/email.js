const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.TEST_EMAIL,
    pass: 'hacktiv8Super',
  },
});

const mailOptions = {
  from: process.env.TEST_EMAIL,
  to: "",
  subject: "Welcome",
  html: "Welcome to HOF",
};

module.exports = { 
  transporter,
  mailOptions,
};