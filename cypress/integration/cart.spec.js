/// <reference types="Cypress" />

import Chance from "chance";
const chance = new Chance();

describe("Renders Cart", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
    cy.visit("/cart");
  });

  it("renders cart page properly", () => {
    cy.contains("Shopping Cart").should("be.visible");
    cy.contains("Items").should("be.visible");
    cy.contains("Order Summary").should("be.visible");
    cy.contains("Continue Shopping").should("be.visible");
    cy.get('button[type="submit"]').contains("Checkout").should("be.visible");
    cy.get('button[type="submit"]')
      .eq(1)
      .contains("Add Address")
      .should("be.visible");

    cy.get("label").contains("Address Line 1/Street").should("be.visible");
    cy.get("label").contains("City").should("be.visible");
    cy.get("label").contains("State").should("be.visible");
    cy.get("label").contains("Zip Code").should("be.visible");
    cy.get("label").contains("Country").should("be.visible");

    cy.get('input[name="street"]').should("be.visible");
    cy.get('input[name="city"]').should("be.visible");
    cy.get('input[name="state"]').should("be.visible");
    cy.get('input[name="zip"]').should("be.visible");
    cy.get('select[name="countryId"]').should("be.visible");
  });
});

describe("Add Address", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/cart");
  });

  it("valdates address fields", () => {
    cy.contains("button", "Add Address").click();
    cy.contains("Street/Address is required").should("be.visible");
    cy.contains("City is required").should("be.visible");
    cy.contains("State is required").should("be.visible");
    cy.contains("Zip is required").should("be.visible");
    cy.contains("Country selection is required!").should("be.visible");
  });

  it("adds new address", () => {
    const street = chance.street();
    const city = chance.city();
    const state = chance.state();
    const zip = chance.zip();

    cy.get('input[name="street"]').type(street);
    cy.get('input[name="city"]').type(city);
    cy.get('input[name="state"]').type(state);
    cy.get('input[name="zip"]').type(zip);
    cy.get('select[name="countryId"]').select("United States");

    cy.contains("button", "Add Address").click();

    cy.contains(street).should("be.visible");
    cy.contains(city).should("be.visible");
    cy.contains(state).should("be.visible");
    cy.contains(zip).should("be.visible");
  });
});

describe("Validations", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/cart");
  });

  it("show error when cart is empty and user tries to checkout", () => {
    cy.contains("button", "Checkout").click();
    cy.contains("Your cart is empty").should("be.visible");
  });
});

describe("Add to cart", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/home");
  });

  it("cart items are added properly", () => {
    cy.intercept("GET", "/api/cart*").as("cart");
    cy.get(".product-display-card")
      .eq(0)
      .contains("button", "Add to Cart")
      .click();

    cy.visit("/cart");
    cy.wait("@cart").then(() => {
      cy.wait("@cart").then(() => {
        cy.contains("No items in cart.").should("not.exist");
      });
    });
  });

  it("update cart items options are displayed once cart id not empty", () => {
    cy.intercept("GET", "/api/cart*").as("cart");
    cy.get(".product-display-card")
      .eq(0)
      .contains("button", "Add to Cart")
      .click();

    cy.visit("/cart");
    cy.contains("Remove").should("be.visible");
    cy.get(".fa-minus").should("be.visible");
    cy.get(".fa-plus").should("be.visible");
  });

  it("cart items are removed properly", () => {
    cy.intercept("GET", "/api/cart*").as("cart");
    cy.get(".product-display-card")
      .eq(0)
      .contains("button", "Add to Cart")
      .click();

    cy.visit("/cart");
    cy.wait("@cart").then(() => {
      cy.wait("@cart").then(() => {
        cy.contains("Remove").each(($el, index) => {
          cy.wrap($el).click();
        });
      });
    });
    cy.contains("Remove").should("not.exist");
    cy.get(".fa-minus").should("not.exist");
    cy.get(".fa-plus").should("not.exist");
    cy.contains("No items in cart.").should("be.visible");
  });

  it("cart items are updated properly", () => {
    cy.intercept("GET", "/api/cart*").as("cart");
    cy.get(".product-display-card")
      .eq(0)
      .contains("button", "Add to Cart")
      .click();

    cy.visit("/cart");
    cy.wait("@cart").then(() => {
      cy.wait("@cart").then(() => {
        cy.get("input[name='quantity']")
          .first()
          .invoke("val")
          .then((quantity) => {
            cy.get(".fa-plus").first().click();
            cy.wait("@cart").then(() => {
              cy.wait("@cart").then(() => {
                cy.wait("@cart").then(() => {
                  cy.get("input[name='quantity']")
                    .invoke("val")
                    .then((newQuantity) => {
                      expect(parseInt(newQuantity)).to.be.greaterThan(
                        parseInt(quantity)
                      );
                    });
                });
              });
            });
          });
      });
    });
    cy.contains("Item quantity updated.").should("be.visible");

    cy.get("input[name='quantity']")
      .invoke("val")
      .then((quantity) => {
        cy.get(".fa-minus").first().click();
        cy.wait("@cart").then(() => {
          cy.wait("@cart").then(() => {
            cy.get("input[name='quantity']")
              .invoke("val")
              .then((updateQuantity) => {
                expect(parseInt(updateQuantity)).to.be.lessThan(
                  parseInt(quantity)
                );
              });
          });
        });
      });
    cy.contains("Item quantity updated.").should("be.visible");
  });
});

describe("Checkout", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/home");
  });

  it("checkout successfully", () => {
    const street = chance.street();
    const city = chance.city();
    const state = chance.state();
    const zip = chance.zip();
    const email = chance.email();
    cy.get(".product-display-card")
      .eq(1)
      .contains("button", "Add to Cart")
      .click();
    cy.visit("/cart");

    cy.get('input[name="street"]').type(street);
    cy.get('input[name="city"]').type(city);
    cy.get('input[name="state"]').type(state);
    cy.get('input[name="zip"]').type(zip);
    cy.get('select[name="countryId"]').select("United States");
    cy.contains("button", "Add Address").click();

    // cy.contains("button", "Checkout").click();
  });
});

// Stripe checkout api do not support cypress integration
// This test need to be done manually
