import 'cypress-localStorage-commands'

Cypress.Commands.add('loginToken', () => {
    const admin = Cypress.env('admin')
    cy.request({
        method: 'POST',
        url: '/api/auth/v1/admin/login',
        auth: {
            user: 'webApp',
            pass: '123456'
        },
        form: true,
        body: {
            username: admin.username,
            password: admin.password
        }
    })
        .should((rs)=>{
            expect(rs.status).to.eq(200)
            //方法一：把token存在localstorage
                cy.setLocalStorage('accessToken', rs.body.access_token)


            //方法二：把token存放在文件里
            const token = rs.body.access_token
            cy.writeFile('cypress/cypress_files/token.txt', token)
        })

})