/// <reference types="Cypress" />
describe("User Can Register", () => {
  const requestData = [];

  beforeEach(() => {
    cy.server({
      // We handle all requests passing through Cypress' server
      onResponse: (response) => {
        const regex = RegExp('localhost:8000')
        if (Cypress.env('RECORD')) {
          const url = response.url;
          const method = response.method;
          const data = response.response.body;
          // TODO: record headers
          console.table(response.response.body)
          !regex.test(response.url) && requestData.push({ url, method, data });
        }
      },
    })
    if (Cypress.env('RECORD')) {
      cy.route({
        method: 'POST',
        url: '*',
      });
    }

    if (!Cypress.env('RECORD')) {
      cy.fixture('fixtures').then((fixtures) => {
        fixtures.forEach(fixture => {
          cy.route(fixture.method, fixture.url, fixture.data);
        })
      });
    }
    cy.visit("/")
    cy.wait(500)
  })

  after(() => {
    // In record mode, save gathered XHR data to local JSON file
    if (Cypress.env('RECORD')) {
      const path = './cypress/fixtures/fixtures.json';
      cy.writeFile(path, requestData);
    }
  });
  it("On Mobile Device", () => {
    cy.viewport('iphone-x')
    cy.get('.bx--header__action--menu').click()
    cy.get('[name="register"]').click()
    cy.get('[name="email"]').type('john-doe@craft.se')
    cy.get('[name="firstName"]').type('John')
    cy.get('[name="lastName"]').type('Doe')
    cy.get('[name="password"]').type('password')
    cy.get('[name="passwordConfirmation"]').type('password')
    cy.get('button').contains('Register').click()
    cy.get('[aria-label="Side navigation"]').should('contain', 'Hello John')
  })

  it("On Desktop", () => {
    cy.viewport('macbook-15')
    cy.get('[name="register"]').click()
    cy.get('[name="email"]').type('john-doe@craft.se')
    cy.get('[name="firstName"]').type('John')
    cy.get('[name="lastName"]').type('Doe')
    cy.get('[name="password"]').type('password')
    cy.get('[name="passwordConfirmation"]').type('password')
    cy.get('button').contains('Register').click()
    cy.get('[aria-label="Side navigation"]').should('contain', 'Hello John')
  })
})