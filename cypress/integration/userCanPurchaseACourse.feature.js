/// <reference types="Cypress" />

describe("User can buy a course", () => {
  function fillInStripeForm() {
    cy.wait(1000);
    cy.get(".__PrivateStripeElement")
      .first()
      .type("4242424242424242", { delay: 10 });
    cy.get('iframe[name^="__privateStripeFrame5"]').then($iframe => {
      const $body = $iframe.contents().find("body");
      cy.wrap($body)
        .find('input[name="cardnumber"]')
        .type("4242424242424242", { delay: 10 });
    });
    cy.get('iframe[name^="__privateStripeFrame6"]').then($iframe => {
      const $body = $iframe.contents().find("body");
      cy.wrap($body)
        .find('input[name="exp-date"]')
        .type("1222");
    });
    cy.get('iframe[name^="__privateStripeFrame7"]').then($iframe => {
      const $body = $iframe.contents().find("body");
      cy.wrap($body)
        .find('input[name="cvc"]')
        .type("223");
    });
  }
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "POST",
      url: "http://localhost:3000/transactions",
      status: 200,
      response: "fixture:group-transaction-success.json"
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/courses",
      status: 200,
      response: "fixture:course-list.json"
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/auth/validate_token",
      status: 200,
      response: "fixture:validate-token.json"
    });
  });
  it("User needs to be logged in to purchase a course", () => {
    cy.route({
      method: "GET",
      url: "http://localhost:3000/auth/validate_token",
      status: 401
    });
    cy.visit("/getting-started/student");
    cy.get(".bx--article-card")
      .first()
      .click();
    cy.get(".bx--modal-header__heading").should(
      "contain.text",
      "Work The Web - The Beginnings"
    );
    cy.get(".bx--btn--secondary").should(
      "have.text",
      "You need to be logged in to purchase a course"
    );
    cy.get(".bx--btn--primary").should(
      "have.text",
      "You need to be logged in to purchase a course"
    );
  });
  it("Logged in User can buy a course", () => {
    
    cy.visit("/getting-started/student");
    cy.get(".bx--article-card")
      .first()
      .click();
    cy.get(".bx--modal-header__heading").should(
      "contain.text",
      "Work The Web - The Beginnings"
    );
    cy.get(".bx--btn--primary").should("have.text", "Get solo access for $100");
    cy.get(".bx--btn--secondary")
      .should("have.text", "Buy a group membership for $25")
      .click();
    fillInStripeForm();
    cy.get(".bx--btn--primary")
      .last()
      .should("have.text", "Buy Work The Web - The Beginnings for $25")
      .click();
    cy.wait(1000);
    cy.get(".bx--btn--primary")
      .last()
      .should("have.text", "You have already purchased this course");
  });
  it("Logged in User can buy a solo course", () => {
    cy.visit("/getting-started/student");
    cy.get(".bx--article-card")
      .first()
      .click();
    cy.get(".bx--modal-header__heading").should(
      "contain.text",
      "Work The Web - The Beginnings"
    );
    cy.get(".bx--btn--secondary").should(
      "have.text",
      "Buy a group membership for $25"
    );
    cy.get(".bx--btn--primary")
      .should("have.text", "Get solo access for $100")
      .click();

    fillInStripeForm();
    cy.get(".bx--btn--primary")
      .last()
      .should("have.text", "Buy Work The Web - The Beginnings for $100")
      .click();
    cy.wait(1000);
    cy.get(".bx--btn--primary")
      .last()
      .should("have.text", "You have already purchased this course");
  });
});
