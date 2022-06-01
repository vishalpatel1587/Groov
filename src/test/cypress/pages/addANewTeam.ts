import { AddANewTeamPageTestId } from "../../constants/addANewTeamPageTestId";

class AddANewTeam {
  private addANewTeamHeader: string;
  private teamNameTextBox: string;
  private teamDescriptionTextBox: string;
  private emailTextBox: string;
  private confirmEmailTextBox: string;
  private triggerTextBox: string;
  private actionTextBox: string;
  private checkInFrequencyDropdown: string;
  private commitButton: string;
  private cancelButton: string;

  constructor() {
    this.addANewTeamHeader = `[data-testid="${AddANewTeamPageTestId.AddANewTeamHeader}"]`;
    this.teamNameTextBox = `[data-testid="${AddANewTeamPageTestId.TeamNameTextBox}"]`;
    this.teamDescriptionTextBox = `[data-testid="${AddANewTeamPageTestId.TeamDescriptionTextBox}"]`;
    this.emailTextBox = `[data-testid="${AddANewTeamPageTestId.EmailTextBox}"]`;
    this.confirmEmailTextBox = `[data-testid="${AddANewTeamPageTestId.ConfirmEmailTextBox}"]`;
    this.triggerTextBox = `[data-testid="${AddANewTeamPageTestId.TriggerTextBox}"]`;
    this.actionTextBox = `[data-testid="${AddANewTeamPageTestId.ActionTextBox}"]`;
    this.checkInFrequencyDropdown = `[data-testid="${AddANewTeamPageTestId.SelectDropDown}"]`;
    this.commitButton = `[data-testid="${AddANewTeamPageTestId.CommitButton}"]`;
    this.cancelButton = `[data-testid="${AddANewTeamPageTestId.CancelButton}"]`;
  }

  public verifyAddANewTeamPageHeader(addANewTeamHeader: string) {
    cy.get(this.addANewTeamHeader).contains(addANewTeamHeader);
  }

  public selectCheckinFrequency(dataTable: {
    hashes: () => { [x: string]: any }[];
  }) {
    cy.get(this.checkInFrequencyDropdown)
      .click()
      .get(`[data-value="${dataTable.hashes()[0]["CheckinFrequency"]}"]`)
      .click();
  }

  public populateTeamName(dataTable: {
    hashes: () => { [x: string]: string }[];
  }) {
    cy.get(this.teamNameTextBox).type(dataTable.hashes()[0]["TeamName"]);
  }

  public populateTeamDescription(dataTable: {
    hashes: () => { [x: string]: string }[];
  }) {
    cy.get(this.teamDescriptionTextBox).type(
      dataTable.hashes()[0]["TeamDescription"]
    );
  }

  public populateEmail(dataTable: { hashes: () => { [x: string]: string }[] }) {
    cy.get(this.emailTextBox).type(dataTable.hashes()[0]["Email"]);
  }

  public populateConfirmEmail(dataTable: {
    hashes: () => { [x: string]: string }[];
  }) {
    cy.get(this.confirmEmailTextBox).type(
      dataTable.hashes()[0]["ConfirmEmail"]
    );
  }

  public populateTrigger(dataTable: {
    hashes: () => { [x: string]: string }[];
  }) {
    cy.get(this.triggerTextBox).type(dataTable.hashes()[0]["Trigger"]);
  }

  public populateAction(dataTable: {
    hashes: () => { [x: string]: string }[];
  }) {
    cy.get(this.actionTextBox).type(dataTable.hashes()[0]["Action"]);
  }

  public clickCommit() {
    cy.get(this.commitButton).click();
  }
}
// Export as Module for re-usability
export default AddANewTeam;
