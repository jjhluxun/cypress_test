const pageElement = require('../pageElement/spaceElement')

module.exports ={

    creatRoom:function () {
     cy.visit('/space')
        cy.get(pageElement.createBtn).click()
        cy.get(pageElement.meetingType).click()
        cy.url().should('include','/space/create/business-meeting-room')
    }
}

