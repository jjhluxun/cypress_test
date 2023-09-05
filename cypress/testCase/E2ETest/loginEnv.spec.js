
describe('Different environment uses different userName', () => {

    let loginPage
    before(() => {
        cy.fixture('loginPage').then((data) => {
            loginPage = data
        })
    })
    //读取config下的数据
    const admin = Cypress.env('admin')

    it(' Admin login ', () => {
        cy.visit('/')
        const {userName, passWord, Submit} = loginPage;
        cy.get(userName).type(admin.username)
        cy.get(passWord).type(admin.password)
        cy.get(Submit).click()
        cy.url().should('include', '/office-tenant')
    })
    it("Super admin has all permission", () => {
        cy.contains('权限管理').should('be.visible')

    })

})