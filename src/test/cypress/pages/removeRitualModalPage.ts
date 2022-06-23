import { GeneralTestId } from "../../constants/generalTestId";

class RemoveRitualModalPage {
  private removeRitualModalHeader: string;
  private removeButton: string;

  constructor() {
    this.removeRitualModalHeader = `[data-testid="${GeneralTestId.Header}"]`;
    this.removeButton = `[data-testid="${GeneralTestId.ConfirmActionButton}"]`;
  }

  public verifyRemoveRitualModalOpen(header: string) {
    cy.get(this.removeRitualModalHeader).contains(header);
  }

  public clickRemove() {
    cy.get(this.removeButton).click();
  }
}

export default RemoveRitualModalPage;
