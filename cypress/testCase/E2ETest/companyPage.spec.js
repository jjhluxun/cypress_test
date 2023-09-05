import '../../support/login'
import Page from "../../page/companyPage";

//采用pageObject模式的
describe('office-tenant module', () => {
    let officePage
     let companyPage
    before(() => {
        const admin = Cypress.env('admin')
        cy.login(admin.username, admin.password)

        companyPage = new Page()
    })

    //固化登录态
    // beforeEach(() => {
    //      Cypress.Cookies.preserveOnce('token')
    // })

    it('office list page', () => {
        companyPage.officeList()

    })

    it('office creat new', () => {
         companyPage.officeCreate()

    })
})