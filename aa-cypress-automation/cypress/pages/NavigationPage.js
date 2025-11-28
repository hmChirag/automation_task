class NavigationPage {
  
  elements = {
    // 1. Create Button 
    createButton: () => cy.get('button').contains('Create'),
    
    // 2. Task Bot Item (THE ALTERNATIVE FIX)
    // ":contains" finds ALL elements with "Task Bot" text.
    // ".last()" picks the very last one found in the HTML.
    // Since dropdown menus are usually added at the end of the page code, this grabs the menu item instead of the list in the background.
    taskBotOption: () => cy.get(':contains("Task Bot")').last(),

    // 3. Modal Input
    nameInput: () => cy.get('input[data-cy="bot-name"], input[placeholder="Name"], input[name="name"]')
  };

  navigateToAutomation() {
    cy.get('a[aria-label="Automation"], .os-sidebar-icon-automation', { timeout: 15000 })
      .should('be.visible')
      .click();
    cy.url({ timeout: 15000 }).should('include', 'automation');
  }

  startCreateTaskBot() {
    cy.log('--- OPENING CREATE MENU ---');

    // 1. Click Create
    this.elements.createButton().should('be.visible').click();
    
    // 2. Wait for Menu Animation
    cy.wait(1000); 

    // 3. Click "Task Bot"
    this.elements.taskBotOption()
      .should('be.visible')
      .click({ force: true });
      
    // 4. Verify Modal
    cy.log('--- WAITING FOR MODAL INPUT ---');
    this.elements.nameInput({ timeout: 15000 }).should('be.visible');
  }
}

export default new NavigationPage();