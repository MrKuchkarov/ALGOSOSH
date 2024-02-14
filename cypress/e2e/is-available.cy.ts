import {TEST_URL} from "../../src/constants/testing";

describe("Service is available", function () {
  it("Should be available on localhost:3000", function () {
    cy.visit(TEST_URL);
  });
});