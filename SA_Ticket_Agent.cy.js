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

        // Open Corporates
        cy.get(':nth-child(7) > .nav-link').should('be.visible').click({force:true})
        cy.get('.hs-sub-menu > :nth-child(6) > .nav-link').click()
        //cy.get('h5').contains('Agents List').should('be.visible')
        

        //Assert Enforcer Performance Page is Displayed
        //cy.url().should('include', '/ticketing/enforcer-performance', {timeout: 25000})
    })

    it('Should click on search button to Search Enforcer', () => {
        cy.get('.mt-4', {timeout: 10000}).click()

        //Assert Search result is displayed
        cy.get('.table', {timeout: 25000}).should('be.visible')
        
    })

    it.only('Should Search by Agent', () => {
        cy.get(':nth-child(1) > .form-group > .form-control', {timeout: 25000}).select('ABA TOWNSHIP')
        cy.get('.mt-4', {timeout: 10000}).click()

        cy.get(':nth-child(1) > .form-group > .form-control', {timeout: 10000}).select('ABIA MASS')
        cy.get('.mt-4', {timeout: 10000}).click()

        cy.get(':nth-child(1) > .form-group > .form-control', {timeout: 10000}).select('ABIA IGR')
        cy.get('.mt-4', {timeout: 10000}).click()

        //Assert Search result is displayed
        cy.get('.table', {timeout: 25000}).should('be.visible')
        
    })

    it('Should Search by Phone Number', () => {
        cy.get(':nth-child(2) > .form-group > .form-control', {timeout: 10000}).type('+2349029257796')
        cy.get('.mt-4', {timeout: 10000}).click()

        //Assert Search result is displayed
        cy.get('.table', {timeout: 25000}).should('be.visible')
        
    })

    it('Should Search by Status', () => {
        cy.get(':nth-child(3) > .form-group > .form-control', {timeout: 10000}).select('ACTIVE')
        cy.get('.mt-4', {timeout: 10000}).click()

        cy.get(':nth-child(3) > .form-group > .form-control', {timeout: 10000}).select('INACTIVE')
        cy.get('.mt-4', {timeout: 10000}).click()

        //Assert Search result is displayed
        cy.get('.table', {timeout: 25000}).should('be.visible')
        
    })

    it('Should Search by Date', () => {
        cy.get(':nth-child(4) > .form-group > .input-group > .form-control', {timeout: 10000}).type('01/03/2023')
        cy.get(':nth-child(5) > .form-group > .input-group > .form-control', {timeout: 10000}).type('31/03/2023')
        cy.get('.mt-4', {timeout: 10000}).click()

        //Assert Search result is displayed
        cy.get('.table', {timeout: 25000}).should('be.visible')
        
    })

    it('Should Search by Agent', () => {
        cy.get(':nth-child(6) > .form-group > .form-control', {timeout: 10000}).select('AAA')
        cy.get('.mt-4', {timeout: 10000}).click()

        cy.get(':nth-child(6) > .form-group > .form-control', {timeout: 10000}).select('ABA')
        cy.get('.mt-4', {timeout: 10000}).click()

        cy.get(':nth-child(6) > .form-group > .form-control', {timeout: 10000}).select('UMUAHIA')
        cy.get('.mt-4', {timeout: 10000}).click()

        cy.get(':nth-child(6) > .form-group > .form-control', {timeout: 10000}).select('NEW GENERATION SUB UNION ZONE')
        cy.get('.mt-4', {timeout: 10000}).click()

        //Assert Search result is displayed
        cy.get('.table', {timeout: 25000}).should('be.visible')
        
    })

})