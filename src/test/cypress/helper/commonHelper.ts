///<reference types="cypress"/>

class CommonHelper {
  public verifyElementPresent(elementIdentifier: string) {
    cy.get(elementIdentifier).should("be.visible");
  }

  public verifyTitleOfPage(pageTitle: string) {
    cy.title().should("eq", pageTitle);
  }
}

export default CommonHelper;
