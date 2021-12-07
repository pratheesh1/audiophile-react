/// <reference types="Cypress" />

describe("Renders Product Page", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
    cy.visit("/home");
    cy.get(".product-display-card").eq(0).click();
  });

  it("renders product page", () => {
    cy.url().should("include", "/product/");
    cy.contains("button", "Add to Cart").should("be.visible");
    cy.contains("button", "Buy Now").should("be.visible");
    cy.get('input[placeholder="Quantity"]')
      .should("be.visible")
      .invoke("val")
      .should("eq", "1");
  });
});
