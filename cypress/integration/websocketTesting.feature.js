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
              description:
                'Use the mobile HTTP firewall, then you can quantify the 1080p panel!',
              startDate: 'Tue, 11 Feb 2020 14:59:59 +0000',
              endDate: 'Tue, 11 Feb 2020 15:29:59 +0000',
              conference_link: 'https://hangouts.google.com/call',
              coverImage:
                'https://this-is-code.s3.eu-north-1.amazonaws.com/zpdcgiWFFoivQtM7qtYjkVFe?response-content-disposition=inline%3B%20filename%3D%22cover_88.jpg%22%3B%20filename%2A%3DUTF-8%27%27cover_88.jpg\u0026response-content-type=image%2Fjpeg\u0026X-Amz-Algorithm=AWS4-HMAC-SHA256\u0026X-Amz-Credential=AKIAIKNDI6ICZXWA675Q%2F20200213%2Feu-north-1%2Fs3%2Faws4_request\u0026X-Amz-Date=20200213T085027Z\u0026X-Amz-Expires=3600\u0026X-Amz-SignedHeaders=host\u0026X-Amz-Signature=9bf48ae7000af73589dba6f27a8a8d47ec5785f6cbc4f40869856f4586e1c1ed',
            },
            {
              id: 89,
              title: 'Connecting ACL2 - part 2',
              description:
                'Use the mobile HTTP firewall, then you can quantify the 1080p panel!',
              startDate: 'Wed, 12 Feb 2020 14:59:59 +0000',
              endDate: 'Wed, 12 Feb 2020 15:29:59 +0000',
              conference_link: 'https://hangouts.google.com/call',
              coverImage:
                'https://this-is-code.s3.eu-north-1.amazonaws.com/4NUS25YRL3XueZvRF36iRDZj?response-content-disposition=inline%3B%20filename%3D%22cover_89.jpg%22%3B%20filename%2A%3DUTF-8%27%27cover_89.jpg\u0026response-content-type=image%2Fjpeg\u0026X-Amz-Algorithm=AWS4-HMAC-SHA256\u0026X-Amz-Credential=AKIAIKNDI6ICZXWA675Q%2F20200213%2Feu-north-1%2Fs3%2Faws4_request\u0026X-Amz-Date=20200213T085027Z\u0026X-Amz-Expires=3600\u0026X-Amz-SignedHeaders=host\u0026X-Amz-Signature=d08a7f36699cc4fc4565a0d9c8628294588a79b1bca48bbdab15f21b343c1c0a',
            },
            {
              id: 90,
              title: 'Connecting ACL2 - part 3',
              description:
                'Use the mobile HTTP firewall, then you can quantify the 1080p panel!',
              startDate: 'Thu, 13 Feb 2020 14:59:59 +0000',
              endDate: 'Thu, 13 Feb 2020 15:29:59 +0000',
              conference_link: 'https://hangouts.google.com/call',
              coverImage:
                'https://this-is-code.s3.eu-north-1.amazonaws.com/q5Nq5F3NpxPEojcSyKG1jKT1?response-content-disposition=inline%3B%20filename%3D%22cover_90.jpg%22%3B%20filename%2A%3DUTF-8%27%27cover_90.jpg\u0026response-content-type=image%2Fjpeg\u0026X-Amz-Algorithm=AWS4-HMAC-SHA256\u0026X-Amz-Credential=AKIAIKNDI6ICZXWA675Q%2F20200213%2Feu-north-1%2Fs3%2Faws4_request\u0026X-Amz-Date=20200213T085027Z\u0026X-Amz-Expires=3600\u0026X-Amz-SignedHeaders=host\u0026X-Amz-Signature=842af8578fe8f3984e33b88877272cde0e048673b5227507e494b6eaf64e70d0',
            },
          ],
        },
      }
      
      const payload = { data: JSON.stringify(event)}
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
