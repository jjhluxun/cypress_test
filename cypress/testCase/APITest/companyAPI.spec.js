import '../../support/apiLogin'
import officeData from '../../fixtures/DynamicData/officeData'

describe('office-tenants', () => {
    let officeId
    let TOKEN
    before(() => {
        cy.loginToken()
         cy.saveLocalStorage()
    })
    beforeEach(() => {
         cy.restoreLocalStorage()
        cy.getLocalStorage('accessToken').then(token => {
            TOKEN = token
        })

    })

    it('office-tenants list', () => {

        cy.request({
            url: '/api/travel/v1/admin/office-tenants',
            qs: {
                page: 0,
                size: 10,
                travelPermit: true
            },
            auth: {
                bearer: TOKEN
            }
        })
            .should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.content[0]).to.have.property('id')
                Cypress._.each(response.body.content, (Content) => {
                    expect(Content.companyName).to.not.be.null
                    expect(Content).include.keys('id', 'companyName', 'authorizers', 'positions')
                })
                officeId = response.body.content[0].id
            })

    })
    it('create office-tenant', function () {
        cy.request({
            url: '/api/travel/v1/admin/office-tenants',
            method: 'POST',
            auth:{
                bearer:TOKEN
            },
            body:officeData
        }).should((rs) => {
            expect(rs.status).to.eq(200)
        })

    });

    it('office-tenant details', () => {
        cy.request({
            url: `/api/travel/v1/admin/office-tenants/${officeId}`,
            auth: {
                bearer: TOKEN
            }
        }).should((res) => {
            expect(res.status).to.eq(200)
            expect(res.body.id).to.eq(`${officeId}`)

        })
    })
})