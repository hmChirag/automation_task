class LoginPage {

  visit() {
    // We visit the root URL and allow status codes like 401 to prevent crashes on redirect
    cy.visit('/', { failOnStatusCode: false });
  }

  fillUsername(username) {
    // Robust selector: looks for ID, Name, or Type
    cy.get('input[id="username"], input[name="username"], input[type="email"]', { timeout: 20000 })
      .should('be.visible')
      .clear()
      .type(username);

    // Handle "Next" button if it exists (common in AA flows)
    cy.get('body').then(($body) => {
      if ($body.find('button[id="login-n-next-button"]').length > 0) {
        cy.get('button[id="login-n-next-button"]').click();
      } else if ($body.find('button:contains("Next")').length > 0) {
        cy.contains('button', 'Next').click();
      }
    });
  }

  fillPassword(password) {
    cy.get('input[id="password"], input[name="password"], input[type="password"]', { timeout: 20000 })
      .should('be.visible')
      .clear()
      .type(password, { log: false });
  }

  submit() {
    // Clicks the main Login button
    cy.get('button[id="login-n-next-button"], button[type="submit"], button:contains("Log in")')
      .should('be.visible')
      .click();
  }

  assertLoggedIn() {
    // Validate we are on the home page
    cy.url({ timeout: 20000 }).should('include', 'automationanywhere');
    // Check for a dashboard element
    cy.get('body', { timeout: 20000 }).should('contain', 'Automation'); 
  }

  // Consolidated method if you want to do it in one line later
  login(username, password) {
    this.visit();
    this.fillUsername(username);
    this.fillPassword(password);
    this.submit();
    this.assertLoggedIn();
  }
}

export default new LoginPage();