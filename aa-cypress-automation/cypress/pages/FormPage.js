class FormPage {

  elements = {
    // --- Modal ---
    nameInput: () => cy.get('input[name="name"]'),
    createButton: () => cy.get('button[name="submit"]'),

    // --- Form Builder Palette (Left Panel) ---
    // THE FIX: Using the 'title' attribute from your HTML snippets.
    // We navigate to the span with the specific title.
    textboxElement: () => cy.get('span[title="Text Box"]'),
    uploadElement: () => cy.get('span[title="Select File"]'),

    // --- Canvas ---
    canvas: () => cy.get('.form-editor-canvas, [data-cy="form-editor"], .canvas-container'),

    // --- Right Panel (Properties) ---
    // The "Element label" input in the properties panel
    labelInput: () => cy.get('input[name="label"]'),

    // --- Toolbar ---
    saveButton: () => cy.get('button').contains('Save'),
    previewButton: () => cy.get('button').contains('Preview'),

    // --- Preview Mode ---
    // In preview, we look for the input fields
    previewTextbox: () => cy.get('input[type="text"]').last(), 
    previewUploadInput: () => cy.get('input[type="file"]'),
    
    // --- Success State ---
    uploadedFile: (fileName) => cy.contains(fileName)
  };

  createForm(name) {
    this.elements.nameInput().should('be.visible').clear().type(name);
    this.elements.createButton().should('be.visible').click();
    cy.wait(5000); // Wait for editor to load
  }

  dragElementsToCanvas() {
    // 1. Add "Select File" (Upload)
    // We scroll because it might be lower in the list
    this.elements.uploadElement()
      .scrollIntoView()
      .should('be.visible')
      .dblclick({ force: true });
    
    cy.wait(1000);

    // 2. Add "Text Box"
    // We scroll because "T" is at the bottom of the alphabetized list
    this.elements.textboxElement()
      .scrollIntoView()
      .should('be.visible')
      .dblclick({ force: true });
    
    cy.wait(1000);
  }

  configureElements() {
    // 1. Rename Textbox
    // We click the "TextBox" on the canvas (visible in your screenshot)
    cy.contains('label', 'TextBox').click({ force: true });
    
    // Change label to "User Name" so we can identify it easily in Preview
    this.elements.labelInput().should('be.visible').clear().type('User Name');
    
    // 2. Rename Upload
    // We click "Select a file" on the canvas
    cy.contains('label', 'Select a file').click({ force: true });
    this.elements.labelInput().should('be.visible').clear().type('Upload Document');
  }

  saveAndPreview() {
    // CLICK SAVE
    this.elements.saveButton().click();
    
    // Validate Save (Look for "Saved" toast or status)
    cy.contains('Saved', { timeout: 10000 }).should('be.visible');
    
    // Go to Preview to test functionality
    this.elements.previewButton().click();
    
    // Wait for Preview to load our renamed label
    cy.contains('User Name', { timeout: 15000 }).should('be.visible');
  }

  submitFormData(text, fileName) {
    // 1. Type Text
    this.elements.previewTextbox().type(text);

    // 2. Upload File
    this.elements.previewUploadInput().attachFile(fileName);
    
    // 3. Verify Upload Success (File name appears)
    this.elements.uploadedFile(fileName).should('be.visible');
  }
}

export default new FormPage();