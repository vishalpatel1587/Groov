///<reference types="cypress"/>

class ApiHelper {
  public deleteTeamFromRitualBuilder(
    ritualBuilderUrl: string,
    teamName: string
  ) {
    cy.getTeamId(ritualBuilderUrl, teamName).then((teamId) => {
      cy.deleteTeam(ritualBuilderUrl, teamId.toString())
    });
  }
}
export default ApiHelper;
