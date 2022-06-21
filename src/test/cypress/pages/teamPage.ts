import { TeamPageTestId } from "../../constants/teamPageTestId";

class TeamPage {
  private teamNameHeader: string;
  private createANewRitualButton: string;
  private ritualTileHeader: string;
  private editTeamInfoMenuButton: string;
  private editTeamMemberMenuButton: string;
  private editOrRemoveRitualMenuButton: string;
  private editTeamInfoLink: string;
  private editRitualLink: string;
  private removeRitualLink: string;
  private addTeamMemberLink: string;

  constructor() {
    this.teamNameHeader = `[data-testid="${TeamPageTestId.TeamNameHeader}"]`;
    this.createANewRitualButton = `[data-testid="${TeamPageTestId.CreateANewRitualButton}"]`;
    this.ritualTileHeader = `[data-testid="${TeamPageTestId.RitualTileHeader}"]`;
    this.editTeamInfoMenuButton = `[data-testid="${TeamPageTestId.EditTeamInfoMenuButton}"]`;
    this.editOrRemoveRitualMenuButton = `[data-testid="${TeamPageTestId.EditOrRemoveRitualMenuButton}"]`;
    this.editTeamMemberMenuButton = `[data-testid="${TeamPageTestId.EditTeamMemberMenuButton}"]`;
    this.editTeamInfoLink = `[data-testid="${TeamPageTestId.EditTeamInfoLink}"]`;
    this.editRitualLink = `[data-testid="${TeamPageTestId.EditRitualLink}"]`;
    this.removeRitualLink = `[data-testid="${TeamPageTestId.RemoveRitualLink}"]`;
    this.addTeamMemberLink = `[data-testid="${TeamPageTestId.AddTeamMemberLink}"]`;
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

  public verifyToasterMessage(toasterMsg: string) {
    cy.get(".MuiCollapse-wrapper").contains(toasterMsg);
  }

  public verifyRitualPresentOnTeamPage(dataTable: {
    hashes: () => { [x: string]: number }[];
  }) {
    cy.get(this.ritualTileHeader)
      .first()
      .contains(dataTable.hashes()[0]["Trigger"]);
  }

  public clickOnEditTeamInfoMenuButton() {
    cy.get(this.editTeamInfoMenuButton).click();
  }

  public clickOnEditTeamMemberMenuButton() {
    cy.get(this.editTeamMemberMenuButton).click();
  }

  public clickOnEditOrRemoveRitualMenuButtonForARitual(ritualName: string) {
    cy.contains(this.ritualTileHeader, ritualName)
      .find(this.editOrRemoveRitualMenuButton)
      .click();
  }

  public clickOnFirstEditOrRemoveRitualMenuButton() {
    cy.get(this.editOrRemoveRitualMenuButton).first().click();
  }

  public verifyEditTeamInfoEnabled() {
    cy.get(this.editTeamInfoLink).should("be.visible");
  }

  public verifyEditRitualEnabled() {
    cy.get(this.editRitualLink).should("be.visible");
  }

  public verifyAddTeamMemberEnabled() {
    cy.get(this.addTeamMemberLink).should("be.visible");
  }

  public clickOnRemoveRitualLink() {
    cy.get(this.removeRitualLink).first().click({ force: true });
  }

  public verifyRitualWithNameDeletedSuccessfully(ritualName: string) {
    cy.contains(this.ritualTileHeader, ritualName).should("not.exist");
  }
}

export default TeamPage;
