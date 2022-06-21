import { RemoveRitualModalTestId } from "../../constants/removeRitualModalTestId";
import { GeneralTestId } from "../../constants/generalTestId";

class RemoveRitualModalPage {
  private removeRitualModalHeader: string;
  private removeButton: string;

  constructor() {
    this.removeRitualModalHeader = `[data-testid="${RemoveRitualModalTestId.RemoveRitualModalHeader}"]`;
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
