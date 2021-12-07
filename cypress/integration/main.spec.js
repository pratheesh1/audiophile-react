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

  it("should have two nav", () => {
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
});
