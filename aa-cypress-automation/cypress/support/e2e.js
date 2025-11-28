// cypress/support/e2e.js

import './commands';
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false prevents Cypress from failing the test on app errors
  return false;
});