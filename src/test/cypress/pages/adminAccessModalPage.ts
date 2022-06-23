import { AdminAccessModalTestId } from "../../constants/adminAccessModalTestId";
import { GeneralTestId } from "../../constants/generalTestId";

class AdminAccessModalPage {
  private emailAddressTextBox: string;
  private continueButton: string;

  constructor() {
    this.emailAddressTextBox = `[data-testid="${AdminAccessModalTestId.EmailAddressTextBox}"]`;
    this.continueButton = `[data-testid="${GeneralTestId.ConfirmActionButton}"]`;
  }

  public verifyEnterYourEMailAddressModalOpen() {
    cy.get(this.continueButton).should("be.visible");
  }
  public enterEmailAddress(emailAddress: string) {
    cy.get(this.emailAddressTextBox).type(emailAddress);
  }

  public clickCreate() {
    cy.get(this.continueButton).click();
  }
}

export default AdminAccessModalPage;
