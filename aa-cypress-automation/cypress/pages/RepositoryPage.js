class RepositoryPage {

  elements = {
    // 1. Search Input
    // In your screenshot, there is a clear search input next to "Name".
    // We target it by its placeholder "Search"
    searchInput: () => cy.get('input[placeholder="Search"]', { timeout: 20000 }),

    // 2. We don't need a specific table selector anymore. 
    // We will just verify text presence on the page.
  };

  navigateToRepository() {
    // 1. Force navigation to the Private Repository
    cy.visit('/#/bots/repository/private/');
    
    // 2. STABILITY WAIT:
    // Instead of waiting for a "table" class that might change, 
    // we wait for the Search Input to appear. This confirms the page is ready.
    this.elements.searchInput().should('be.visible');
  }

  verifyBotExists(botName) {
    cy.log(`Searching for bot: ${botName}`);

    // 1. Type the bot name
    this.elements.searchInput()
      .should('be.visible')
      .clear()
      .type(`${botName}{enter}`);

    // 2. Wait for the list to refresh (Simulate network wait)
    cy.wait(2000); 

    // 3. Verification
    // We simply check if the Bot Name text exists anywhere visible on the page.
    cy.contains(botName, { timeout: 15000 }).should('be.visible');
  }
}

export default new RepositoryPage();