import templatePage from '../support/pageObjects/templatePage';
import { templateModal } from '../support/pageObjects/templateModal';

/** Examples of 2 styles of testing
 * 1) landing page tests has the test details exposed:
 *  pros: it is easy to see what is being tested within a test
 *  cons: code may be repeated, tests can become overly long and more difficult to read
 * 2) modal tests has the test details abstracted into the page object
 *  pros: the tests are more human-readable, code can be shared, tests tend to be shorter
 *  cons: the tests specifics are hidden and may not match what the reader's expectations
 *
 *  Choose whichever style suits the team, or you can mix and match as long as the tests remain understandable
 **/

describe(['template'], 'When a site is created', () => {
  beforeEach(() => {
    templatePage.login();
  });

  it('homepage','then the landing page will have generic details', () => {
    templatePage.loaded();
    cy.get(templatePage.selectors.section).then(element => {
      expect(element.find(templatePage.selectors.title)).contain('Welcome to Microbe');
      expect(element.find(templatePage.selectors.button)).exist;
    });
  });

  it(['modal'],'then the opened modal will have generic details', () => {
    templatePage.loaded();
    templatePage.openModal();
    templateModal.modalLoaded();
    templateModal.verifyModalContent();
    templateModal.selectAction();
    templateModal.modalUnloaded();
  });
});
