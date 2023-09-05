
describe.skip('API:admin login',()=>{
    const admin = Cypress.env('admin')

    it('super admin login',()=>{
        cy.request({
            method:'POST',
            url:'/api/auth/v1/admin/login',
            auth:{
               user:'webApp',
                pass:'123456'
            },
            form:true,
            body:{
                username: admin.username,
                password: admin.password
            }
        }).then((response)=>{
            expect(response.status).to.eq(200)
        })
    })
})

