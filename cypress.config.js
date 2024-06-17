const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: '',
  e2e: {
    supportFile: false,
    specPattern: 'cypress/specs/*.js',
  },
  chromeWebSecurity: false,
  browser: "chrome",
  chromeBinary: "/usr/bin/google-chrome"
});
