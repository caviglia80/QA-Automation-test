import HomePage from '../page_objects/homePage';
import ServicesPage from '../page_objects/servicesPage';

describe('First Scenario - Cypress', () => {
  let testData;
  const homePage = new HomePage();
  const servicesPage = new ServicesPage();

  before(() => {
    cy.fixture('testData').then((data) => {
      testData = data;
    });
  });

  beforeEach(() => {
    homePage.visit(testData.baseUrl); // vamos a baseUrl antes de cada test, puedo acceder a visit() porque BasePage hereda en HomePage()
    homePage.acceptCookies(); // cerramos el pop-up para que no moleste, puedo acceder a acceptCookies() porque BasePage hereda en HomePage()
  });

  it('Full First Scenario', () => {
    homePage.verifyLanguageIsEnglish();                           // 1. Go to https://capitole-consulting.com/ and make sure language is English
    homePage.accessToServices();                                  // 2. Access to Services
    servicesPage.scrollToOurAreasOfExpertise();                   // 3. Scroll to "Our areas of expertise"
    servicesPage.verifyAutomatedTestingContainsCucumber();        // 4. Verify that "Cucumber" appears in Automated Testing
    servicesPage.verifyProgrammingToolsContainsVisualStudio();    // 5. Verify that "Visual Studio" appears in Programming Tools
  });
});
