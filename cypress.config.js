const { defineConfig } = require("cypress");
const { downloadFile } = require("cypress-downloadfile/lib/addPlugin");

module.exports = defineConfig({
  env: {
    baseUrl : "https://preprod.backmarket.fr/fr-fr/register",
    noteApiBaseUrl : "https://practice.expandtesting.com/notes/api",
    MAILSLURP_API_KEY: "832858602b28853d5babf87101b99a217fdb5838a1515cd66805c3ba4968e090"
  },
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {downloadFile})
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
  reporter: "cypress-mochawesome-reporter", 
  reporterOptions: {
    reportFilename: "quest-report.html",
    reportPageTitle: "My quest's report",
    saveAllAttempts: false,
  },
});
