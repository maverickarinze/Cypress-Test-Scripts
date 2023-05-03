describe('Login flow', () => {
    beforeEach(() => {
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false
        })
        //cy.visit('https://ics3staging.abiairs.gov.ng')
        cy.visit('https://abiairs.gov.ng')
        cy.get('.text-center > .btn').click()  
        //cy.get('#username').type("bwbiradmin")
        //cy.get('#password').type("admin2022#")
        cy.get('#username').type("niloeje")
        cy.get('#password').type("P@ssw0rd!")
    
        cy.get('#kc-login').click()
    
        // Assert that the user is redirected to the dashboard
        cy.url().should('include', '/dashboard')

        // Open Payment Reconciliation Request
        cy.get('#nav-link--page3').click()
        cy.get('#nav-submenu--page3 > :nth-child(9) > .nav-link').click()

        //Assert CGT Page is Displayed
        cy.url().should('include', '/cgt-assessment/find', {timeout: 10000})
    })

    it('Should click on search button to view assessments', () => {
        cy.wait(3000)
        cy.get('.text-right > .btn').click()

        //Assert Search result is displayed
        cy.get('.table-responsive', {timeout: 10000}).should('be.visible')
        
    })

    it('Should search by Assessment Number', () => {
        cy.get('.form-row > :nth-child(1) > .form-control', {timeout: 10000}).type('CGT00000012')
        cy.get('.text-right > .btn', {timeout: 10000}).click()

        //Assert Search result is displayed
        cy.get('.table-responsive', {timeout: 10000}).should('be.visible')
    })

    it('Should search by Date Range', () => {
        cy.get(':nth-child(2) > .input-group > .form-control', {timeout: 10000}).click()
        cy.get(':nth-child(1) > :nth-child(6) > .ng-star-inserted').click()
        cy.get(':nth-child(3) > .input-group > .form-control').click()
        cy.get(':nth-child(3) > :nth-child(2) > .ng-star-inserted').click()
        
        cy.get('.text-right > .btn', {timeout: 10000}).click()

        //Assert Search result is displayed
        cy.get('.table-responsive', {timeout: 10000}).should('be.visible')

        //View Details
        //cy.get(':nth-child(1) > :nth-child(10) > .d-inline-block > .dropdown-toggle').click().trigger('mouseover')

    })

    it('Should search by Donor ABSSIN', () => {
        cy.get(':nth-child(4) > .form-control', {timeout: 10000}).type('2222513757')

        cy.get('.text-right > .btn', {timeout: 10000}).click()

        //Assert Search result is displayed
        cy.get('.table-responsive', {timeout: 10000}).should('be.visible')

    })

    it('Should search by Donee ABSSIN', () => {
        cy.get(':nth-child(5) > .form-control', {timeout: 10000}).type('120211681776')

        cy.get('.text-right > .btn', {timeout: 10000}).click()

        //Assert Search result is displayed
        cy.get('.table-responsive', {timeout: 10000}).should('be.visible')

    })

    it.only('Should search by Assessment Year', () => {
        cy.get(':nth-child(6) > .form-control').select('2023')
        cy.get('.text-right > .btn', {timeout: 10000}).click()

        //Assert Search result is displayed
        cy.get('.table-responsive', {timeout: 10000}).should('be.visible')

    })

    it('Should Create CGT Assessment', () => {
        cy.get('.col-12 > .btn', {timeout: 10000}).click()
        cy.get('.input-group > .form-control').type('120211681776')
        cy.get('#taxYear').select('2023')
        cy.get('.col-md-3 > .btn', {timeout: 25000}).click()

        //Verify Details Page is Displayed
        cy.get('.col-md-9 > h5').contains('Details').should('be.visible')

        //Select Assessment Category
        cy.get('.mt-5.ng-untouched > :nth-child(1) > .col-md-4 > .form-group > .form-control').select('INDIVIDUAL TO INDIVIDUAL')
        cy.get('#taxOffice', {timeout: 20000}).select('Aba North Revenue Office')
        //cy.get('.col-4 > .form-group').select('Aba North Revenue Office')

        //Donee's ABSSIN details
        cy.get(':nth-child(2) > :nth-child(3) > .form-group > .form-control').type('Stanley Agbo')
        cy.get(':nth-child(2) > :nth-child(4) > .form-group > .form-control').type('08095604390')
        cy.get(':nth-child(2) > :nth-child(5) > .form-group > .form-control').type('Oando Busstop')
        cy.get(':nth-child(2) > :nth-child(6) > .form-group > .form-control').select('ABIA STATE')
        cy.get(':nth-child(7) > .form-group > .form-control').select('Arochukwu')

        //Plot Details
        cy.get(':nth-child(9) > .form-group > .form-control').type('1120')
        cy.get(':nth-child(10) > .form-group > .form-control').type('5')
        cy.get(':nth-child(11) > .form-group > .form-control').type('250000')
        cy.get(':nth-child(12) > .form-group > .form-control').select('Aba North')
        cy.get(':nth-child(13) > .form-group > .form-control').select('asama')


        //Considerations
        cy.get(':nth-child(4) > :nth-child(2) > .form-group > .form-control', {timeout: 20000})
            .type('250000')
        cy.get('.my-2', {timeout: 20000}).click()
        cy.get('td').should('be.visible')
        cy.get(':nth-child(2) > .form-check-label').click()

        //Upload Documents
        cy.get('.my-3 > .btn').click()

        //Preview Page
        cy.get('.justified-content-between > :nth-child(2) > .btn').click()
        //Assert Error Message
        cy.get('.ng-trigger').should('be.visible')
            .contains('Fill all inputs correctly')

    })

})