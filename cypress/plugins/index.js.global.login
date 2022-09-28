/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************
const tags = require('cypress-tags');
import { CustomizedLogin } from 'cypress-social-logins/src/Plugins';

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  on('before:browser:launch', (browser, options) => {
    if (browser.family === 'chromium') {
      options.args.push('--disable-popup-blocking');
      return options;
    }
  });

  on('task', {
    globalLoginPortal: (options) => CustomizedLogin(options),
  });

  on('file:preprocessor', tags(config));

  return config;
};
