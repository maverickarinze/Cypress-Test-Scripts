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

        // Open WHT Schedules
        cy.get('#nav-link--page3').click()
        cy.get(':nth-child(13) > .nav-link').click()

        //Assert WHT Page is Displayed
        //cy.url().should('include', '/withholding-tax/schedule-list', {timeout: 10000})
    })

    it('Should click on search button to view assessments', () => {
        cy.wait(3000)
        cy.get('.col > .btn').click()

        //Assert Search result is displayed
        cy.get('.card-body > :nth-child(3)', {timeout: 10000}).should('be.visible')
        
    })

    it('Should search by Schedule ID', () => {
        cy.get('#validationDefault01', {timeout: 10000}).type('WHT00000012')
        cy.get('.col > .btn', {timeout: 10000}).click()

        //Assert Search result is displayed
        cy.get('.card-body > :nth-child(3)', {timeout: 10000}).should('be.visible')
    })

    it('Should search by Tax Year', () => {
        cy.get('#fiscalYear', {timeout: 10000}).select('2023')
        cy.get('.col > .btn', {timeout: 10000}).click()

        //Assert Search result is displayed
        cy.get('.card-body > :nth-child(3)', {timeout: 10000}).should('be.visible')
    })

    it('Should search by Month', () => {
        cy.get('#month', {timeout: 10000}).select('JANUARY')
        cy.get('.col > .btn', {timeout: 10000}).click()

        //Assert Search result is displayed
        cy.get('.card-body > :nth-child(3)', {timeout: 10000}).should('be.visible')
    })

    it('Should search by Approval Status (PAID)', () => {
        cy.get('#paymentStatus', {timeout: 10000}).select('PAID')
        cy.get('.col > .btn', {timeout: 10000}).click()

        //Assert Search result is displayed
        cy.get('.card-body > :nth-child(3)', {timeout: 10000}).should('be.visible')
        cy.get('.sp-data').contains('PAID')
            .should('be.visible')
    })

    it('Should search by Approval Status (NOT PAID)', () => {
        cy.get('#paymentStatus', {timeout: 10000}).select('NOT PAID')
        cy.get('.col > .btn', {timeout: 10000}).click()

        //Assert Search result is displayed
        cy.get('.card-body > :nth-child(3)', {timeout: 10000}).should('be.visible')
        cy.get('.sp-data').contains('NOT PAID')
            .should('be.visible')
    })

    it('Should search by Approval Status (PARTIALLY PAID)', () => {
        cy.get('#paymentStatus', {timeout: 10000}).select('PARTIALLY PAID')
        cy.get('.col > .btn', {timeout: 10000}).click()

        //Assert Search result is displayed
        cy.get('.card-body > :nth-child(3)', {timeout: 10000}).should('be.visible')
        cy.get('.sp-data').contains('PARTIALLY PAID')
            .should('be.visible')
    })

})