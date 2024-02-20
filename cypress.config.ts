import { defineConfig } from "cypress";
import Config = Cypress.Config;

export default defineConfig({
  e2e: {
    setupNodeEvents(on: any, config: Config) {
      // implement node event listeners here
    },
  },
});
