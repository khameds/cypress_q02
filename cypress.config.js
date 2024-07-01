const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    baseUrl : "https://preprod.backmarket.fr/fr-fr/register",
    noteApiBaseUrl : "https://practice.expandtesting.com/notes/api",
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
