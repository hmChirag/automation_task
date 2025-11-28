# AA Cypress Automation

A comprehensive end-to-end test automation suite for **Automation Anywhere** built with **Cypress**, following the Page Object Model (POM) pattern. This project includes tests for login functionality, form uploads, debugging environment configurations, learning instance APIs, message box tasks, and smoke tests.

---

## Table of Contents

- [Overview](#overview)
- [Framework and Tools](#framework-and-tools)
- [Setup Instructions](#setup-instructions)
- [Execution Instructions](#execution-instructions)
- [Project Structure](#project-structure)
- [Environment Configuration](#environment-configuration)
- [Test Files](#test-files)
- [Page Objects](#page-objects)
- [Troubleshooting](#troubleshooting)

---

## Overview

This automation framework is designed for testing the **Automation Anywhere** cloud platform. It provides:

- **Page Object Model Pattern**: Organized and maintainable test code
- **Reusable Commands**: Common Cypress commands for file uploads and login functionality
- **Environment-Based Configuration**: Secure credentials management via `cypress.env.json`
- **Comprehensive Test Coverage**: Smoke tests, API tests, UI tests, and form upload tests
- **HTML Reporting**: Mochawesome reporter for detailed test execution reports

---

## Framework and Tools

| Tool/Library | Version | Purpose |
|---|---|---|
| **Cypress** | ^15.7.0 | End-to-end test automation framework |
| **Node.js** | LTS recommended | Runtime environment for running Cypress |
| **npm** | Latest | Package manager for dependencies |
| **Mochawesome** | ^7.1.4 | HTML test reporter for detailed reports |
| **cypress-file-upload** | ^5.0.8 | Plugin for handling file upload interactions |
| **@4tw/cypress-drag-drop** | ^2.3.1 | Plugin for drag-and-drop interactions |
| **dotenv** | ^17.2.3 | Environment variable management |

**Test Framework**: Mocha BDD (Behavior-Driven Development)  
**Assertion Library**: Chai (included with Cypress)

---

## Setup Instructions

### Prerequisites

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** (for cloning the repository)
- A valid **Automation Anywhere** account with cloud access

### Installation Steps

1. **Clone the repository** (if not already done):
   ```bash
   git clone <repository-url>
   cd aa-cypress-automation
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment credentials**:

   Update the `cypress.env.json` file with your Automation Anywhere credentials:

   ```json
   {
     "USERNAME": "your-email@example.com",
     "PASSWORD": "your-secure-password"
   }
   ```

   ⚠️ **Important**: Never commit `cypress.env.json` to version control. Add it to `.gitignore`:
   ```
   cypress.env.json
   node_modules/
   cypress/reports/
   ```

4. **Verify installation**:
   ```bash
   npm run cypress:open
   ```

   This opens the Cypress Test Runner GUI in interactive mode.

---

## Execution Instructions

### Running Tests in Interactive Mode (Development)

Open the Cypress Test Runner for interactive debugging and test execution:

```bash
npm run cypress:open
```

Or directly:

```bash
npx cypress open
```

This allows you to:
- View tests in real-time
- Debug with browser developer tools
- Step through tests
- Inspect elements

### Running Tests in Headless Mode (CI/CD)

Execute all tests without opening the GUI and generate HTML reports:

```bash
npm run cypress:run
```

Or:

```bash
npm test
```

**Output**: Test reports are generated in `cypress/reports/` directory.

### Running Specific Test Files

```bash
npx cypress run --spec "cypress/e2e/login.cy.js"
```

Multiple test files:

```bash
npx cypress run --spec "cypress/e2e/login.cy.js,cypress/e2e/smoke.cy.js"
```

### Running Tests with a Specific Browser

```bash
npx cypress run --browser chrome
npx cypress run --browser firefox
npx cypress run --browser edge
```

### Running Tests with Custom Configuration

```bash
npx cypress run --config baseUrl=https://custom-url.com
```

---

## Project Structure

```
aa-cypress-automation/
├── cypress/
│   ├── e2e/                           # End-to-end test files
│   │   ├── login.cy.js                # Login functionality tests
│   │   ├── smoke.cy.js                # Smoke tests for basic functionality
│   │   ├── formUpload.cy.js           # Form upload feature tests
│   │   ├── learningInstanceAPI.cy.js  # Learning instance API tests
│   │   ├── messageBoxTask.cy.js       # Message box interaction tests
│   │   └── debugEnv.cy.js             # Debug environment tests
│   │
│   ├── pages/                         # Page Object Model classes
│   │   ├── LoginPage.js               # Login page interactions
│   │   ├── NavigationPage.js          # Navigation and menu interactions
│   │   ├── FormPage.js                # Form page interactions
│   │   ├── RepositoryPage.js          # Repository page interactions
│   │   └── TaskBotPage.js             # TaskBot page interactions
│   │
│   ├── fixtures/                      # Test data files
│   │   └── test_file.txt              # Sample test file for upload tests
│   │
│   ├── support/                       # Cypress support files
│   │   ├── e2e.js                     # E2E test setup and hooks
│   │   └── commands.js                # Custom Cypress commands
│   │
│   ├── downloads/                     # Directory for downloaded files (auto-created)
│   └── reports/                       # Test execution reports (auto-created)
│
├── cypress.config.js                  # Cypress configuration file
├── cypress.env.json                   # Environment variables (credentials)
├── package.json                       # Project dependencies and scripts
├── package-lock.json                  # Locked dependency versions
└── README.md                          # This file
```

---

## Environment Configuration

### cypress.config.js

Key configuration settings:

```javascript
{
  baseUrl: "https://community.cloud.automationanywhere.digital",
  defaultCommandTimeout: 15000,        // 15 seconds for command execution
  pageLoadTimeout: 60000,              // 60 seconds for page loads
  supportFile: "cypress/support/e2e.js",
  env: loadEnv()                       // Loads credentials from cypress.env.json
}
```

**Key Settings**:

| Setting | Value | Purpose |
|---|---|---|
| `baseUrl` | `https://community.cloud.automationanywhere.digital` | Base URL for Automation Anywhere cloud platform |
| `defaultCommandTimeout` | 15000 ms | Maximum time for a Cypress command to complete |
| `pageLoadTimeout` | 60000 ms | Maximum time to wait for a page to load |
| `supportFile` | `cypress/support/e2e.js` | Support file for global setup |

### cypress.env.json

Store sensitive data like credentials:

```json
{
  "USERNAME": "your-email@example.com",
  "PASSWORD": "your-secure-password"
}
```

**Access in tests**:
```javascript
const username = Cypress.env('USERNAME');
const password = Cypress.env('PASSWORD');
```

⚠️ **Security Best Practices**:
- Never hardcode credentials in test files
- Keep `cypress.env.json` out of version control (add to `.gitignore`)
- Use environment variables in CI/CD pipelines
- Rotate credentials regularly

---

## Test Files

### 1. **login.cy.js**
Tests the login functionality using the Page Object Model pattern.
- **Scope**: User authentication and session management
- **Tests**: Successful login, credential validation
- **Dependencies**: LoginPage object model

### 2. **smoke.cy.js**
Basic sanity tests covering critical user flows.
- **Scope**: Core platform functionality
- **Tests**: Navigation, UI element visibility, basic interactions

### 3. **formUpload.cy.js**
Tests file upload functionality and form submission.
- **Scope**: Form interactions and file uploads
- **Tests**: File selection, validation, submission
- **Dependencies**: cypress-file-upload plugin

### 4. **learningInstanceAPI.cy.js**
Tests API endpoints related to learning instances.
- **Scope**: Backend API functionality
- **Tests**: API calls, response validation, error handling

### 5. **messageBoxTask.cy.js**
Tests message box interactions and task notifications.
- **Scope**: User notifications and message handling
- **Tests**: Message display, task triggers, acknowledgment

### 6. **debugEnv.cy.js**
Debug and environment configuration validation tests.
- **Scope**: Environment setup verification
- **Tests**: Credential loading, configuration checks

---

## Page Objects

Following the **Page Object Model (POM)** design pattern for maintainability and reusability.

### LoginPage.js

```javascript
// Methods available:
- visit()                    // Navigate to login page
- fillUsername(username)     // Enter username
- fillPassword(password)     // Enter password
- submit()                   // Click login button
- assertLoggedIn()           // Verify successful login
- login(username, password)  // Combined login flow
```

### Example Usage:
```javascript
import loginPage from '../pages/LoginPage';

loginPage.visit();
loginPage.fillUsername('user@example.com');
loginPage.fillPassword('password123');
loginPage.submit();
loginPage.assertLoggedIn();
```

---

## Custom Commands

Located in `cypress/support/commands.js`:

### Login Command

```javascript
cy.login(username, password)
```

**Example**:
```javascript
cy.login('user@example.com', 'password123');
```

### File Upload Command

```javascript
cy.attachFile('filename')
```

**Example**:
```javascript
cy.get('input[type="file"]').attachFile('test_file.txt');
```

---

## Troubleshooting

### Issue: "❌ Missing credentials in cypress.env.json"

**Solution**:
1. Ensure `cypress.env.json` exists in the project root
2. Verify it contains `USERNAME` and `PASSWORD` fields
3. Check file format is valid JSON

### Issue: Tests timing out

**Solutions**:
- Increase `defaultCommandTimeout` in `cypress.config.js`
- Check internet connectivity to the application
- Verify the application is accessible at the configured `baseUrl`
- Check for slow network conditions

### Issue: "baseUrl not configured" or 404 errors

**Solution**:
Verify in `cypress.config.js`:
```javascript
baseUrl: "https://community.cloud.automationanywhere.digital"
```

### Issue: File upload tests fail

**Solution**:
1. Ensure `cypress-file-upload` is installed: `npm install --save-dev cypress-file-upload`
2. Verify test file exists in `cypress/fixtures/`
3. Check file path in test: `cy.attachFile('fixtures/test_file.txt')`

### Issue: Browser won't launch

**Solutions**:
- Clear Cypress cache: `npx cypress cache clear`
- Reinstall Cypress: `npm install --save-dev cypress`
- Check system browser installation (Chrome/Firefox/Edge)

