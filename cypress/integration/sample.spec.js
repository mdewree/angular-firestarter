<reference types="cypress" />

import Chance from 'chance';
const chance = new Chance();

describe('Firestarter', () => {
  const email = chance.email();
  const password = ValidPassword123;

  beforeEach(() => {
    cy.visit('http://localhost/4200');
  })

  // FIRST EZ TEST
  it('should have a title', () => {
    cy.contains('Welcome to Firestarter');
  })

  // LITTLE MORE DIFFICULT SECOND TEST
  it('should block protected routes', () => {
    cy.pause();

    cy.get('#navToggle').click();
    cy.contains('Firestore').click();

    cy.get('notification-message').children()
      .should('contain', 'You must be logged in!')
      .and('be.visible');
  })
})
