import '../../support/login'

describe('resident module', () => {

    let apartmentPage

    before(() => {
        const admin = Cypress.env('admin')
        cy.login(admin.username, admin.password)

        cy.fixture('apartmentPage').then((data) => {
            apartmentPage = data
        })
    })


    it('resident list page', () => {
        cy.visit('/apartment')
        cy.get(apartmentPage.listTitleText).should('contain', '公寓列表')
    })

})