Cypress.Commands.add("getTeamId", (ritualBuilderUrl, teamName) => {
  cy.request({
    method: "GET",
    url: `${ritualBuilderUrl}/company/the-wellbeing-company/teams?limit=30&offset=0&sortBy=name&orderBy=asc`,
  }).then((response) => {
    let teamid: string;
    response.body.teams.forEach((element: any) => {
      //cy.log(element.name)
      if (element.name == teamName) {
        cy.log(element.rituals[0].teamId);
        teamid = element.rituals[0].teamId;

        return cy.wrap(teamid).as("teamid");
      }
    });
  });
});

Cypress.Commands.add("deleteTeam", (ritualBuilderUrl, teamId) => {
   cy.request({
    method: "DELETE",
    url: `${ritualBuilderUrl}/team/${teamId}`,
    headers: {
      "MTM-API-KEY": Cypress.env('ritualBuilderAPIKeyNonProd'),
    },
  });
});
