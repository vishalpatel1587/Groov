/// <reference types="cypress" />

const enviornmentVariable = require("../cypress.env.json");
("use strict");
const nodemailer = require("nodemailer");

console.log(fileContents);
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
    to: "aaaafnar66b7nt4bwzx7cqlpyu@groovnow.slack.com",
    subject: "Ritual Builder Test Results <number> of <number> failed",
    text: "Hello world?",
    html: '<p><a href="' + process.argv[2] + '">Link to Test Report</a></p>',
  });

  console.log("Message sent: %s", info.response);
}

main().catch(console.error);
