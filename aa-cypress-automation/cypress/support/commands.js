// cypress/support/commands.js

// Required for later file upload automation
import 'cypress-file-upload';

// Example reusable login command (optional)
Cypress.Commands.add('login', (username, password) => {
  cy.visit('/login');
  
  cy.get('input[type="email"]').should('be.visible').type(username);
  cy.get('input[type="password"]').should('be.visible').type(password);
  cy.get('button[type="submit"]').click();

  cy.contains('Home', { timeout: 20000 }).should('be.visible');
});
