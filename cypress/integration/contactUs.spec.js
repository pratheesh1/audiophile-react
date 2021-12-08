/// <reference types="Cypress" />

import Chance from "chance";
const chance = new Chance();

describe("Contact Us", () => {
  beforeEach(() => {
    cy.visit("/contact-us");
  });

  it("should display the contact us page", () => {
    cy.get("h1").should("contain", "Contact Us");
    cy.contains("Get in touch with the Audiophile team!").should("be.visible");
    cy.get('input[name="name"]').should("be.visible");
    cy.get('input[name="email"]').should("be.visible");
    cy.get('input[name="subject"]').should("be.visible");
    cy.get('textarea[name="message"]').should("be.visible");
    cy.get('button[type="submit"]').contains("Send").should("be.visible");
  });

  it("validates the form inputs", () => {
    cy.get('button[type="submit"]').contains("Send").click();
    cy.contains("Please fill all the fields").should("be.visible");

    cy.get('input[name="name"]').type(chance.name());
    cy.get('button[type="submit"]').contains("Send").click();
    cy.contains("Please fill all the fields").should("be.visible");

    cy.get('input[name="email"]').type(chance.email());
    cy.get('button[type="submit"]').contains("Send").click();
    cy.contains("Please fill all the fields").should("be.visible");

    cy.get('input[name="subject"]').type(chance.sentence());
    cy.get('button[type="submit"]').contains("Send").click();
    cy.contains("Please fill all the fields").should("be.visible");
  });

  it("should send the form", () => {
    cy.get('input[name="name"]').type(chance.name());
    cy.get('input[name="email"]').type(chance.email());
    cy.get('input[name="subject"]').type(chance.sentence());
    cy.get('textarea[name="message"]').type(chance.paragraph());
    cy.get('button[type="submit"]').contains("Send").click();
    cy.contains("Message sent successfully").should("be.visible");
  });
});
