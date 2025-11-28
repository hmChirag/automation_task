import loginPage from '../pages/LoginPage';

describe('Automation Anywhere Login Test', () => {

  it('Logs in successfully using Page Object Model', () => {

    // 1. Get Credentials
    const user = Cypress.env('USERNAME');
    const pass = Cypress.env('PASSWORD');

    // 2. Check if credentials exist
    if (!user || !pass) {
      throw new Error('❌ Missing credentials in cypress.env.json');
    }

    // 3. Execute Login Steps
    loginPage.visit();
    loginPage.fillUsername(user);
    loginPage.fillPassword(pass);
    loginPage.submit();
    
    // 4. Assert Success
    loginPage.assertLoggedIn();
  });

});