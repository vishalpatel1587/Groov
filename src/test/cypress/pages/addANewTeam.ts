import { addANewTeamPage as addANewTeamPageTestId } from "../../constants/addANewTeamPageTestId";

class AddANewTeam {
  private _addANewTeamHeader: string;
  private _teamNameTextBox: string;
  private _teamDescriptionTextBox: string;
  private _emailTextBox: string;
  private _confirmEmailTextBox: string;
  private _triggerTextBox: string;
  private _actionTextBox: string;
  private _checkInFrequencyDropdown: string;
  private _commitButton: string;
  private _cancelButton: string;

  constructor() {
    this._addANewTeamHeader = `[data-testid="${addANewTeamPageTestId.AddANewTeamHeader}"]`;
    this._teamNameTextBox = `[data-testid="${addANewTeamPageTestId.TeamNameTextBox}"]`;
    this._teamDescriptionTextBox = `[data-testid="${addANewTeamPageTestId.TeamDescriptionTextBox}"]`;
    this._emailTextBox = `[data-testid="${addANewTeamPageTestId.EmailTextBox}"]`;
    this._confirmEmailTextBox = `[data-testid="${addANewTeamPageTestId.ConfirmEmailTextBox}"]`;
    this._triggerTextBox = `[data-testid="${addANewTeamPageTestId.TriggerTextBox}"]`;
    this._actionTextBox = `[data-testid="${addANewTeamPageTestId.ActionTextBox}"]`;
    this._checkInFrequencyDropdown = `[data-testid="${addANewTeamPageTestId.CheckInFrequencyDropDown}"]`;
    this._commitButton = `[data-testid="${addANewTeamPageTestId.CommitButton}"]`;
    this._cancelButton = `[data-testid="${addANewTeamPageTestId.CancelButton}"]`;
  }

  public verifyAddANewTeamPageHeader(addANewTeamHeader: string) {
    cy.get(this._addANewTeamHeader).contains(addANewTeamHeader);
  }

  public selectCheckinFrequency(dataTable: { hashes: () => { [x: string]: any; }[]; }) {
    cy.get(this._checkInFrequencyDropdown)
      .click()
      .get(`[data-value="${dataTable.hashes()[0]["CheckinFrequency"]}"]`)
      .click();
  }

  public populateTeamName(dataTable: { hashes: () => { [x: string]: string; }[]; }) {
    cy.get(this._teamNameTextBox).type(dataTable.hashes()[0]["TeamName"]);
  }

  public populateTeamDescription(dataTable: { hashes: () => { [x: string]: string; }[]; }) {
    cy.get(this._teamDescriptionTextBox).type(
      dataTable.hashes()[0]["TeamDescription"]
    );
  }

  public populateEmail(dataTable: { hashes: () => { [x: string]: string; }[]; }) {
    cy.get(this._emailTextBox).type(dataTable.hashes()[0]["Email"]);
  }

  public populateConfirmEmail(dataTable: { hashes: () => { [x: string]: string; }[]; }) {
    cy.get(this._confirmEmailTextBox).type(
      dataTable.hashes()[0]["ConfirmEmail"]
    );
  }

  public populateTrigger(dataTable: { hashes: () => { [x: string]: string; }[]; }) {
    cy.get(this._triggerTextBox).type(dataTable.hashes()[0]["Trigger"]);
  }

  public populateAction(dataTable: { hashes: () => { [x: string]: string; }[]; }) {
    cy.get(this._actionTextBox).type(dataTable.hashes()[0]["Action"]);
  }

  public clickCommit(){
    cy.get(this._commitButton).click()
  }
}
// Export as Module for re-usability
export default AddANewTeam;
