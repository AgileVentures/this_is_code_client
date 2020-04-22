/// <reference types="Cypress" />

describe('User can buy a course', () => {
  const fillInStripeForm = () => {
    const input = [
      ['cardnumber', '4242424242424242'],
      ['exp-date', '1220'],
      ['cvc', '123'],
    ]
    cy.wait(1000)
    cy.get('.__PrivateStripeElement > iframe').each(($element, index, list) => {
      cy.get($element).then(($iframe) => {
        const body = $iframe.contents().find('body')
        cy.wrap(body)
          .find(`input[name=${input[index][0]}]`)
          .type(input[index][1], { delay: 10 })
      })
    })
  }
  beforeEach(() => {
    cy.server()
    cy.route({
      method: 'POST',
      url: 'http://localhost:3000/transactions',
      status: 200,
      response: 'fixture:group-transaction-success.json',
    })
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/courses',
      status: 200,
      response: 'fixture:course-list.json',
    })
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/auth/validate_token',
      status: 200,
      response: 'fixture:validate-token.json',
    })
  })
  it('User needs to be logged in to purchase a course', () => {
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/auth/validate_token',
      status: 401,
    })
    cy.visit('/getting-started/student')
    cy.get('.bx--article-card').first().click()
    cy.checkText('.bx--modal-header__heading', 'Work The Web - The Beginnings')
    cy.checkText('.bx--btn--secondary', 'Cancel')
    cy.checkText(
      '.bx--btn--primary',
      'You need to be logged in to purchase a course'
    )
  })
  it('Logged in User can buy a course', () => {
    cy.visit('/getting-started/student')
    cy.get('.bx--article-card').first().click()

    cy.checkText('.bx--modal-header__heading', 'Work The Web - The Beginnings')
    cy.checkText('.bx--btn--primary', 'Get solo access for $100')
    cy.checkText('.bx--btn--secondary', 'Buy a group membership for $25')

    cy.get('.bx--btn--secondary').click()

    fillInStripeForm()

    cy.get('.bx--btn--primary')
      .last()
      .should('have.text', 'Buy Work The Web - The Beginnings for $25')
      .click()
    cy.get('.bx--inline-notification').should('contain', 'Payment successful')
    cy.wait(5000)
    cy.get('.bx--article-card').first().click()
    cy.checkText('.bx--modal-header__heading', 'Work The Web - The Beginnings')
    cy.get('.bx--btn--primary')
      .should('have.text', 'You have already purchased this course')
      .and('be.disabled')
  })
  it('Logged in User can buy a solo course', () => {
    cy.visit('/getting-started/student')
    cy.get('.bx--article-card').first().click()

    cy.checkText('.bx--modal-header__heading', 'Work The Web - The Beginnings')
    cy.checkText('.bx--btn--secondary', 'Buy a group membership for $25')

    cy.get('.bx--btn--primary')
      .should('have.text', 'Get solo access for $100')
      .click()

    fillInStripeForm()

    cy.get('.bx--btn--primary')
      .last()
      .should('have.text', 'Buy Work The Web - The Beginnings for $100')
      .click()
    cy.wait(5000)
    cy.get('.bx--article-card').first().click()

    cy.checkText('.bx--modal-header__heading', 'Work The Web - The Beginnings')
    cy.checkText('.bx--btn--primary', 'You have already purchased this course')
  })
  it('Logged in User can register for a free course', () => {
    cy.visit('/getting-started/student')
    cy.get('.bx--article-card').eq(1).click()

    cy.checkText('.bx--modal-header__heading', 'Work The Web - Free')
    cy.checkText('.bx--btn--secondary', 'This course is FREE to attend!')

    cy.get('.bx--btn--primary')
      .should('have.text', 'Register for FREE!')
      .click()
    cy.get('.bx--article-card').eq(1).click()

    cy.checkText('.bx--modal-header__heading', 'Work The Web - Free')
    cy.checkText('.bx--btn--primary', 'You have already purchased this course')
  })
  it('Logged in User cannot buy a full course', () => {
    cy.visit('/getting-started/student')
    cy.get('.bx--article-card').eq(2).click()
    
    cy.checkText('.bx--modal-header__heading', 'Work The Web - Full Subscription')
    cy.get('.bx--btn--primary')
      .should('have.text', 'This course is full')
      .and('be.disabled')
  })
})
