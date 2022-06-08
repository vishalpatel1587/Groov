import "./commands";

declare global {
  namespace Cypress {
    interface Chainable {
      getTeamId(ritualBuilderUrl: string, teamName: string): Chainable<Element>;
      deleteTeam(ritualBuilderUrl: string, teamId: string): Chainable<Element>;
    }
  }
}
