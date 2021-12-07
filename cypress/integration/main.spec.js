/// <reference types="Cypress" />

import Chance from "chance";
const chance = new Chance();

describe("Render Home Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should render the page", () => {
    cy.url().should("include", "/");
  });

  it("should have two navbar", () => {
    cy.get("nav").should("exist");
    cy.get("nav").should("have.length", 2);
  });

  it("should have footer", () => {
    cy.get("footer").should("exist");
  });

  it("should have navigation links", () => {
    cy.contains("Home").should("be.visible");
    cy.contains("Shop").should("be.visible");
    cy.contains("Orders").should("be.visible");
    cy.contains("Contact Us").should("be.visible");
    cy.contains("Login").should("be.visible");
    cy.contains("Register").should("be.visible");
    cy.contains("Welcome to Audiophile. Get lost in music.").should(
      "be.visible"
    );
    cy.contains("Shop Now").should("be.visible");
    cy.contains("Shop all your favorite brands.").should("be.visible");
  });

  it("has two slick slides", () => {
    cy.get(".slick-slider").should("have.length", 2);
  });

  it("has more than two slides per slick slider", () => {
    cy.get(".slick-slider").each(($el, index, $list) => {
      cy.wrap($el).find(".slick-slide").should("length.be.greaterThan", 2);
    });
  });
});

describe("Redirects from Home Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should redirect to shop page", () => {
    cy.contains("Shop Now").click();
    cy.url().should("include", "/home");
  });

  it("should redirect to contact page", () => {
    cy.contains("Contact Us").click();
    cy.url().should("include", "/contact-us");
  });

  it("should redirect to login page when user is not logged in and attempts to access orders page", () => {
    cy.contains("Orders").click();
    cy.url().should("include", "/login");
    cy.contains("Please login to view your orders").should("be.visible");
  });

  it("should redirect to login page when user is not logged in and attempts to access cart page", () => {
    cy.visit("/cart");
    cy.url().should("include", "/login");
    cy.contains("Please login to view your cart").should("be.visible");
  });

  it("should redirect to login page when user click buy now button", () => {
    cy.get(".slick-slider")
      .eq(0)
      .find(".slick-slide", "aria-hidden=[false]")
      .find("button")
      .contains("Buy Now")
      .click({
        force: true,
      });

    cy.url().should("include", "/login");
  });

  it("should redirect to login page when user click add to cart button", () => {
    cy.get(".slick-slider")
      .eq(0)
      .find(".slick-slide", "aria-hidden=[false]")
      .find("button")
      .contains("Add to Cart")
      .click({
        force: true,
      });

    cy.url().should("include", "/login");
  });
});

describe("Product Search and Get Links", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should search for a product and redirect on search", () => {
    const searchTerm = chance.word();
    cy.intercept("GET", "/api/products?*").as("searchProducts");

    cy.get("input[name=search]").type(searchTerm);
    cy.get("button[type=submit]").click();

    cy.wait("@searchProducts")
      .its("request.url")
      .should("include", `name=${searchTerm}`)
      .should("include", `description=${searchTerm}`);
  });

  it("should get products by category and redirect from navlink", () => {
    cy.intercept("GET", "/api/products?*").as("searchProducts");

    cy.get("#nav-categories button").eq(2).click();

    cy.wait("@searchProducts")
      .its("request.url")
      .should("include", "category=");
    cy.url().should("include", "/home");
  });

  it("should get products by brand from images in slick slider", () => {
    cy.intercept("GET", "/api/products?*").as("searchProducts");

    cy.get(".slick-slider")
      .eq(1)
      .find(".slick-slide", "aria-hidden=[false]")
      .find("img")
      .eq(0)
      .click({
        force: true,
      });

    cy.wait("@searchProducts").its("request.url").should("include", "brand[]=");
    cy.url().should("include", "/home");
  });

  it("should get products details from images in slick slider", () => {
    cy.get(".slick-slider")
      .eq(0)
      .find(".slick-slide", "aria-hidden=[false]")
      .find("img")
      .eq(0)
      .click({
        force: true,
      });
    cy.url().should("include", "/product/");
  });
});

describe("Redirects after Login", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/");
  });

  it("should redirect to orders page when user is logged in", () => {
    cy.contains("Orders").click();
    cy.url().should("include", "/orders");
  });

  it("should redirect to cart page when user is logged in", () => {
    cy.visit("/cart");
    cy.url().should("include", "/cart");
  });
});
