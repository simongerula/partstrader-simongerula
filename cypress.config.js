const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    baseUrl : 'https://opensource-demo.orangehrmlive.com/web/index.php',
    experimentalRunAllSpecs: true
  },
  reporter: 'cypress-mochawesome-reporter',
  video: true,
  downloadsFolder: './downloads',
  viewportWidth: 1200,
  viewportHeight: 660,
  env: {
    backend_url: 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2'
  }
});
