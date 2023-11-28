class LoginPage {

    // SELECTORS
    usernameInput = () => cy.get('input[name="username"]')
    passwordInput = () => cy.get('input[name="password"]')
    loginButton = () => cy.get('button[type="submit"]')
    errorAlert = () => cy.get('div[class*="alert-content"]')

    // ACTIONS
    typeUsername(username){
        this.usernameInput()
        .type(username)
    }

    typePassword(password){
        this.passwordInput()
        .type(password)
    }

    clickLoginButton(){
        this.loginButton()
        .click()
    }

    isErrorAlertDisplayed(){
        this.errorAlert()
        .should('be.visible')
        .should('have.text','Invalid credentials')
    }

}
export default new LoginPage()