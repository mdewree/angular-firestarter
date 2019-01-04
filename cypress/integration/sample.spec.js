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
    cy.get('#navToggle').click();
    cy.contains('Firestore').click();

    cy.get('notification-message').children()
      .should('contain', 'You must be logged in!')
      .and('be.visible');
  })

  it('should sign up a new user', () => {
    cy.get('#navToggle').click();
    cy.contains('Login').click();

    cy.url().should('include', 'login');

    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type(password);
    cy.get('button[type=submit]').click();

    cy.contains('Welcome new user!');
    cy.contains('Logout').click();
  })

  it('allows the user to create notes', () => {
    cy.login(email, password)

    cy.get('#navToggle').click();
    cy.contains('Firestore').click();

    const noteText = chance.sentence({ words: 5 });
    const noteList = cy.get('main');

    noteList.should('not.contain', noteText);

    cy.get('input[name=note]').type(noteText);
    cy.contains('Add Note').click();

    const newNote = cy.get('note-detail').first();

    newNote.should('contain', noteText)

    newNote.find('.is-danger').click();

    cy.get('notes-list').should('not.contain', noteText);
  });

  it('logs the user out', () => {
    cy.contains('Logout').click();
    cy.get('user-profile').children().should('contain', 'Howdy, GUEST');
  });
})
