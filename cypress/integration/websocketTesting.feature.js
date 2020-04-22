/// <reference types="Cypress" />

describe('Event link is updated via websocket', () => {
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
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/auth/validate_token',
      status: 200,
      response: 'fixture:validate-token.json',
    })
    cy.visit('/getting-started/student')
    cy.get('.bx--article-card').last().click()
    cy.get('.bx--modal-header__heading').should(
      'contain.text',
      'Connecting ACL2'
    )
    cy.get('.bx--modal-content__text').should(
      'contain.text',
      'Use the mobile HTTP firewall, then you can quantify the 1080p panel!Host: undefined undefined3 instructor led sessions'
    )
    cy.get('.bx--accordion__title').should('have.length', 3)
    cy.get('.bx--accordion__title').each((element, index) => {
      cy.get(element[0])
        .should('have.text', `Connecting ACL2 - part ${index + 1}`)
        .click()
    })
    cy.get('.bx--accordion__content').each((element, index) => {
      cy.get(element[0]).should(
        'not.contain.html',
        '<a href="https://hangouts.google.com/call" target="_blank" rel="noopener noreferrer" style="text-decoration: none; color: black;">Join hangout Here</a>'
      )
    })
    const event = [
      {
        id: 88,
        title: 'Connecting ACL2 - part 1',
        description:
          'Use the mobile HTTP firewall, then you can quantify the 1080p panel!',
        startDate: 'Tue, 11 Feb 2020 14:59:59 +0000',
        endDate: 'Tue, 11 Feb 2020 15:29:59 +0000',
        conference_link: 'https://hangouts.google.com/call',
      },
      {
        id: 89,
        title: 'Connecting ACL2 - part 2',
        description:
          'Use the mobile HTTP firewall, then you can quantify the 1080p panel!',
        startDate: 'Wed, 12 Feb 2020 14:59:59 +0000',
        endDate: 'Wed, 12 Feb 2020 15:29:59 +0000',
        conference_link: 'https://hangouts.google.com/call',
      },
      {
        id: 90,
        title: 'Connecting ACL2 - part 3',
        description:
          'Use the mobile HTTP firewall, then you can quantify the 1080p panel!',
        startDate: 'Thu, 13 Feb 2020 14:59:59 +0000',
        endDate: 'Thu, 13 Feb 2020 15:29:59 +0000',
        conference_link: 'https://hangouts.google.com/call',
      },
    ]

    cy.window()
      .its('store')
      .invoke('dispatch', { type: 'UPDATE_EVENTS', payload: event })

    cy.wait(5000)

    cy.get('.bx--accordion__content').each((element, index) => {
      cy.get(element[0]).should(
        'contain.html',
        '<a href="https://hangouts.google.com/call" target="_blank" rel="noopener noreferrer" style="text-decoration: none; color: black;">Join hangout Here</a>'
      )
    })
  })
})
