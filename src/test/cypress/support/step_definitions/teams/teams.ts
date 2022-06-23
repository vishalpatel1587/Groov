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
import TeamCreatedSuccessfullyPage from "../../../pages/teamCreatedSuccessfullyPage";
import TeamPage from "../../../pages/teamPage";
import ApiHelper from "../../../helper/apiHelper";
import CreateANewRitualPage from "../../../pages/createANewRitualPage";
import AdminAccessModalPage from "../../../pages/adminAccessModalPage";
import RemoveRitualModalPage from "../../../pages/removeRitualModalPage";

const homePage = new HomePage();
const commonHelper = new CommonHelper();
const addANewTeam = new AddANewTeam();
const teamCreatedSuccessfullyPage = new TeamCreatedSuccessfullyPage();
const teamPage = new TeamPage();
const apiHelper = new ApiHelper();
const createANewRitualPage = new CreateANewRitualPage();
const adminAccessModalPage = new AdminAccessModalPage();
const removeRitualModalPage = new RemoveRitualModalPage();

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

Then(/^I add a new ritual$/, (dataTable) => {
  addNewRitualDataTable = dataTable;
  teamPage.clickCreateANewRitualButton();
  createANewRitualPage.verifyCreateANewRitualModalOpen(
    constants.createANewRitualGuideText
  );
  createANewRitualPage.populateTrigger(dataTable);
  createANewRitualPage.populateAction(dataTable);
  createANewRitualPage.populateCheckinFrequency(dataTable);
  createANewRitualPage.clickCreate();
});

Then(/^The ritual should be added successfully$/, () => {
  teamPage.verifyToasterMessage(constants.ritualAddedSuccessfullyToasterMsg);
  teamPage.verifyRitualPresentOnTeamPage(addNewRitualDataTable);
});

When(
  /^I click on the edit add or remove ritual menu for "([^"]*)" ritual and confirm my access by entering my "([^"]*)"$/,
  (ritualName, emailAddress) => {
    teamPage.clickOnEditOrRemoveRitualMenuButtonForARitual(ritualName);
    adminAccessModalPage.verifyEnterYourEMailAddressModalOpen();
    adminAccessModalPage.enterEmailAddress(emailAddress);
    adminAccessModalPage.clickCreate();
  }
);

Then(/^I remove "([^"]*)" ritual$/, (ritualName) => {
  teamPage.clickOnEditOrRemoveRitualMenuButtonForARitual(ritualName);
  teamPage.clickOnRemoveRitualLink();
  removeRitualModalPage.verifyRemoveRitualModalOpen(
    constants.removeRitualModalHeader
  );
  removeRitualModalPage.clickRemove();
});

Then(/^The "([^"]*)" ritual should be removed successfully$/, (ritualName) => {
  teamPage.verifyToasterMessage(constants.ritualRemovedSuccessfullyToasterMsg);
  teamPage.verifyRitualWithNameDeletedSuccessfully(ritualName);
});
