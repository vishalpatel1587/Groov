///<reference types="cypress"/>

class CommonHelper {

   
    // Function need to be called by Step definition files
    public verifyElementPresent(elementIdentifier : string)  {

        cy.get(elementIdentifier).should('be.visible')

    }

    public verifyTitleOfPage(pageTitle : string)  {

        cy.title().should('eq', pageTitle)

    }
}

export default CommonHelper
