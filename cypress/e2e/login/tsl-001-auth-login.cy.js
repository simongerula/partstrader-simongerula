/// <reference types="cypress" />

// Pages Import
import LoginPage from "../../support/pages/loginPage"
import DashboardPage from "../../support/pages/dashboardPage"

// Test-data Import
import credentials from '../../fixtures/credentials.json'

describe('TSL-001 : Auth Login', () => {

    beforeEach(() => {
        cy.visit('/auth/login')
    })

    it('TCL-001 : Successful login and navigation to the Recruitment page', () => {
        LoginPage.typeUsername(credentials.allowedUser.username)
        LoginPage.typePassword(credentials.allowedUser.password)
        LoginPage.clickLoginButton()
        DashboardPage.clickSideBarLink('recruitment')
        cy.isLocatedAt('/recruitment/viewCandidates')
    })

    it('TCL-002 : Unsuccessful login', () => {
        LoginPage.typeUsername(credentials.notAllowedUser.username)
        LoginPage.typePassword(credentials.notAllowedUser.password)
        LoginPage.clickLoginButton()
        LoginPage.isErrorAlertDisplayed()
    })

})