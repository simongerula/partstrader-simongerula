class RecruitmentPage {

    // LOCATORS
    recordsFoundText = () => cy.get('div > span[class*="-text"]')
    addCandidatebutton = () => cy.get('button:contains("Add")')
    eyeActionButton = () => cy.get('i[class*="eye"]').parent('button').eq(0)
    deleteActionButton = () => cy.get('i[class*="trash"]').parent('button').eq(0)
    deletePopUpBody = () => cy.get('p[class*="card-body"]')
    deletePopUpCancelButton = () => cy.get('button:contains("No, Cancel")')
    deletePopUpDeleteButton = () => cy.get('button:contains("Yes, Delete")')
    downloadActionButton = () => cy.get('i[class*="download"]').parent('button').eq(0)
    statusDropdown = () => cy.get('div[class*="grid-item"]:contains("Status")')
    statusDropdownItems = (item) => cy.get(`div[role="option"]:contains("${item}")`)
    searchButton = () => cy.get('button:contains("Search")')
    vacanciesTab = () => cy.get('a[class*="nav-tab-item"]:contains("Vacancies")')

    // ACTIONS
    areRecordsFound(recordsNumber){
        this.recordsFoundText()
        .should('contain.text', `(${recordsNumber}) Records Found`)
    }

    clickAddCandidateButton(){
        this.addCandidatebutton()
        .click()
    }

    clickEyeActionButton(){
        this.eyeActionButton()
        .click()
    }

    clickDeleteActionButton(){
        this.deleteActionButton()
        .click()
    }

    isDeletePopUpBody(DeleteBody){
        this.deletePopUpBody()
        .should('have.text', DeleteBody)
    }

    isDeletePopUpCancelButtonDisplayed(){
        this.deletePopUpCancelButton()
        .should('be.visible')
    }

    isDeletePopUpDeleteButtonDisplayed(){
        this.deletePopUpDeleteButton()
        .should('be.visible')
    }

    clickDeletePopUpDeleteButton(){
        this.deletePopUpDeleteButton()
        .click()
    }

    clickDownloadActionButton(){
        this.downloadActionButton()
        .invoke('removeAttr', 'target')
        .click()
    }

    wasTheResumeDownloaded(){
        cy.readFile(`../../downloads/resume.pdf`)
    }

    clickStatusDropdown(){
        this.statusDropdown()
        .click()
    }

    clickStatusDropdownItem(item){
        this.statusDropdownItems(item)
        .click()
    }

    clickSearchButton(){
        this.searchButton()
        .click()
    }

    clickVacanciesTab(){
        this.vacanciesTab()
        .click()
    }


}
export default new RecruitmentPage()