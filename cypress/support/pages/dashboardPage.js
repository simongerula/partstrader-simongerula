class DashboardPage {

    // LOCATORS
    recruitmentLink = (link) => cy.get(`a[href*="/${link}/view"]`)

    // ACTIONS
    // Switch statment selected to reuse the function with every sidebar link
/*     clickSideBarLink(link){
        switch(link) {
            case 'Recruitment':
                this.recruitmentLink()
                .click()
                break;
        }
    } */

    clickSideBarLink(link){
        this.recruitmentLink(link)
        .click()
    }

}
export default new DashboardPage()