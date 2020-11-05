/// <reference types="Cypress" />

describe('Course has copy link functionality', () => {
  function paste({ destinationSelector, pastePayload, pasteType = 'text' }) {
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/paste_event
    cy.get(destinationSelector).then(($destination) => {
      const pasteEvent = Object.assign(
        new Event('paste', { bubbles: true, cancelable: true }),
        {
          clipboardData: {
            getData: (type = pasteType) => pastePayload,
          },
        }
      )
      $destination[0].dispatchEvent(pasteEvent)
    })
  }
  beforeEach('', () => {
    cy.server()
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/courses',
      status: 200,
      response: 'fixture:course-list.json',
    })
  })
  it('Visitor can see course details using shared link', () => {
    cy.visit('/getting-started/student')
      .get('.bx--article-card')
      .first()
      .click()

      .checkText('.bx--modal-header__heading', 'Work The Web - The Beginnings')
    cy.get('[id=share-course-link]').click()
    cy.task('getClipboard').then(($clip) => {
      const url = $clip
      cy.log('this is what was in clipboard', url)
      cy.visit(url)
    })
    cy.location('pathname').should('eq', '/')
    cy.checkText('.bx--modal-header__heading', 'Work The Web - The Beginnings')
      .checkText(
        '[data-cy=course-description]',
        "Code Basics Workshop | HTML/CSS/JavaScript & How the Web Works. We'll be covering basics of HTML, CSS, and JavaScript, and by the end of the session, you'll see the big picture of how internet applications are structured and how you can Work The Web - not only consume it."
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
