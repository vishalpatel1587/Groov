/// <reference types="cypress" />
const enviornmentVariable = require("../cypress.env.json")
"use strict";

const nodemailer = require("nodemailer");


async function main() {
  let hostname = "smtp.gmail.com";
  let username = enviornmentVariable.gmailAppUsername//Cypress.env('gmailAppUsername');
  let password = enviornmentVariable.gmailAppPassword//Cypress.env('gmailAppPassword');
  

  let transporter = nodemailer.createTransport({
    host: hostname,
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: username,
      pass: password,
    },
    logger: true
  })
  
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Vishal Patel" <vishal.patel@groovnow.com>',
    to: "aaaafnar66b7nt4bwzx7cqlpyu@groovnow.slack.com",
    subject: "Ritual Builder Test Results <number> of <number> failed",
    attachments:[
      {    // file on disk as an attachment
          filename: 'Test_Report.html',
          path: 'cypress/reports/cucumber-htmlreport.html/index.html' // stream this file
      }
    ],
    text: "Hello world?",
    html: "<strong>E2E Test Report</strong>",
    headers: { 'x-cloudmta-class': 'standard' }
  });

  console.log("Message sent: %s", info.response);
}

main().catch(console.error);;