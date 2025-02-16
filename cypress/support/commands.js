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

//Custom command to handle elements inside iframe
Cypress.Commands.add("getIframeBody", (iframeSelector) => {
  return cy
    .get(iframeSelector)
    .its("0.contentDocument.body")
    .should("not.be.empty")
    .then(cy.wrap);
});

//custom command to handle drag and drop in iframe
Cypress.Commands.add(
  "dragAndDropInIframe",
  (iframeSelector, sourceSelector, targetSelector) => {
    cy.getIframeBody(iframeSelector).then((iframeBody) => {
      const dataTransfer = new DataTransfer();

      cy.wrap(iframeBody)
        .find(sourceSelector)
        .trigger("dragstart", { dataTransfer });

      cy.wrap(iframeBody)
        .find(targetSelector)
        .trigger("drop", { dataTransfer })
        .trigger("dragend", { force: true });
    });
  }
);

Cypress.Commands.add("getDataQa", (val) => {
  return cy.get(`[data-qa=${val}]`).should("be.visible");
});

//cypress download file support
require("cypress-downloadfile/lib/downloadFileCommand");

require("cypress-xpath");
