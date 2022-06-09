///<reference types="cypress"/>

class ApiHelper {
  public deleteTeamFromRitualBuilder(
    ritualBuilderUrl: string,
    teamName: string
  ) {
    cy.getTeamId(ritualBuilderUrl, teamName).then((teamid) => {
      cy.deleteTeam(ritualBuilderUrl, teamid.toString())
    });
  }
}
export default ApiHelper;
