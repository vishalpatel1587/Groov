9import { TeamPageTestId } from "../../constants/teamPageTestId";

class TeamPage {
  private teamNameHeader: string;
  private createANewRitualButton: string;
  private ritualTileHeader: string;

  constructor() {
    this.teamNameHeader = `[data-testid="${TeamPageTestId.TeamNameHeader}"]`;
    this.createANewRitualButton = `[data-testid="${TeamPageTestId.CreateANewRitualButton}"]`;
    this.ritualTileHeader = `[data-testid="${TeamPageTestId.RitualTileHeader}"]`;
  }

  public verifyTeamPageHeader(teamName: string) {
    cy.get(this.teamNameHeader).contains(teamName);
  }

  public getTeamId(ritualBuilderUrl: string, teamName: string) {
    return cy.getTeamId(ritualBuilderUrl, teamName).then((teamId) => {
      return teamId.toString();
    });
  }

  public clickCreateANewRitualButton() {
    cy.get(this.createANewRitualButton).click();
  }

  public verifyToasterMessage(ritualAddedSuccessfullyToasterMsg: string) {
    cy.get(".MuiCollapse-wrapper").contains(ritualAddedSuccessfullyToasterMsg);
  }

  public verifyRitualPresentOnTeamPage(dataTable: { hashes: () =>  { [x: string]: number; }[]; })
  {
    cy.get(this.ritualTileHeader).first().contains(dataTable.hashes()[0]["Trigger"])
  }
}

export default TeamPage;
