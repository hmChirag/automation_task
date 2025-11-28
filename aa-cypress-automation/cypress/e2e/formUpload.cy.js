import LoginPage from '../pages/LoginPage';
import NavigationPage from '../pages/NavigationPage';
import FormPage from '../pages/FormPage';
import 'cypress-file-upload'; 

describe("Use Case 2: Form with Upload Flow", () => {
    
    const formName = `AutoForm_${Date.now()}`;
    const sampleText = "Testing Form Automation";
    const fileName = "test_file.txt"; 

    beforeEach(() => {
        const username = Cypress.env('USERNAME'); 
        const password = Cypress.env('PASSWORD');
        LoginPage.login(username, password);
        cy.wait(2000);
    });

    it("Should create a form, add inputs, and upload a file", () => {
        // 1. Navigate
        NavigationPage.navigateToAutomation();
        NavigationPage.startCreateForm();

        // 2. Create Form
        FormPage.createForm(formName);

        // 3. Add Elements (This matches your screenshot)
        FormPage.dragElementsToCanvas();

        // 4. Configure Labels (Satisfies "Verify UI interactions")
        FormPage.configureElements();

        // 5. Save & Preview (Satisfies "Save the form")
        FormPage.saveAndPreview();

        // 6. Test Logic (Upload & Type)
        FormPage.submitFormData(sampleText, fileName);

        cy.log('✅ Use Case 2 Complete!');
    });
});