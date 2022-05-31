import { TeamPage as TeamPageTestId } from "../../constants/teamPageTestId";

class TeamPage {
  private teamNameHeader: string;

  constructor() {
    this.teamNameHeader = `[data-testid="${TeamPageTestId.TeamNameHeader}"]`;
  }

  public verifyTeamPageHeader(teamName: string) {
    cy.get(this.teamNameHeader).contains(teamName);
  }
}
// Export as Module for re-usability
export default TeamPage;
