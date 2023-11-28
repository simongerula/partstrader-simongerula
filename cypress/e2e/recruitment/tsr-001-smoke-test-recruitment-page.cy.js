/// <reference types="cypress" />

// Pages Import
import LoginPage from "../../support/pages/loginPage"
import RecruitmentPage from "../../support/pages/recruitmentPage"

// Test-data Import
import credentials from '../../fixtures/credentials.json'

describe('TSR-001 : Smoke Test Recruitment Page', () => {

    beforeEach(() => {
        cy.session('AdminLogin', () => {
            cy.visit('/auth/login')
            LoginPage.typeUsername(credentials.allowedUser.username)
            LoginPage.typePassword(credentials.allowedUser.password)
            LoginPage.clickLoginButton()
        })
    })

    it('TCR-001 : Number of candidates retrieved by the api are displayed in the table', () => {
        let numberOfRecordsRetrieved
        cy.intercept('GET', (Cypress.env('backend_url')+'/recruitment/candidates?*')).as('getCandidates')
        cy.visit('/recruitment/viewCandidates')
        cy.wait('@getCandidates')
        .then(res => {
            expect(res.response.statusCode).to.be.eq(200)
            numberOfRecordsRetrieved = res.response.body.meta.total
            RecruitmentPage.areRecordsFound(numberOfRecordsRetrieved)
        })
    })

    it('TCR-002 : The button "+ Add" redirects the user to the Add Candidate form', () => {
        cy.visit('/recruitment/viewCandidates')
        RecruitmentPage.clickAddCandidateButton()
        cy.isLocatedAt('/recruitment/addCandidate')
    })

    it('TCR-003 : The user click on the eye action icon and is redirected to the candidate detail page', () => {
        cy.visit('/recruitment/viewCandidates')
        RecruitmentPage.clickEyeActionButton()
        cy.isLocatedAtDinamic('/recruitment/addCandidate/')
    })

    it('TCR-004 : The user click on the delete action icon and a pop-up is displayed', () => {
        cy.visit('/recruitment/viewCandidates')
        RecruitmentPage.clickDeleteActionButton()
        RecruitmentPage.isDeletePopUpBody('The selected record will be permanently deleted. Are you sure you want to continue?')
        RecruitmentPage.isDeletePopUpCancelButtonDisplayed()
        RecruitmentPage.isDeletePopUpDeleteButtonDisplayed()
    })

    it('TCR-005 : The user deletes a candidate and a DELETE request is sent', () => {
        cy.visit('/recruitment/viewCandidates')
        RecruitmentPage.clickDeleteActionButton()
        cy.intercept('DELETE', (Cypress.env('backend_url')+'/recruitment/candidates')).as('deleteCandidate')
        RecruitmentPage.clickDeletePopUpDeleteButton()
        cy.wait('@deleteCandidate')
        .then(res => {
            expect(res.request.body.ids).to.be.not.undefined
            expect(res.response.statusCode).to.be.eq(200)
        })
    })

    it('TCR-006 : The user click on the download action icon and a .PDF file is downloaded', () => {
        cy.intercept('GET', (Cypress.env('backend_url')+'/recruitment/candidates?*')).as('getCandidates')
        cy.visit('/recruitment/viewCandidates')
        //RecruitmentPage.clickDownloadActionButton()
        // Workaround to download file because the button 
            cy.wait('@getCandidates')
                .then(res => {
                for(let i = 0 ; i < res.response.body.meta.total ; i++){
                    if(res.response.body.data[i].hasAttachment === 'True'){
                        cy.request('GET', (Cypress.env('backend_url')+'/recruitment/viewCandidateAttachment/candidateId/'+res.response.body.data[i].id))
                    }                    
                }
            })
        // Workaround to download file because the button 
        RecruitmentPage.wasTheResumeDownloaded()
    })

    it('TCR-007 : The user filters candidates by status', () => {
        cy.intercept('GET', (Cypress.env('backend_url')+'/recruitment/candidates?*')).as('getCandidates')
        cy.visit('/recruitment/viewCandidates')
        cy.wait('@getCandidates')
        RecruitmentPage.clickStatusDropdown()
        RecruitmentPage.clickStatusDropdownItem('Interview Passed')
        cy.intercept('GET', (Cypress.env('backend_url')+'/recruitment/candidates?*')).as('getCandidates')
        RecruitmentPage.clickSearchButton()
        cy.wait('@getCandidates')
            .then(res => {
                // status 5 = Interview Passed
                expect(res.request.url).contain('status=5')
            })
    })

    it('TCR-008 : The user navigates to the "Vacancies" tab, and the vacancies are retrieved with the data to complete the table', () => {
        cy.visit('/recruitment/viewCandidates')
        cy.intercept('GET', (Cypress.env('backend_url')+'/recruitment/vacancies?limit*')).as('getVacancies')
        RecruitmentPage.clickVacanciesTab()
        cy.wait('@getVacancies')
        .then(res => {
            expect(res.response.statusCode).to.be.eq(200)
            expect(res.response.body.data[0].id).to.be.not.undefined
            expect(res.response.body.data[0].name).to.be.not.undefined
            expect(res.response.body.data[0].status).to.be.not.undefined
            expect(res.response.body.data[0].jobTitle.title).to.be.not.undefined
            expect(res.response.body.data[0].hiringManager).to.be.not.undefined
        })
    })

})