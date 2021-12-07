/// <reference types="Cypress" />

import Chance from "chance";
const chance = new Chance();

describe("Render Login Page", () => {
  beforeEach(() => {
    cy.visit("/login");
  });
  it("should have a navbar", () => {
    cy.get("nav").should("exist");
  });

  it("should have footer", () => {
    cy.get("footer").should("exist");
  });

  it("should render the page and form properly", () => {
    cy.contains(
      "Welcome to Audiophile. Your one stop shop for all things music."
    );
    cy.contains("Login").should("be.visible");
    cy.contains("Sign Up").should("be.visible");
    cy.get("input[name=email]").should("be.visible");
    cy.get("input[name=password]").should("be.visible");
    cy.get("button[type=submit]").contains("Login").should("be.visible");
    cy.get(".fa-eye").should("be.visible");
  });
});

describe("Login", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("should display error message if no email or password is entered", () => {
    cy.get("button[type=submit]").contains("Login").click();
    cy.contains("Email is required").should("be.visible");
    cy.contains("Password is required").should("be.visible");

    cy.get("input[name=email]").type(chance.email());
    cy.get("button[type=submit]").contains("Login").click();
    cy.contains("Password is required").should("be.visible");
  });

  it("should display error message if invalid email is entered", () => {
    cy.get("input[name=email]").type("invalidemail");
    cy.get("input[name=password]").type(chance.string({ length: 8 }));
    cy.get("button[type=submit]").contains("Login").click();
    cy.contains("Please enter a valid email!").should("be.visible");
  });

  it("should display error message if invalid email/password is entered", () => {
    cy.get("input[name=email]").type(chance.email());
    cy.get("input[name=password]").type(chance.string({ length: 10 }));
    cy.get("button[type=submit]").contains("Login").click();
    cy.contains("Invalid email or password. Please try again.").should(
      "be.visible"
    );
  });

  it("should successfully login if valid email/password is entered", () => {
    cy.fixture("credentials").as("credentials");
    cy.visit("/");
    cy.visit("/login");
    cy.get("@credentials").then((credentials) => {
      cy.get("input[name=email]").type(credentials.email);
      cy.get("input[name=password]").type(credentials.password);
      cy.get("button[type=submit]").contains("Login").click();
    });
    cy.contains("Login successful").should("be.visible", { timeout: 10000 });
    cy.url().should("not.contain", "/login", { timeout: 10000 });
  });
});
