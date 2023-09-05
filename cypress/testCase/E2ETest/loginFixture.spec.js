
describe('Different crm user has relative permission', () => {
    let crmUsers,loginPage;
    //读取fixtures下的静态数据方式
    before(() => {
        cy.fixture('crmUser').then((data) => {
            crmUsers = data
        })
        cy.fixture('loginPage').then((data)=>{
           loginPage = data
        })
    })

    it('Super admin can control all', () => {
        cy.visit('/')
        const {userName, passWord, Submit} = loginPage;
        cy.get(userName).type(crmUsers.admin.user)
        cy.get(passWord).type(crmUsers.admin.password)
        cy.get(Submit).click()
        cy.url().should('include', '/office-tenant')
    })

    it.skip('Space admin only can operate space ', () => {
        cy.visit('/')
        cy.get('#userName').type(crmUsers.space.user)
        cy.get('#password').type(crmUsers.space.password)
        cy.get('button').click()
        cy.url().should('include', '/space')
    })

    it("Super admin can see all tabs", () => {
        cy.contains('公寓管理').should('be.visible')

    })

    afterEach(() => {
        //describe里登录之后，一直保持登录态，清楚storage也没用
        // cy.clearCookie()
    })
})