import '../../support/login'
import Page from "../../page/pageOperation/spaceOperation";

//采用pageObject模式的
describe('space module', () => {

    before(() => {
        const admin = Cypress.env('admin')
        cy.login(admin.username, admin.password)
    })

    it('create business-meeting-room',()=>{
        Page.creatRoom()
    })
})