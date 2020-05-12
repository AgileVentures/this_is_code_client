/// <reference types="Cypress" />

describe('User Can View Course Details', () => {
  beforeEach('', () => {
    cy.server()
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/courses',
      status: 200,
      response: 'fixture:course-list.json',
    })
  })
  it('By Clicking The CourseCard (logged in User)', () => {
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/auth/validate_token',
      status: 200,
      response: 'fixture:validate-token.json',
    })
    cy.visit('/getting-started/student')
      .get('.bx--article-card')
      .first()
      .click()
    cy.checkText('.bx--modal-header__heading', 'Work The Web - The Beginnings')
      .checkText(
        '.bx--modal-content__text',
        "Code Basics Workshop | HTML/CSS/JavaScript & How the Web Works. We'll be covering basics of HTML, CSS, and JavaScript, and by the end of the session, you'll see the big picture of how internet applications are structured and how you can Work The Web - not only consume it.Host: Thomas Ochman1 instructor led session"
      )
      .get('.bx--accordion__title')
      .should('have.length', 1)
      .get('.bx--accordion__title')
      .each((element, index) => {
        cy.checkText(
          element[0],
          `Work The Web - The Beginnings part ${index + 1}`
        )
      })

      .checkText('.bx--btn--secondary', 'Buy a group membership for $25')
      .checkText('.bx--btn--primary', 'Get solo access for $100')
  })
  it('User get log in warning if not logged in', () => {
    cy.visit('/getting-started/student')
      .get('.bx--article-card')
      .first()
      .click()

      .checkText('.bx--modal-header__heading', 'Work The Web - The Beginnings')

      .checkText(
        '.bx--modal-content__text',
        "Code Basics Workshop | HTML/CSS/JavaScript & How the Web Works. We'll be covering basics of HTML, CSS, and JavaScript, and by the end of the session, you'll see the big picture of how internet applications are structured and how you can Work The Web - not only consume it.Host: Thomas Ochman1 instructor led session"
      )
      .get('.bx--accordion__title')
      .should('have.length', 1)
      .get('.bx--accordion__title')
      .each((element, index) => {
        cy.checkText(
          element[0],
          `Work The Web - The Beginnings part ${index + 1}`
        )
      })
      .checkText('.bx--btn--secondary', 'Cancel')
      .checkText(
        '.bx--btn--primary',
        'You need to be logged in to purchase a course'
      )
  })
})
