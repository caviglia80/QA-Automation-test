import BasePage from './basePage';

class ServicesPage extends BasePage {
    scrollToOurAreasOfExpertise() {
        cy.contains('Our areas of expertise').scrollIntoView().should('be.visible');
    }

    verifyAutomatedTestingContainsCucumber() {
        cy.get('.fusion-toggle-heading').contains('Automated Testing').should('exist').should('be.visible').click();
        cy.get('#bdf000da880d283e8 > .panel-body').contains('Cucumber').should('exist').should('be.visible'); // nos aseguramos de que contenga el texto, exista y sea visible
    }

    verifyProgrammingToolsContainsVisualStudio() {
        cy.get('.fusion-toggle-heading').contains('Programming Tools').should('exist').should('be.visible').click();
        cy.get('#f19bba8bca9434ccd > .panel-body').contains('Visual Studio').should('exist').should('be.visible'); // nos aseguramos de que contenga el texto, exista y sea visible
    }
}

export default ServicesPage;
