import { TeamPage as TeamPageTestId } from "../../constants/teamPageTestId";

class TeamPage {
  private _teamNameHeader: string;

  constructor() {
    this._teamNameHeader = `[data-testid="${TeamPageTestId.TeamNameHeader}"]`;
  }

  public verifyTeamPageHeader(teamName: string) {
    cy.get(this._teamNameHeader).contains(teamName);
  }

}
// Export as Module for re-usability
export default TeamPage;
