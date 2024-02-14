/// <reference types="cypress" />
import {TEST_URL} from "../../src/constants/testing"
describe("App works correctly with routes", function() {
  before(function() {
    cy.visit(TEST_URL);
  });

  it("Should be open string page", function() {
    cy.visit(`${TEST_URL}/iterative`);
    cy.contains("Строка");
    cy.contains("К оглавлению").click();
  });

  it("Should be open fibonacci page", function() {
    cy.visit(`${TEST_URL}/fibonacci`);
    cy.contains("Последовательность Фибоначчи");
    cy.contains("К оглавлению").click();
  });

  it("Should be open sorting page", function() {
    cy.visit(`${TEST_URL}/sorting`);
    cy.contains("Сортировка массива");
    cy.contains("К оглавлению").click();
  });

  it("Should be open stack page", function() {
    cy.visit(`${TEST_URL}/stack`);
    cy.contains("Стек");
    cy.contains("К оглавлению").click();
  });

  it("Should be open queue page", function() {
    cy.visit(`${TEST_URL}/queue`);
    cy.contains("Очередь");
    cy.contains("К оглавлению").click();
  });

  it("Should be open list page", function() {
    cy.visit(`${TEST_URL}/list`);
    cy.contains("Связный список");
    cy.contains("К оглавлению").click();
  });
});