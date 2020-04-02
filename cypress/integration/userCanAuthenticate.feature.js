/// <reference types="Cypress" />
describe('User Can Authenticate', () => {
  const requestData = []

  beforeEach(() => {
    cy.server({
      // We handle all requests passing through Cypress' server
      onResponse: response => {
        const regex = RegExp('localhost:8000')
        if (Cypress.env('RECORD')) {
          const url = response.url
          const method = response.method
          const data = response.response.body
          // TODO: record headers
          console.table(response.response.body)
          !regex.test(response.url) && requestData.push({ url, method, data })
        }
      }
    })
    if (Cypress.env('RECORD')) {
      cy.route({
        method: 'POST',
        url: '*'
      })
    }
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/courses',
      status: 200,
      response: 'fixture:course-list.json'
    })
    if (!Cypress.env('RECORD')) {
      cy.fixture('fixtures').then(fixtures => {
        fixtures.forEach(fixture => {
          cy.route(fixture.method, fixture.url, fixture.data)
        })
      })
    }
    cy.visit('/')
    cy.wait(500)
  })

  after(() => {
    if (Cypress.env('RECORD')) {
      const path = './cypress/fixtures/fixtures.json'
      cy.writeFile(path, requestData)
    }
  })

  describe('Sign up', () => {
    it('On Mobile Device', () => {
      cy.viewport('iphone-x')
      cy.get('.bx--header__action--menu').click()
      cy.get('[name="register"]').click()
      cy.get('[name="email"]').type('john-doe1@craft.se')
      cy.get('[name="firstName"]').type('John')
      cy.get('[name="lastName"]').type('Doe')
      cy.get('[name="password"]').type('password')
      cy.get('[name="passwordConfirmation"]').type('password')
      cy.get('button')
        .contains('Register')
        .click()
      cy.get('[aria-label="Side navigation"]').should('contain', 'Hello John')
      cy.get('.bx--toast-notification').should(
        'contain',
        'Nice to see you John!'
      )
    })

    it('On Desktop', () => {
      cy.viewport('macbook-15')
      cy.get('[name="register"]').click()
      cy.get('[name="email"]').type('john-doe2@craft.se')
      cy.get('[name="firstName"]').type('John')
      cy.get('[name="lastName"]').type('Doe')
      cy.get('[name="password"]').type('password')
      cy.get('[name="passwordConfirmation"]').type('password')
      cy.get('button')
        .contains('Register')
        .click()
      cy.get('[aria-label="Side navigation"]').should('contain', 'Hello John')
      cy.get('.bx--toast-notification').should(
        'contain',
        'Nice to see you John!'
      )
    })
  })

  describe('Login', () => {
    it('On Desktop', () => {
      cy.route({
        method: 'GET',
        url: 'http://localhost:3000/auth/validate_token',
        status: 200,
        response: 'fixture:validate-token.json'
      })
      cy.route({
        method: 'GET',
        url: 'http://localhost:3000/courses',
        status: 200,
        response: 'fixture:course-list.json'
      })
      cy.viewport('macbook-15')
      cy.get('[name="login"]').click()
      cy.get('[name="email"]').type('student@mail.com')
      cy.get('[name="password"]').type('password')
      cy.get('button')
        .contains('Log in')
        .click()
      cy.get('[aria-label="Side navigation"]').should(
        'contain',
        'Hello Student'
      )
      cy.get('.bx--toast-notification').should(
        'contain',
        'Nice to see you Student!'
      )
    })
  })
})
