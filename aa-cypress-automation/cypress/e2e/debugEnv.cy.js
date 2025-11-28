it('debug env variables', () => {
  // prints to Cypress runner log (not terminal)
  cy.log('USERNAME: ' + (Cypress.env('USERNAME') ? 'SET' : 'NOT SET'));
  cy.log('PASSWORD: ' + (Cypress.env('PASSWORD') ? 'SET' : 'NOT SET'));
  // also assert to fail early if missing
  expect(!!Cypress.env('USERNAME'), 'USERNAME exists').to.equal(true);
  expect(!!Cypress.env('PASSWORD'), 'PASSWORD exists').to.equal(true);
});
