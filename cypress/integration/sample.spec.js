/// <reference types="cypress" />

import Chance from 'chance';
const chance = new Chance();

describe('Firestarter', () => {
  const email = chance.email();
  const password = 'ValidPassword123';

  beforeEach(() => {
    cy.visit('http://localhost:4200');
  })

  it('should have a title', () => {
    cy.contains('Welcome to Firestarter');
  })

  it('should block protected routes', () => {
    cy.pause();

    cy.get('#navToggle').click();
    cy.contains('Firestore').click();

    cy.get('notification-message').children()
      .should('contain', 'You must be logged in!')
      .and('be.visible');
  })

  it('should sign up a new user', () => {
    cy.pause();

    cy.get('#navToggle').click();
    cy.contains('Login').click();

    cy.url().should('include', 'login');

    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type(password);
    cy.get('button[type=submit]').click();

    cy.contains('Welcome new user!');
    cy.contains('Logout').click();
  })

  it('should allowe the user to make notes', () => {
    cy.login(email, password);

    cy.get('#navToggle').click();
    cy.contains('Firestore').click();

    const noteText = chance.sentence({words: 5});
    const noteList = cy.get('main');

    cy.
  })


})
