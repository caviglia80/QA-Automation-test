import BasePage from './basePage';

class HomePage extends BasePage {
    verifyLanguageIsEnglish() {
        const selector_lan_english = '#menu-item-wpml-ls-12-en > [title="English"]';
        cy.get(selector_lan_english).should('exist'); // si existe, es el idioma actual
    }

    accessToServices() {
        cy.get('.fusion-main-menu a').contains('Services').should('exist').click({ force: true });
        cy.url().should('include', '/services'); // me aseguro de haber llegado a /services
    }
}

export default HomePage;
