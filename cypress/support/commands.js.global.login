import { loginSelect } from '../fixtures/selectors.json'
import { path } from '../fixtures/urlPath.json'

//used if using global login otherwise it is ignored
Cypress.Commands.add('loginUi', (accountType = 'admin') => {
  const loginOptions = {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    username: Cypress.env(`${accountType}Username`),
    password: Cypress.env(`${accountType}Password`),
    usernameField: loginSelect.username,
    passwordField: loginSelect.password,
    passwordSubmitBtn: loginSelect.submit,
    preLoginSelector: loginSelect.userLogin,
    loginUrl: Cypress.env('login'),
    getAllBrowserCookies: true,
    headless: true,
    logs: false,
    isPopup: false,
    postLoginSelector: `'a[href*="/${path.homePage}"]'`,
  };

  return cy.task('globalLoginPortal', loginOptions).then(({ cookies }) => {
    cy.clearCookies();

    cookies.map((cookie) => {
      cy.setCookie(cookie.name, cookie.value, {
        domain: cookie.domain,
        expiry: cookie.expires,
        httpOnly: cookie.httpOnly,
        path: cookie.path,
        secure: cookie.secure,
      });

      Cypress.Cookies.defaults({
        preserve: cookie.name,
      });
    });
  });
});
