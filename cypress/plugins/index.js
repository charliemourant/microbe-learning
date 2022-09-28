const tags = require('cypress-tags');

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {

  on('file:preprocessor', tags(config));

  return config;
}
