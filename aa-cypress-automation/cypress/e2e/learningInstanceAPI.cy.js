describe("Use Case 3: Learning Instance API Automation", () => {

  const baseUrl = Cypress.config('baseUrl'); 
  let authToken = "";
  
  // 1. LOGIN API
  before(() => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/v2/authentication`, 
      body: {
        username: Cypress.env('USERNAME'),
        password: Cypress.env('PASSWORD'),
        loginType: "basic" 
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      authToken = response.body.token;
      cy.log('🔑 Auth Token Retrieved');
    });
  });

  it("Should create a Learning Instance via API", () => {
    const instanceName = `API_Instance_${Date.now()}`;

    // 2. DEFINE PAYLOAD
    const payload = {
      "name": instanceName,
      "description": "Created via Cypress Automation",
      "domainId": "33DED827-3DC4-4201-B478-7C15B94AF522", // Invoice Domain
      "domainLanguageId": "B62EFA19-3592-4D2B-910A-E9C1C7DAE1A9", // English
      "domainLanguageProviderId": "D6CCA488-207A-4FCA-94E0-74E2FCA38B40", // Provider
      
      "genaiProvider": null,
      "useGenai": false,
      "isGenAIEnabled": false,
      "isCloudExtraction": false,
      "isDefault": true,
      "isHeuristicFeedbackEnabled": true,
      "locale": "en-US",
      "rules": [],
      
      // THE FIX: define a 'Custom' field instead of a System field.
      // This bypasses the need for "domainObjectId" (IQLI306 error).
      "fields": [
        {
          "name": "MyCustomField",
          "displayName": "My Custom Field",
          "type": "Text",
          "isTable": false,
          "isCustom": true, // <--- THIS FIXES THE ERROR
          "validationEnabled": false
        }
      ],
      "tables": [] 
    };

    // 3. SEND CREATE REQUEST
    cy.request({
      method: 'POST',
      url: `${baseUrl}/cognitive/v3/learninginstances`, 
      headers: {
        'X-Authorization': authToken, 
        'Content-Type': 'application/json'
      },
      body: payload,
      failOnStatusCode: false
    }).then((response) => {
      
      // ERROR DEBUGGING
      if (response.status === 400 || response.status === 500) {
        const errorDetails = JSON.stringify(response.body);
        cy.log(`🟥 SERVER ERROR: ${errorDetails}`);
        throw new Error(`API returned ${response.status}: ${errorDetails}`);
      }

      // 4. VALIDATIONS
      expect(response.status).to.be.oneOf([200, 201]);
      expect(response.body).to.have.property('id');
      expect(response.body.name).to.eq(instanceName);
      
      cy.log('✅ Learning Instance Created: ' + response.body.id);
    });
  });

});