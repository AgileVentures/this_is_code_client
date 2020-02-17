/// <reference types="Cypress" />

describe("User Can View Course Details", () => {
  beforeEach("", () => {
    cy.server();
    cy.route({
      method: "GET",
      url: "http://localhost:3000/courses",
      status: 200,
      response: "fixture:course-list.json"
    });
  });
  it("By Clicking The CourseCard (logged in User)", () => {
    cy.route({
      method: "GET",
      url: "http://localhost:3000/auth/validate_token",
      status: 200,
      response: "fixture:validate-token.json"
    });
    cy.visit("/getting-started/student");
    cy.get(".bx--article-card")
      .first()
      .click();
    cy.get(".bx--modal-header__heading").should(
      "contain.text",
      "Work The Web - The Beginnings"
    );
    cy.get(".bx--modal-content__text").should(
      "contain.text",
      "Note: Enrollment opens up in January 2020. Stay tuned.Code Basics Workshop | HTML/CSS/JavaScript & How the Web Works. We'll be covering basics of HTML, CSS, and JavaScript, and by the end of the session, you'll see the big picture of how internet applications are structured and how you can Work The Web - not only consume it.Host: Thomas Ochman1 instructor led session"
    );
    cy.get(".bx--accordion__title").should("have.length", 1);
    cy.get(".bx--accordion__title").each((element, index) => {
      cy.get(element[0]).should(
        "have.text",
        `Work The Web - The Beginnings part ${index + 1}`
      );
    });
    cy.get(".bx--btn--secondary").should(
      "have.text",
      "Buy a group membership for $25"
    );
    cy.get(".bx--btn--primary").should("have.text", "Get solo access for $100");
  });
  it("User get log in warning if not logged in", () => {
    cy.visit("/getting-started/student");
    cy.get(".bx--article-card")
      .first()
      .click();
    cy.get(".bx--modal-header__heading").should(
      "contain.text",
      "Work The Web - The Beginnings"
    );
    cy.get(".bx--modal-content__text").should(
      "contain.text",
      "Note: Enrollment opens up in January 2020. Stay tuned.Code Basics Workshop | HTML/CSS/JavaScript & How the Web Works. We'll be covering basics of HTML, CSS, and JavaScript, and by the end of the session, you'll see the big picture of how internet applications are structured and how you can Work The Web - not only consume it.Host: Thomas Ochman1 instructor led session"
    );
    cy.get(".bx--accordion__title").should("have.length", 1);
    cy.get(".bx--accordion__title").each((element, index) => {
      cy.get(element[0]).should(
        "have.text",
        `Work The Web - The Beginnings part ${index + 1}`
      );
    });
    cy.get(".bx--btn--secondary").should("have.text", "Cancel");
    cy.get(".bx--btn--primary").should(
      "have.text",
      "You need to be logged in to purchase a course"
    );
  });
});
