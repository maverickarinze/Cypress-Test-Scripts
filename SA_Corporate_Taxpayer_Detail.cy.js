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

        // Open Corporate Taxpayers Detail View
        cy.get(':nth-child(6) > .nav-link').should('be.visible').click({force:true})
        cy.get('.open > .hs-sub-menu > :nth-child(1) > .nav-link').click()
        cy.get('#corporate', {timeout: 10000}).click()
        cy.get('#corporateSubmitButton', {timeout: 10000}).click()
        cy.visit('https://abiairs.gov.ng/taxpayers/2232524183/profile?mode=ub')
        //cy.get('.col > .btn', {timeout: 25000}).click()

        //Assert WHT Page is Displayed
        //cy.url().should('include', '/withholding-tax/schedule-list', {timeout: 10000})
    })

    it('Should Update Details', () => {
        cy.get('.col-md-8 > :nth-child(1) > .btn', {timeout: 10000}).click()

        //Assert Search result is displayed
        cy.get('.mb-20', {timeout: 10000}).should('be.visible')

        //Save Update
        cy.get('.btn-success', {timeout: 10000}).click()
        cy.get('.ng-trigger').should('be.visible')
        
    })

    it.only('Should Navigate Through Every Tab', () => {
        // Transactions Details
        cy.get('#pills-transactions-tab', {timeout: 10000}).click()
        cy.get('.tab-content-wrapper').contains('Transactions Details').should('be.visible')

        // Assessment
        cy.wait(3000)
        cy.get('#pills-assessment-tab').click()
        cy.get('.tab-content-wrapper').contains('Current Tax Assessment Band').should('be.visible')

        // Account Officer
        cy.get('#pills-account-officer-tab').click()
        cy.get('.h-100 > .card > .card-body').contains('Account Officer').should('be.visible')

        // Directors | Owners
        cy.get('#pills-directors-tab').click()
        cy.get('.pull-right > .btn').should('be.visible')
        cy.get('.tab-content > :nth-child(1) > .card > .card-body').should('be.visible')

        // Note
        cy.get('#pills-note-tab')
        cy.get('.col-12').should('be.visible')

        // Notices and Correspondence
        cy.get('#pills-notice-tab').click()
        cy.get('.col-md-6 > .btn').click()
        cy.get('.table').should('be.visible')
        
    })


})