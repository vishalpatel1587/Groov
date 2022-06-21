import { Then, When } from "cypress-cucumber-preprocessor/steps";
import TeamPage from "../../../pages/teamPage";

const teamPage = new TeamPage();

When(/^i click on the edit team info menu$/, () => {
  teamPage.clickOnEditTeamInfoMenuButton();
});

Then(/^I get access to Edit team info$/, () => {
  teamPage.clickOnEditTeamInfoMenuButton();
  teamPage.verifyEditTeamInfoEnabled();
});

When(/^i click on the edit add or remove ritual menu$/, () => {
  teamPage.clickOnFirstEditOrRemoveRitualMenuButton();
});

Then(/^I get access to add or remove ritual$/, () => {
  teamPage.clickOnFirstEditOrRemoveRitualMenuButton();
  teamPage.verifyEditRitualEnabled();
});

When(/^i click on the edit team member menu$/, () => {
  teamPage.clickOnEditTeamMemberMenuButton();
});

Then(/^I get access to add team member$/, () => {
  teamPage.clickOnEditTeamMemberMenuButton();
  teamPage.verifyAddTeamMemberEnabled();
});
