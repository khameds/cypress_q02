// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import 'cypress-file-upload'
require('cypress-downloadfile/lib/downloadFileCommand')

Cypress.Commands.add('createNote', (token, title, desc, category) => {
  cy.log("Note creation token : " + token);
  cy.request({
    url: Cypress.env("noteApiBaseUrl") + "/notes",
    method: "POST",
    headers: {
      "x-auth-token" : token, 
    },
    body: {
      "title": title,
      "description": desc,
      "category": category,
    },
  }).then((response) => {
    cy.wrap(response);
  });
});

Cypress.Commands.add(
    "generateRandomEmail",
    () => `${Math.random().toString(36).substring(2, 12)}@yahoo.com`
  );
  
  Cypress.Commands.add("signup", (firstName, lastName, email, password) => {
    cy.get("#firstName").type(firstName);
    cy.get("#lastName").type(lastName);
    cy.get("#signup-email").type(email);
    cy.get("#signup-password").type(password);
    cy.get('[data-qa="signup-submit-button"]').click();
  });
  
  Cypress.Commands.add("auth", (email, password) => {
    cy.get("#signin-email").type(email);
    cy.get("#signin-password").type(password);
    cy.get('[data-qa="signin-submit-button"]').click();
  });