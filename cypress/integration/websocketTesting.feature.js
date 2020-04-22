/// <reference types="Cypress" />

import { withAssetPrefix } from "gatsby"

describe('Event link is updated via websocket', () => {
  // access redux state
  beforeEach('', () => {
    cy.server()
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/courses',
      status: 200,
      response: 'fixture:course-list.json',
    })
  })
  it('Event link is updated via websocket', () => {
    // set up page
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/auth/validate_token',
      status: 200,
      response: 'fixture:validate-token.json',
    })
    cy.visit('/getting-started/student')
    cy.get('.bx--article-card').first().click()
    cy.get('.bx--modal-header__heading').should(
      'contain.text',
      'Work The Web - The Beginnings'
    )
    cy.get('.bx--modal-content__text').should(
      'contain.text',
      "Code Basics Workshop | HTML/CSS/JavaScript & How the Web Works. We'll be covering basics of HTML, CSS, and JavaScript, and by the end of the session, you'll see the big picture of how internet applications are structured and how you can Work The Web - not only consume it.Host: Thomas Ochman1 instructor led session"
    )
    cy.get('.bx--accordion__title').should('have.length', 1)
    cy.get('.bx--accordion__title').each((element, index) => {
      cy.get(element[0])
        .should('have.text', `Work The Web - The Beginnings part ${index + 1}`)
        .click()
    })
    cy.get('.bx--accordion__content').should(
      'have.html',
      '<p>Date: 22nd Dec 01:00 to 22nd Dec 01:45</p>About: HTML/CSS/JavaScript &amp; How the Web Works.'
    )
cy.get('.bx--modal-close__icon').click()
cy.wait(5000)
    // dispatch action
    cy.window()
      .its('store')
      .invoke('dispatch', { type: 'UPDATE_EVENTS', payload: '' })
    // assert page change
  })
})
