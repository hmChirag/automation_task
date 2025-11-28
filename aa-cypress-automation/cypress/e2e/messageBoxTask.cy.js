import LoginPage from '../pages/LoginPage';
import NavigationPage from '../pages/NavigationPage';
import TaskBotPage from '../pages/TaskBotPage';
import RepositoryPage from '../pages/RepositoryPage';

describe("Use Case 1: Message Box Task Automation", () => {
    
    const botName = `AutoBot_${Date.now()}`; 
    const botDescription = "Created via Cypress Automation";

    beforeEach(() => {
        const username = Cypress.env('USERNAME'); 
        const password = Cypress.env('PASSWORD');
        LoginPage.login(username, password);
        cy.wait(2000); // Dashboard stability
    });

    it("Should create a Message Box task and verify it in the Repository", () => {
        // 1. Create Bot
        NavigationPage.navigateToAutomation();
        NavigationPage.startCreateTaskBot();
        TaskBotPage.createBot(botName, botDescription);
        
        // 2. Add Logic
        TaskBotPage.addMessageBox();
        TaskBotPage.configureMessage("Hello from Cypress!");
        
        // 3. Save (Process is done)
        TaskBotPage.saveBot();

        // 4. NEXT PROCESS: Verify in Repository
        RepositoryPage.navigateToRepository();
        RepositoryPage.verifyBotExists(botName);

        cy.log('✅ Use Case 1 Complete!');
    });
});