///<reference types="cypress"/>

class CommonHelper {
  public verifyElementPresent(elementIdentifier: string) {
    cy.get(elementIdentifier).should("be.visible");
  }

  public verifyTitleOfPage(pageTitle: string) {
    cy.title().should("eq", pageTitle);
  }

  public selectCheckinFrequency(
    cypressElement: string,
    checkInFrequencyValue: string
  ) {
    cy.get(cypressElement)
      .click()
      .get(`[data-value="${checkInFrequencyValue}"]`)
      .click();
  }
}

export default CommonHelper;
