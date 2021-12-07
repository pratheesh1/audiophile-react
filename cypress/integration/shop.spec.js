/// <reference types="Cypress" />

import Chance from "chance";
const chance = new Chance();

describe("Shop", () => {
  beforeEach(() => {
    cy.visit("/home");
  });

  it("should display the shop page", () => {
    cy.contains("Showing").should("be.visible");
    cy.contains("Showing").should("be.visible");
    cy.contains("Sort By").should("be.visible");
    cy.get("select[name=sort]").should("be.visible");
    cy.get("button").contains("Reset Filters").should("be.visible");
    cy.get("button").contains("Filters").should("be.visible");
    cy.contains("Price Range").should("be.visible");
    cy.get("input[name=cost_min]").should("be.visible");
    cy.get("input[name=cost_max]").should("be.visible");
    cy.contains("Category").should("be.visible");
    cy.get("select[name=category]").should("be.visible");
    cy.contains("Brand").should("be.visible");
    cy.get("select[name=brand]").should("be.visible");
    cy.contains("Bluetooth").should("be.visible");
    cy.get("select[name=bluetooth]").should("be.visible");
    cy.contains("Frequency Response").should("be.visible");
    cy.get("select[name=frequencyResponseId]").should("be.visible");
    cy.contains("Impedance Range").should("be.visible");
    cy.get("select[name=impedanceRangeId]").should("be.visible");
  });

  it("should display one or more products", () => {
    cy.get(".product-display-card").should("have.length.gte", 1);
  });

  it("should display all product card properly", () => {
    cy.get(".product-display-card").each(($el, index, $list) => {
      cy.wrap($el).find("button").contains("Add to Cart").should("be.visible");
      cy.wrap($el).find("button").contains("Buy Now").should("be.visible");
      cy.wrap($el).contains("$").should("be.visible");
    });
  });

  it("should display the product details page", () => {
    cy.get(".product-display-card").eq(0).click();
    cy.url().should("include", "/product");
  });
});

describe("Filter Products", () => {
  beforeEach(() => {
    cy.visit("/home");
  });

  it("should search for a product", () => {
    const searchTerm = chance.word();
    cy.intercept("GET", "/api/products?*").as("searchProducts");

    cy.get("input[name=search]").type(searchTerm);
    cy.get("button[type=submit]").click();

    cy.wait("@searchProducts")
      .its("request.url")
      .should("include", `name=${searchTerm}`)
      .should("include", `description=${searchTerm}`);
  });

  it("should sort products by selection", () => {
    cy.intercept("GET", "/api/products?*").as("searchProducts");

    cy.get("select[name=sort]").select("Price");
    cy.wait("@searchProducts")
      .its("request.url")
      .should("include", "sort=baseCost");

    cy.get("select[name=sort]").select("Name");
    cy.wait("@searchProducts")
      .its("request.url")
      .should("include", "sort=name");
  });

  it("should filter products by price", () => {
    cy.intercept("GET", "/api/products?*").as("searchProducts");

    cy.get("input[name=cost_min]").type("100");
    cy.get("input[name=cost_max]").type("200");
    cy.get("button").contains("Filter Products").click();

    cy.wait("@searchProducts")
      .its("request.url")
      .should("include", "cost_min=100")
      .should("include", "cost_max=200");
  });

  it("should filter products by category", () => {
    cy.intercept("GET", "/api/products?*").as("searchProducts");

    cy.get("select[name=category]").select(5);
    cy.get("button").contains("Filter Products").click();

    cy.wait("@searchProducts")
      .its("request.url")
      .should("include", "category=");
  });

  it("should filter products by brand", () => {
    cy.intercept("GET", "/api/products?*").as("searchProducts");

    cy.get("select[name=brand]").select([1, 2, 5]);
    cy.get("button").contains("Filter Products").click();

    cy.wait("@searchProducts").its("request.url").should("include", "brand[]");
  });

  it("should filter products by bluetooth", () => {
    cy.intercept("GET", "/api/products?*").as("searchProducts");

    cy.get("select[name=bluetooth]").select("Yes");
    cy.get("button").contains("Filter Products").click();

    cy.wait("@searchProducts")
      .its("request.url")
      .should("include", "bluetooth=");
  });

  it("should filter products by frequency response", () => {
    cy.intercept("GET", "/api/products?*").as("searchProducts");

    cy.get("select[name=frequencyResponseId]").select([1, 2, 5]);
    cy.get("button").contains("Filter Products").click();

    cy.wait("@searchProducts")
      .its("request.url")
      .should("include", "frequencyResponseId[]");
  });

  it("should filter products by impedance range", () => {
    cy.intercept("GET", "/api/products?*").as("searchProducts");

    cy.get("select[name=impedanceRangeId]").select([3, 4, 5]);
    cy.get("button").contains("Filter Products").click();

    cy.wait("@searchProducts")
      .its("request.url")
      .should("include", "impedanceRangeId[]");
  });
});

//add to cart and redirects from product cards are the same since they are the same components
//hence the test is the same compared to main page and is not repeated
