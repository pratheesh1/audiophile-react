/// <reference types="Cypress" />

import Chance from "chance";
const chance = new Chance();

describe("Renders Orders", () => {
  beforeEach(() => {
    cy.login();
  });

  it("renders orders page properly", () => {
    cy.visit("/orders");

    cy.contains("View Your Orders:").should("be.visible");
    cy.contains("Order Details:").should("be.visible");
  });

  it("makes proper api requests", () => {
    cy.intercept("GET", "/api/orders*").as("order");
    cy.visit("/orders");

    cy.wait("@order").then((interception) => {
      expect(interception.response.statusCode).to.be.oneOf([
        200, 201, 304, 301,
      ]);
    });
  });
});
