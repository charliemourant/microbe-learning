import { homeSelect } from '../../fixtures/selectors.json';
import { path } from '../../fixtures/urlPath.json';

/**
 * This is the 'const' style of page object where the actions a page can make are represented by
 * field functions within a json object.
 * The field functions can be explicit, e.g. login: () => {},
 * or implicit, e.g. loaded() {},
 *
 * All page objects should be of the same style
 */
const loginPage = {
  selectors: { ...homeSelect },
  login: () => {
    cy.loginUi().then(() => {
      cy.visit(`${Cypress.env('host')}/${path.homePage}`);
    });
  },
  loaded() {
    cy.get(homeSelect.title).should('exist');
  },
  openModal: () => {
    cy.get(homeSelect.section).find(homeSelect.button).click();
  }
};

export default loginPage;
