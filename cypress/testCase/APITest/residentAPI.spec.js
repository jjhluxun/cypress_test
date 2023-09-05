import '../../support/apiLogin'

describe('apartment', () => {
    let apartmentId
    let TOKEN
    before(() => {
        cy.loginToken()
        cy.readFile('cypress/cypress_files/token.txt').then(token=>{
            TOKEN =token
        })
    })

    it('apartment list', () => {

        cy.request({
            url: '/api/travel/v1/admin/apartments',
            qs: {
                page: 0,
                size: 10
            },
            auth: {
                bearer: TOKEN
            }
        })
            .should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.content[0]).to.have.property('id')
                Cypress._.each(response.body.content,(Content)=>{
                    expect(Content.position).to.not.be.null
                })
                apartmentId = response.body.content[0].id
            })

    })

    it('apartment details',()=>{
        cy.request({
            url:`/api/travel/v1/admin/apartments/${apartmentId}`,
            auth:{
                bearer: TOKEN
            }
        }).should((res)=>{
            expect(res.status).to.eq(200)
            expect(res.body.id).to.eq(`${apartmentId}`)
        })
    })
})