/// <reference types="Cypress" />

import Chance from "chance";
const chance = new Chance();

describe("Page 404", () => {
  const string = chance.string();
  it("should display 404 page", () => {
    cy.visit(`/${string}`);
    cy.url().should("include", "404");
    cy.contains("a", "Go Back").should("be.visible");
  });
});

describe("Go Back", () => {
  it("should redirect to home page", () => {
    cy.visit("/404");
    cy.contains("a", "Go Back").click();
    cy.url().should("not.include", "404");
  });
});
