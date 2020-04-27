/// <reference types="Cypress" />

const manualWebSocket = require('manual-web-socket')

describe('Event link is updated via websocket', () => {
  beforeEach('', () => {
    cy.server()
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
    cy.route({
      method: 'POST',
      url: 'https://localhost:5000/auth/login',
      status: 200,
      response: 'fixture:course-list.json',
    })
  })

  it('Event link is updated via websocket', () => {
    const checkArticleDetails = () => {
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
    }
    cy.visit('/getting-started/student').then(() => {
      checkArticleDetails()
      cy.get('.bx--accordion__content').each((element, index) => {
        cy.get(element[0]).should(
          'not.contain.html',
          '<a href="https://hangouts.google.com/call" target="_blank" rel="noopener noreferrer" style="text-decoration: none; color: black;">Join hangout Here</a>'
        )
      })
    })
    cy.visit('/getting-started/student', {
      onBeforeLoad(win) {
        var script = win.document.createElement('script')
        script.innerText = manualWebSocket.getScript()
        win.document.head.appendChild(script)
        win.mws.track(['wss://localhost:5000/connection'])
      },
    }).then((win) => {
      const mws = win.mws
      const connections = mws.trackedConnections
      let trackedConnection
      trackedConnection = connections.getByUrl(
        'wss://localhost:5000/connection'
      )
      trackedConnection.readyState = mws.readyState.OPEN
      const message1 = 'connection open with client'

      const event = {
        message: {
          events: [
            {
              id: 88,
              title: 'Connecting ACL2 - part 1',

              conference_link: 'https://hangouts.google.com/call',
            },
            {
              id: 89,
              title: 'Connecting ACL2 - part 2',
              conference_link: 'https://hangouts.google.com/call',
            },
            {
              id: 90,
              title: 'Connecting ACL2 - part 3',
              conference_link: 'https://hangouts.google.com/call',
            },
          ],
        },
      }

      const payload = { data: JSON.stringify(event) }
      trackedConnection.addServerScenario(
        'connection open with client',
        (connection, message) => {
          connection.reciveMessage(payload)
          console.log(message, event)
        }
      )
      trackedConnection.send(message1)
      checkArticleDetails()
      cy.get('.bx--accordion__content').each((element, index) => {
        cy.get(element[0]).should(
          'contain.html',
          '<a href="https://hangouts.google.com/call" target="_blank" rel="noopener noreferrer" style="text-decoration: none; color: black;">Join hangout Here</a>'
        )
      })
    })
  })
})
