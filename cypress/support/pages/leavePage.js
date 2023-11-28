// Get current date ISO 8601 with time difference
let date = new Date()
let offset = new Date().getTimezoneOffset()
date = new Date(date.getTime() - (offset*60*1000))
date = date.toISOString().split('T')[0]
//

class LeavePage {

    // LOCATORS
    assignLeaveTab = () => cy.get('a:contains("Assign Leave")')
    assignLeaveEmployeeInput = () => cy.get('input[placeholder="Type for hints..."]')
    assignLeaveEmployeeOption = () => cy.get('div[class*="autocomplete-option"]').eq(1)
    assignLeaveLeaveTypeInput = () => cy.get('div[class*="select-text-input"]')
    assignLeaveLeaveTypeOption = () => cy.get('div[class*="select-option"]').eq(1)
    assignLeaveFromDateInput = () => cy.get('div[class*="label-wrapper"]:contains("From Date") + div input')
    assignLeaveBalanceInformationText = () => cy.get('div[class*="leave-balance"] + div > p')

    // ACTIONS
    clickAssignLeaveTab(){
        this.assignLeaveTab()
        .click()
    }

    typeAssignLeaveEmployeeInput(text){
        this.assignLeaveEmployeeInput()
        .type(text)
    }

    clickAssignLeaveEmployeeOption(){
        this.assignLeaveEmployeeOption()
        .click()
    }

    clickAssignLeaveLeaveTypeInput(){
        this.assignLeaveLeaveTypeInput()
        .click()
    }

    clickAssignLeaveLeaveTypeOption(){
        this.assignLeaveLeaveTypeOption()
        .click()
    }

    typeAssignLeaveFromDateInput(){
        this.assignLeaveFromDateInput()
        .type(date)
        this.assignLeaveFromDateInput()
        .blur()
    }

    isAssignLeaveBalanceInformationText(text){
        this.assignLeaveBalanceInformationText()
        .should('be.visible')
        .should('have.text', text)
    }

}
export default new LeavePage()