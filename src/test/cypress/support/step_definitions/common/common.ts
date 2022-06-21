import { Before, Given, Then, When } from "cypress-cucumber-preprocessor/steps";
import AdminAccessModalPage from "../../../pages/adminAccessModalPage";
import TeamPage from "../../../pages/teamPage";
import * as constants from "../../../datamodel/constants";

const teamPage = new TeamPage();
const adminAccessModalPage = new AdminAccessModalPage();
let ritualBuilderApiUrl: string;

Before(() => {
  switch (Cypress.config("baseUrl")) {
    case constants.ritualBuilderDevUrl || constants.ritualBuilderTestUrl:
      ritualBuilderApiUrl = constants.ritualBuilderTestApiUrl;
      break;
    case constants.ritualBuilderPreprodUrl:
      ritualBuilderApiUrl = constants.ritualBuilderPreprodApiUrl;
      break;
    default:
      ritualBuilderApiUrl = constants.ritualBuilderTestApiUrl;
      break;
  }
});

Given(/^I am on the team page$/, () => {
  teamPage
    .getTeamId(ritualBuilderApiUrl, constants.ritualBuilderTeamName)
    .then((teamId) => {
      cy.visit(`/${teamId}/rituals`);
      teamPage.verifyTeamPageHeader(constants.ritualBuilderTeamName);
    });
});

When(
  /^I click on Create a New Ritual button and confirm my access by entering my "([^"]*)"$/,
  (emailAddress) => {
    teamPage.clickCreateANewRitualButton();
    adminAccessModalPage.verifyEnterYourEMailAddressModalOpen();
    adminAccessModalPage.enterEmailAddress(emailAddress);
    adminAccessModalPage.clickCreate();
  }
);

Then(
  /^I am presented with a modal to enter the email of a team member$/,
  () => {
    adminAccessModalPage.verifyEnterYourEMailAddressModalOpen();
  }
);

Then(/^I can confirm the "([^"]*)"$/, (emailAddress) => {
  adminAccessModalPage.enterEmailAddress(emailAddress);
  adminAccessModalPage.clickCreate();
});
