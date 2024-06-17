
describe('FRONTEND - First Scenario', () => {
  let testData;

  before(() => {
    cy.fixture('testData').then((data) => {
      testData = data;
    });
  });

  beforeEach(() => {
    cy.visit(testData.baseUrl); // asumo que hare varias pruebas con el mismo dominio

    cy.get('button:contains("Accept")').then(button => {
      if (button.length > 0) cy.wrap(button).click();  // quitamos pop-up de consentimiento de cookies
    });
  });

  it('Default language - english', () => {
    const selector_lan_english = '#menu-item-wpml-ls-12-en > [title="English"]';  // si por defecto apareceria Español, entonces no encontraria este elemento
    cy
      .get(selector_lan_english).should('exist');
  });

  it('Access to Services', () => {
    cy
      .get('.fusion-main-menu a')
      .contains('Services')
      .should('exist')
      .click({ force: true });

    // Alternativa
    // cy.get('#menu-item-1537')
    //   .should('be.visible')
    //   .click({ force: true });
  });

  it('Scroll to "Our areas of expertise"', () => {
    cy
      .get('.fusion-main-menu a')
      .contains('Services') // buscamos el texto "Services" dentro de los a
      .should('exist')
      .click({ force: true });

    cy
      .contains('Our areas of expertise')
      .scrollIntoView()
      .should('be.visible');
  });

  it('Verify that "Cucumber" appears in Automated Testing', () => {
    cy
      .get('.fusion-main-menu a')
      .contains('Services') // buscamos el texto "Services" dentro de los a
      .should('exist')
      .click({ force: true });

    cy
      .contains('Our areas of expertise')
      .scrollIntoView()
      .should('be.visible');

    cy
      .get('.fusion-toggle-heading')
      .contains('Automated Testing')
      .should('exist') // Asegura que exista
      .should('be.visible') // Asegura que sea visible
      .click();

    cy
      .get('#bdf000da880d283e8 > .panel-body')
      .contains('Cucumber')
      .should('exist') // Asegura que exista
      .should('be.visible'); // Asegura que sea visible
  });

  it('Verify that "Visual Studio" appears in Programming Tools', () => {
    cy
      .get('.fusion-main-menu a')
      .contains('Services') // buscamos el texto "Services" dentro de los a
      .should('exist')
      .click({ force: true });

    cy
      .contains('Our areas of expertise')
      .scrollIntoView()
      .should('be.visible');

    cy
      .get('.fusion-toggle-heading')
      .contains('Programming Tools')
      .should('exist') // Asegura que exista
      .should('be.visible') // Asegura que sea visible
      .click();

    cy
      .get('#f19bba8bca9434ccd > .panel-body')
      .contains('Visual Studio')
      .should('exist'); // Asegura que "Visual Studio" exista
  });

  it('Full First Scenario', () => {

    const selector_lan_english = '#menu-item-wpml-ls-12-en > [title="English"]';  // si por defecto apareceria Español, entonces no encontraria este elemento
    cy
      .get(selector_lan_english).should('exist');

    cy
      .get('.fusion-main-menu a')
      .contains('Services') // buscamos el texto "Services" dentro de los a
      .should('exist')
      .click({ force: true });

    cy
      .contains('Our areas of expertise')
      .scrollIntoView()
      .should('be.visible');

    cy
      .get('.fusion-toggle-heading')
      .contains('Programming Tools')
      .should('exist') // Asegura que exista
      .should('be.visible') // Asegura que sea visible
      .click();

    cy
      .get('#f19bba8bca9434ccd > .panel-body')
      .contains('Visual Studio')
      .should('exist') // Asegura que exista
      .should('be.visible'); // Asegura que sea visible

    cy
      .get('.fusion-toggle-heading')
      .contains('Automated Testing')
      .should('exist') // Asegura que exista
      .should('be.visible') // Asegura que sea visible
      .click();

    cy
      .get('#bdf000da880d283e8 > .panel-body')
      .contains('Cucumber')
      .should('exist') // Asegura que exista
      .should('be.visible'); // Asegura que sea visible
  });

});
