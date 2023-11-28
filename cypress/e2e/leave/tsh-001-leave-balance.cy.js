/// <reference types="cypress" />

// Pages Import
import LoginPage from "../../support/pages/loginPage"
import DasboardPage from "../../support/pages/dashboardPage"
import LeavePage from "../../support/pages/leavePage"

// Test-data Import
import credentials from '../../fixtures/credentials.json'

describe('TSH-001 : Leave Balance', () => {

    beforeEach(() => {
        cy.session('AdminLogin', () => {
            cy.visit('/auth/login')
            LoginPage.typeUsername(credentials.allowedUser.username)
            LoginPage.typePassword(credentials.allowedUser.password)
            LoginPage.clickLoginButton()
        })
    })

    it('TCH-001 : The user navigates to Assign Leave and validates the negative leave balance', () => {
        cy.visit('/dashboard/index')
        DasboardPage.clickSideBarLink('leave')
        LeavePage.clickAssignLeaveTab()
        LeavePage.typeAssignLeaveEmployeeInput('a')
        LeavePage.clickAssignLeaveEmployeeOption()
        LeavePage.clickAssignLeaveLeaveTypeInput()
        LeavePage.clickAssignLeaveLeaveTypeOption()
        cy.intercept('GET', (Cypress.env('backend_url')+'/leave/leave-balance/leave-type/*'), {fixture: 'api-mockups/negativeLeaveBalance.json'}).as('getBalance')
        LeavePage.typeAssignLeaveFromDateInput()
        cy.wait('@getBalance')
        .then(() => LeavePage.isAssignLeaveBalanceInformationText('Balance not sufficient'))
    })

    it('TCH-002 : The user navigates to Assign Leave and validates the positive leave balance', () => {
        cy.visit('/dashboard/index')
        DasboardPage.clickSideBarLink('leave')
        LeavePage.clickAssignLeaveTab()
        LeavePage.typeAssignLeaveEmployeeInput('a')
        LeavePage.clickAssignLeaveEmployeeOption()
        LeavePage.clickAssignLeaveLeaveTypeInput()
        LeavePage.clickAssignLeaveLeaveTypeOption()
        cy.intercept('GET', (Cypress.env('backend_url')+'/leave/leave-balance/leave-type/*'), {fixture: 'api-mockups/positiveLeaveBalance.json'}).as('getBalance')
        LeavePage.typeAssignLeaveFromDateInput()
        cy.wait('@getBalance')
        .then(() => LeavePage.isAssignLeaveBalanceInformationText('1.00 Day(s)'))
    })

})
