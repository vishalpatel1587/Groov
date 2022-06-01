import { TeamCreatedSuccessfullyPageTestId } from "../../constants/teamCreatedSuccessfullyPageTestId";

class TeamCreatedSuccessfullyPage {
  private congratulationsHeader: string;
  private successMessageHeader: string;
  private goToTeamPageLink: string;

  constructor() {
    this.congratulationsHeader = `[data-testid="${TeamCreatedSuccessfullyPageTestId.CongratulationsHeader}"]`;
    this.successMessageHeader = `[data-testid="${TeamCreatedSuccessfullyPageTestId.SuccessMessageHeader}"]`;
    this.goToTeamPageLink = `[data-testid="${TeamCreatedSuccessfullyPageTestId.GoToTeamPageLink}"]`;
  }

  public verifyCongratulationsHeader(congratulationsHeader: string) {
    cy.get(this.congratulationsHeader).contains(congratulationsHeader);
  }

  public verifySuccessMessageHeader(successMessageHeader: string) {
    cy.get(this.successMessageHeader).contains(successMessageHeader);
  }

  public clickOnGoToTeamPageButton() {
    cy.get(this.goToTeamPageLink).click();
  }
}
// Export as Module for re-usability
export default TeamCreatedSuccessfullyPage;
