class TaskBotPage {

  elements = {
    // --- Pop-up Modal ---
    nameInput: () => cy.get('input[data-cy="bot-name"], input[placeholder="Name"], input[name="name"]').first(),
    descriptionInput: () => cy.get('textarea, input[name="description"]').last(),
    createSubmitBtn: () => cy.contains('button', 'Create & edit'),

    // --- Editor ---
    actionSearchInput: () => cy.get('input[placeholder*="Search actions"], input[aria-label="Search actions"]'),
    messageBoxAction: () => cy.get('[draggable="true"]').contains('Message box'),

    // --- Properties Panel (Rich Text Editor) ---
    messageTextInput: () => cy.get('div[role="textbox"][name="content"]'),
    
    // --- Header ---
    saveButton: () => cy.get('button[aria-label="Save"], button:contains("Save")').last()
  };

  createBot(name, description) {
    this.elements.nameInput().should('be.visible').clear().type(name);
    this.elements.descriptionInput().type(description);
    this.elements.createSubmitBtn().should('be.visible').click();
  }

  addMessageBox() {
    cy.wait(5000); 
    this.elements.actionSearchInput().should('be.visible').type('Message Box');
    cy.wait(1000); 
    this.elements.messageBoxAction().first().should('be.visible').dblclick({ force: true });
    cy.contains('Enter the message to display', { timeout: 15000 }).should('be.visible');
  }

  configureMessage(text) {
    cy.wait(1000);
    this.elements.messageTextInput().should('exist').click({ force: true }).clear({ force: true }).type(text, { force: true });
  }

  saveBot() {
    // Just click save. No assertions/logging as requested.
    this.elements.saveButton().should('be.visible').click({ force: true });
    cy.wait(2000); // Small wait to ensure backend processes the save
  }
}

export default new TaskBotPage();