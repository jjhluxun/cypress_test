

class companyPage {

    PAGE
   constructor() {
        cy.fixture('officeTenantPage').then((data)=>{
           this.PAGE = data
        })
    }


     officeList(){
        cy.visit('/office-tenant')
        cy.get(this.PAGE.detailText).click()
        cy.get(this.PAGE.officeInfotitleText).should('be.visible')
    };

     officeCreate() {
        cy.visit('/office-tenant')
        cy.get(this.PAGE.createBtn).click()
        cy.url().should('include', 'create')
    };

}

export default companyPage