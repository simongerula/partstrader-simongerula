Cypress.Commands.add('isLocatedAt', (url) => {
    cy.url()
    .should('eq', (Cypress.config().baseUrl+url))
})

Cypress.Commands.add('isLocatedAtDinamic', (url) => {
    cy.url()
    .should('contains', (Cypress.config().baseUrl+url))
})