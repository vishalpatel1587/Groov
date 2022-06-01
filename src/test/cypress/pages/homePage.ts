import { HomePageTestId } from "../../constants/homePageTestId";

class HomePage {
  private ritualBuilderHeader: string;
  private addNewTeamButton: string;

  constructor() {
    this.ritualBuilderHeader = `[data-testid="${HomePageTestId.RitualBuilderHeader}"]`;
    this.addNewTeamButton = `[data-testid="${HomePageTestId.AddNewTeamButton}"]`;
  }

  public verifyHomePageHeader(ritualBuilderHeader: string) {
    cy.get(this.ritualBuilderHeader).contains(ritualBuilderHeader);
  }

  public clickOnAddNewTeamButton() {
    cy.get(this.addNewTeamButton).click();
  }
}
// Export as Module for re-usability
export default HomePage;
