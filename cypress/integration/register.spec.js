/// <reference types="Cypress" />

import Chance from "chance";
const chance = new Chance();

describe("Render Page", () => {
  beforeEach(() => {
    cy.visit("/register");
  });

  it("should display the register page", () => {
    cy.contains(
      "Welcome to Audiophile. Your one stop shop for all things music."
    ).should("be.visible");
    cy.contains("h1", "Sign Up").should("be.visible");

    cy.get("input[name='firstName']").should("be.visible");
    cy.get("input[name='lastName']").should("be.visible");

    cy.get("input[name='email']").should("be.visible");
    cy.get("input[name='password']").should("be.visible");
    cy.get("input[name='confirmPassword']").should("be.visible");

    cy.contains("Already have an account?").should("be.visible");
    cy.contains("Sign In").should("be.visible");

    cy.contains("button", "Sign Up").should("be.visible");
  });
});

describe("Form Validation", () => {
  beforeEach(() => {
    cy.visit("/register");
  });

  it("validates from inputs and display error messages", () => {
    cy.contains("button", "Sign Up").click();

    cy.contains("First name is required!").should("be.visible");
    cy.contains("Last name is required").should("be.visible");
    cy.contains("Email is required").should("be.visible");
    cy.contains("Password is required").should("be.visible");

    cy.get("input[name='firstName']").type(chance.first());
    cy.get("input[name='lastName']").type(chance.last());
    cy.get("input[name='email']").type(chance.string({ length: 10 }));
    cy.get("input[name='password']").type(chance.string({ length: 10 }));
    cy.get("input[name='confirmPassword']").type(chance.string({ length: 10 }));
    cy.contains("button", "Sign Up").click();

    cy.contains("Please enter a valid email!").should("be.visible");
    cy.contains("Passwords do not match").should("be.visible");
  });
});

describe("Register", () => {
  beforeEach(() => {
    cy.visit("/register");
  });

  it("should register a new user and redirect", () => {
    const firstName = chance.first();
    const lastName = chance.last();
    const email = chance.email();
    const password = "XwPgUh6Eqd6m59N!";
    const confirmPassword = password;

    cy.get("input[name='firstName']").type(firstName);
    cy.get("input[name='lastName']").type(lastName);
    cy.get("input[name='email']").type(email);
    cy.get("input[name='password']").type(password);
    cy.get("input[name='confirmPassword']").type(confirmPassword);
    cy.contains("button", "Sign Up").click();

    cy.contains("Signup successful").should("be.visible");
    cy.url().should("not.contain", "/register");
  });
});
