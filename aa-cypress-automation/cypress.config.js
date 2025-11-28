const { defineConfig } = require("cypress");
const fs = require("fs");

function loadEnv() {
  const path = "cypress.env.json";
  if (fs.existsSync(path)) {
    return JSON.parse(fs.readFileSync(path, "utf8"));
  }
  return {};
}

module.exports = defineConfig({
  e2e: {
    // Just the domain. Do NOT add /login or /#/home here
    baseUrl: "https://community.cloud.automationanywhere.digital", 
    defaultCommandTimeout: 15000,
    pageLoadTimeout: 60000,
    supportFile: "cypress/support/e2e.js",
    env: loadEnv(),
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});