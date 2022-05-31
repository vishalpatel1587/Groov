import { TeamCreatedSuccessfullyPage as TeamCreatedSuccessfullyPageTestId } from "../../constants/teamCreatedSuccessfullyPageTestId";

class TeamCreatedSuccessfullyPage {
  private _congratulationHeader: string;
  private _successMessageHeader: string;
  private _goToTeamPageLink: string

  constructor() {
    this._congratulationHeader = `[data-testid="${TeamCreatedSuccessfullyPageTestId.CongratulationHeader}"]`;
    this._successMessageHeader = `[data-testid="${TeamCreatedSuccessfullyPageTestId.SuccessMessageHeader}"]`;
    this._goToTeamPageLink = `[data-testid="${TeamCreatedSuccessfullyPageTestId.GoToTeamPageLink}"]`;
  }

  public verifyCongratulationHeader(congratulationHeader: string) {
    cy.get(this._congratulationHeader).contains(congratulationHeader);
  }

  public verifySuccessMessageHeader(successMessageHeader: string) {
    cy.get(this._successMessageHeader).contains(successMessageHeader);
  }

  public clickOnGoToTeamPageButton() {
    cy.get(this._goToTeamPageLink).click();
  }
}
// Export as Module for re-usability
export default TeamCreatedSuccessfullyPage;
