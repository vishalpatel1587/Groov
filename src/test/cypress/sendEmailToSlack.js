/// <reference types="cypress" />

const enviornmentVariable = require("../cypress.env.json");
("use strict");
const nodemailer = require("nodemailer");
async function main() {
  let hostname = "smtp.gmail.com";
  let username = enviornmentVariable.gmailAppUsername;
  let password = enviornmentVariable.gmailAppPassword;

  let transporter = nodemailer.createTransport({
    host: hostname,
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: username,
      pass: password,
    },
    logger: true,
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Vishal Patel" <vishal.patel@groovnow.com>',
    to: "team-renegade-aaaafgroz625h7wbrql57orsni@groovnow.slack.com",
    subject:
      process.argv[3] == "PASSED"
        ? "🟢Ritual Builder Test Results " + process.argv[3] + " 🟢"
        : "⛔Ritual Builder Test Results " + process.argv[3] + " ⛔",
    text: process.argv[2],
    html: '<a href="' + process.argv[2] + '">Link to Test Report</a>',
    text: "Link to Test Report",
  });

  console.log("Message sent: %s", info.response);
}

main().catch(console.error);
