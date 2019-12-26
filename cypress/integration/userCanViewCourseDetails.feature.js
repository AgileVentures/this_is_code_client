/// <reference types="Cypress" />


describe('User Can View Course Details', () => {
  beforeEach('', () => {
    cy.server()
    cy.visit('/')

  })
  it('By Clicking The CourseCard', () => {
    cy.get('.bx--article-card').contains('Work The Web - The Beginnings').click()
  });
});