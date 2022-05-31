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

let homePage = new HomePage();
let commonHelper = new CommonHelper();
let addANewTeam = new AddANewTeam();
let teamCreatedSuccessfullyPage = new TeamCreatedSuccessfullyPage();
let teamPage = new TeamPage();

Before(() => {
  cy.visit("/", { failOnStatusCode: false });
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
  cy.wrap(datatable).as("datatable");
});

Then(/^create a team$/, function (this: any) {
  teamCreatedSuccessfullyPage.verifyCongratulationsHeader(
    constants.congratulationsHeader
  );
  teamCreatedSuccessfullyPage.verifySuccessMessageHeader(
    constants.teamAddedSuccessfullyMessage
  );
  teamCreatedSuccessfullyPage.clickOnGoToTeamPageButton();
  teamPage.verifyTeamPageHeader(this.datatable.hashes()[0]["TeamName"]);
});
