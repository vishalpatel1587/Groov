import {
  Given,
  When,
  Then,
  Before,
  After,
} from "cypress-cucumber-preprocessor/steps";
import HomePage from "../../../pages/homePage";
import CommonHelper from "../../../helper/commonHelper";
import * as constants from "../../../datamodel/constants";
import AddANewTeam from "../../../pages/addANewTeam";
import { CHECKIN_FREQUENCY } from "../../../../../types/CheckinFrequency";
import { data } from "cypress/types/jquery";
import TeamCreatedSuccessfullyPage from "../../../pages/teamCreatedSuccessfullyPage";
import TeamPage from "../../../pages/teamPage";
import ApiHelper from "../../../helper/apiHelper";
import CreateANewRitualPage from "../../../pages/createANewRitualPage";

const homePage = new HomePage();
const commonHelper = new CommonHelper();
const addANewTeam = new AddANewTeam();
const teamCreatedSuccessfullyPage = new TeamCreatedSuccessfullyPage();
const teamPage = new TeamPage();
const apiHelper = new ApiHelper();
const createANewRitualPage = new CreateANewRitualPage();
let ritualBuilderApiUrl: string;
let addNewRitualDataTable: any;

Before(() => {
  cy.visit("/teams", { failOnStatusCode: false });
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

Before({ tags: "@DeleteTeamFromDb" }, () => {
  apiHelper.deleteTeamFromRitualBuilder(
    ritualBuilderApiUrl,
    constants.ritualBuilderTeamName
  );
});

Given(/^I am on the home page of "([^"]*)"$/, (ritualBuilderHeader) => {
  homePage.verifyHomePageHeader(ritualBuilderHeader);
  commonHelper.verifyTitleOfPage(constants.ritualBuilderTitle);
});

When(/^I click on Add a new team$/, () => {
  homePage.clickOnAddNewTeamButton();
});

Then(/^I am presented with "([^"]*)" page$/, (addANewTeamHeader) => {
  addANewTeam.verifyAddANewTeamPageHeader(addANewTeamHeader);
});

Then(/^I am able to provide all the values$/, (datatable) => {
  addANewTeam.populateTeamName(datatable);
  addANewTeam.populateTeamDescription(datatable);
  addANewTeam.populateEmail(datatable);
  addANewTeam.populateConfirmEmail(datatable);
  addANewTeam.populateAction(datatable);
  addANewTeam.populateTrigger(datatable);
  addANewTeam.selectCheckinFrequency(datatable);
  addANewTeam.clickCommit();
});

Then(/^create a team$/, function (this: any) {
  teamCreatedSuccessfullyPage.verifyCongratulationsHeader(
    constants.congratulationsHeader
  );
  teamCreatedSuccessfullyPage.verifySuccessMessageHeader(
    constants.teamAddedSuccessfullyMessage
  );
  teamCreatedSuccessfullyPage.clickOnGoToTeamPageButton();
  teamPage.verifyTeamPageHeader(constants.ritualBuilderTeamName);
});

Given(/^I am on the team page$/, () => {
  teamPage
    .getTeamId(ritualBuilderApiUrl, constants.ritualBuilderTeamName)
    .then((teamId) => {
      cy.visit(`/${teamId}/rituals`);
      teamPage.verifyTeamPageHeader(constants.ritualBuilderTeamName);
    });
});

When(/^I add a new ritual$/, (datatable) => {
  addNewRitualDataTable = datatable;
  teamPage.clickCreateANewRitualButton();
  createANewRitualPage.verifyCreateANewRitualModalOpen(
    constants.createANewRitualGuideText
  );
  createANewRitualPage.populateTrigger(datatable);
  createANewRitualPage.populateAction(datatable);
  createANewRitualPage.populateCheckinFrequency(datatable);
  createANewRitualPage.clickCreate();
});

Then(/^The ritual should be added successfully$/, () => {
  teamPage.verifyToasterMessage(constants.ritualAddedSuccessfullyToasterMsg);
  teamPage.verifyRitualPresentOnTeamPage(addNewRitualDataTable);
});
