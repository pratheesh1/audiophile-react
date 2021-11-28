// renders the login page
describe("renders login page", () => {
  it("renders login page", () => {
    cy.visit("/login");
    cy.contains("Login");
  });
});
