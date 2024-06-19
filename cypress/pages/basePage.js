class BasePage {
    visit(url) {
        cy.visit(url);
    }

    acceptCookies() {
        cy.get('button:contains("Accept")').then(button => {
            if (button.length > 0) cy.wrap(button).click();
        });
    }
}

export default BasePage;
