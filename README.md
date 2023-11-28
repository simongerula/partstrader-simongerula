# Automation test - PartsTrader
This repository contains automated tests cases for https://opensource-demo.orangehrmlive.com/

---

### Test Suites

The tests consist of three test suites where UI tests and integration tests between the UI and the backend response can be verified.

1. TSL-001 : Auth Login
    - TCL-001 : Successful login and navigation to the Recruitment page
      - The user is able to log in to the app.
      - The user navigates to '/recruitment/viewCandidates'.
    - TCL-002 : Unsuccessful login
      - The user is not able to log in to the app.
      - An error is displayed

2. TSR-001 : Smoke Test Recruitment Page
    - TCR-001 : Number of candidates retrieved by the api are displayed in the table
      - Validates the number of candidates retrieved and the number of candidates displayed in the table
    - TCR-002 : The button "+ Add" redirects the user to the Add Candidate form
      - Validates the redirection of the "+ Add" button to the Add candidate form
    - TCR-003 : The user click on the eye action icon and is redirected to the candidate details page
      - Validates the redirection of the "Eye (action)" button to the candidate details page
    - TCR-004 : The user click on the delete action icon and a pop-up is displayed
      - The user clicks on the delete action icon, and a pop-up is displayed
      - Validates the pop-up body
      - Validates the pop-up "Cancel" and "Delete" buttons
    - TCR-005 : The user deletes a candidate and a DELETE request is sent
      - The user confirms the deletion of the candidate and validates that the ID is sent in the DELETE request
      - Validates that the DELETE request returns a statusCode of 200
    - TCR-006 : The user click on the download action icon and a .PDF file is downloaded
      - The user clicks on the download action, and a .PDF file is downloaded (Note: Currently, there is a workaround that navigates to the button href instead of clicking it)
    - TCR-007 : The user filters candidates by status
      - The user selects a status option, clicks on 'search', and validates that the parameter is sent in the query to retrieve candidates
    - TCR-008 : The user navigates to the "Vacancies" tab and the vacancies are retrieved with the data to complete the table
      - The user navigates to the "Vacancies" tab and validates that the endpoint returns the data needed to populate the table

3. TSH-001 : Leave Balance
    - TCH-001 : The user navigates to Assign Leave and validates the negative leave balance
      - The user navigates to the Assign Leave page and mocks up the balance response to validate the message displayed ("Balance not sufficient")
    - TCH-002 : The user navigates to Assign Leave and validates the positive leave balance
      - The user navigates to the Assign Leave page and mocks up the balance response to validate the message displayed ("1.00 Day(s)")

---

### How To Use

1. Create a new folder and clone the repository into it.
   `$ git clone https://github.com/simongerula/partstrader-simongerula.git`

2. Install the npm packages
   `$ npm install`

3. To run the tests through the UI
   `$ npm run cy:open`

4. To run the test through the console
  - Run Login tests
   `$ npm run cy:test:login`
  - Run Recruitment tests
    `$ npm run cy:test:recruitment`
  - Run Leave tests
    `$ npm run cy:test:leave`
  - Run all the tests
    `$ npm run cy:regression`

---

This framework was created with Cypress 13.6, cypress-mochawesome-reporter to generate HTML reports and based in Page Object Model.

Simon Gerula
