class NavigationPage {
  
  elements = {
    // 1. Create Button 
    createButton: () => cy.get('button').contains('Create'),
    
    // 2. Dropdown Options
    taskBotOption: () => cy.get(':contains("Task Bot")').last(),
    formOption: () => cy.get('button[name="create-attended-form"]').filter(':visible'),

    // 3. Modal Inputs
    nameInput: () => cy.get('input[data-cy="bot-name"], input[placeholder="Name"], input[name="name"]').first()
  };

  navigateToAutomation() {
    cy.get('a[aria-label="Automation"], .os-sidebar-icon-automation', { timeout: 15000 })
      .should('be.visible')
      .click();
    cy.url({ timeout: 15000 }).should('include', 'automation');
    cy.wait(3000); 
  }

  startCreateTaskBot() {
    this._openCreateMenu();
    this.elements.taskBotOption().click({ force: true });
    this.elements.nameInput({ timeout: 15000 }).should('be.visible');
  }

  startCreateForm() {
    this._openCreateMenu();
    this.elements.formOption().click({ force: true });
    
    // FIX: Use Regex /Create form/i for case-insensitive matching
    cy.contains(/Create form/i, { timeout: 10000 }).should('be.visible');
    this.elements.nameInput().should('be.visible');
  }

  _openCreateMenu() {
    cy.log('--- ATTEMPTING TO OPEN MENU ---');
    this.elements.createButton().should('be.visible').click();
    cy.wait(1000);

    cy.get('body').then($body => {
      if ($body.find('button[name="create-attended-form"]:visible').length === 0) {
        cy.log('Menu did not open. Clicking Create again...');
        this.elements.createButton().click({ force: true });
        cy.wait(1000);
      }
    });
  }
}

export default new NavigationPage();