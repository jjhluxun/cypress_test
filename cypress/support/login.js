import 'cypress-localstorage-commands'
import 'cypress-wait-until'

Cypress.Commands.add('login', (username, password) => {
    let loginPage
    cy.fixture('loginPage').then((data) => {
        loginPage = data
    })
    cy.visit('/')
    cy.waitUntil(() => cy.get(loginPage.Submit, {timeout: 60000}).should('be.visible'))
    cy.get('#userName').type(username)
    cy.get('#password').type(password)
    cy.get('button').click()
    cy.waitUntil(() => cy.get(loginPage.logout), {timeout: 6000}).should('be.visible')

})
