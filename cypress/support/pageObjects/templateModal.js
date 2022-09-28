import { modalSelect } from '../../fixtures/selectors.json';

/**
 * This is the 'class' style of page object where the actions a page can make are represented by
 * methods within a class.
 *
 * All page objects should be of the same style
 */
class DefaultModal {
  selectors = modalSelect;

  close() {
    cy.get(modalSelect.container).find(modalSelect.closeButton).click();
  }

  verifyModalContent() {
    cy.get(modalSelect.container).should('exist').then((container) => {
      cy.wrap(container).get(modalSelect.closeButton).should('exist');
      const content = cy.wrap(container).get(modalSelect.content).should('exist');
      content.get(modalSelect.title).should('contain.text','This is a modal');
      content.get(modalSelect.message).should('contain.text','Update your content');
      content.get(modalSelect.actionButton).should('exist');
    });
  }

  selectAction() {
    cy.get(modalSelect.container).find(modalSelect.content).find(modalSelect.actionButton).click();
  }

  modalLoaded() {
    //instead of a cy.intercept and cy.wait combination the following can be used to check if a page is loaded
    //this was used as it can also be used as an assertion
    cy.get(modalSelect.container).find(modalSelect.content).should('exist');
  }

  modalUnloaded() {
    cy.get(modalSelect.container).find(modalSelect.content).should('not.exist');
  }
}

export const templateModal = new DefaultModal();
