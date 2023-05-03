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
        cy.get('#nav-submenu--page3 > :nth-child(5) > .nav-link').click()

        //Assert ETCC Page is Displayed
        //cy.url().should('include', '/assessments/direct-assessments')
    })

    it('Should click on search button to view assessments', () => {
        cy.wait(3000)
        cy.get('.col > .btn').click()

        //Assert Search result is displayed
        cy.get('.search-result-summary > .col-12', {timeout: 10000}).should('be.visible')
        cy.get('.col-md-10 > div').contains('PAID BEFORE ENTRY').should('be.visible')
    })

    it.only('Should search by Assessment Number', () => {
        cy.get('#validationDefault01', {timeout: 10000}).type('AB005/2022/044485')
        cy.get('.col > .btn', {timeout: 10000}).click()

        //Assert Search result is displayed
        cy.get('.search-result-summary > .col-12', {timeout: 10000}).should('be.visible')
        cy.get('.col-md-10 > div').contains('PAID BEFORE ENTRY').should('be.visible')
    })

    it('Should create ETCC Assessment', () => {
        cy.get('.float-right > .btn', {timeout: 10000}).click()

        // Search ABSSIN
        //cy.contains('Enter ABSSIN').type('120211681776')
        cy.get('[name="tin"]').type('120211681776')
        cy.get('#taxYear').select('2022')
        cy.get('.col-xs-12 > .btn').click()

        // Assessment Details
        cy.get('#revenue').select('DIRECT ASSESSMENT TAX (ARREARS/LATE)')
        cy.get('form.mt-5 > :nth-child(2) > :nth-child(2) > .form-group > .form-control').select('LATE')
        cy.get('#taxOffice').select('ABA NORTH REVENUE OFFICE')

        // Source of Income and Tax Payable
        cy.get(':nth-child(3) > :nth-child(1) > .form-group > .form-control').select('TRADE OR PROFESSION OR BUSINESS')
        cy.get(':nth-child(3) > :nth-child(2) > .form-group > .form-control').type('Business')
        cy.get(':nth-child(3) > :nth-child(3) > .form-group > .form-control').type('250000')
        cy.get('.form-group > .btn').click()

        // Payment Details
        //cy.get('[name="receiptNumber"]').type('25896')
        cy.get(':nth-child(7) > form.ng-untouched > .row > :nth-child(2) > .form-group > .form-control').type('25896')
        cy.get('form.ng-dirty > .row > :nth-child(4) > .form-group > .form-control').type('2500')
        cy.get('.input-group-append > .btn > .fa').click()
        cy.get(':nth-child(1) > :nth-child(5) > .ng-star-inserted').click()
        cy.get(':nth-child(8) > .mb-2').click()
        cy.get('.text-right > .btn').click()

        // Preview Page
        cy.get('.pull-left').contains('Assessments: Preview Direct Assessment Detail').should('be.visible')
        cy.get('.text-right > .btn').click()

    })

})