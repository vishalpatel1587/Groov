import { HomePage as HomePageTestId } from "../../constants/homePageTestId";

class HomePage {
  private _ritualBuilderHeader: string;
  private _addNewTeamButton: string;

  constructor() {
    this._ritualBuilderHeader = `[data-testid="${HomePageTestId.RitualBuilderHeader}"]`;
    this._addNewTeamButton = `[data-testid="${HomePageTestId.AddNewTeamButton}"]`;
  }

  public verifyHomePageHeader(ritualBuilderHeader: string) {
    cy.get(this._ritualBuilderHeader).contains(ritualBuilderHeader);
  }

  public clickOnAddNewTeamButton() {
    cy.get(this._addNewTeamButton).click();
  }
}
// Export as Module for re-usability
export default HomePage;
