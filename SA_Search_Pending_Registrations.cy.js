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
        cy.get(':nth-child(6) > .nav-link').should('be.visible').click({force:true})
        cy.get('.hs-sub-menu > :nth-child(2) > .nav-link').click()
        cy.get('.col > .btn', {timeout: 25000}).click()

        //Assert WHT Page is Displayed
        //cy.url().should('include', '/withholding-tax/schedule-list', {timeout: 10000})
    })

    it('Should click on search button to Search Corporates', () => {
        cy.get('.col > .btn', {timeout: 10000}).click()

        //Assert Search result is displayed
        cy.get('.table', {timeout: 10000}).should('be.visible')
        
    })

    it('Should Search by Business Name', () => {
        cy.get(':nth-child(1) > #validationDefault01', {timeout: 10000}).type('LIFECARE CLINICS LIMITED')
        cy.get('.col > .btn', {timeout: 10000}).click()
        cy.get(':nth-child(1) > #validationDefault01', {timeout: 10000}).clear()

        cy.wait(2000)
        cy.get(':nth-child(1) > #validationDefault01', {timeout: 10000}).type('ELENDU JAMES GLOBAL')
        cy.get('.col > .btn', {timeout: 10000}).click()
        cy.get(':nth-child(1) > #validationDefault01', {timeout: 10000}).clear()

        cy.wait(2000)
        cy.get(':nth-child(1) > #validationDefault01', {timeout: 10000}).type('Shekinah kiddies academy')
        cy.get('.col > .btn', {timeout: 10000}).click()
        

        //Assert Search result is displayed
        cy.get('.table', {timeout: 10000}).should('be.visible')
        
    })

    it('Should Search by Phone Number', () => {
        cy.get(':nth-child(2) > #validationDefault01', {timeout: 10000}).type('+234703984660')
        cy.get('.col > .btn', {timeout: 10000}).click()

        cy.wait(2000)
        cy.get(':nth-child(2) > #validationDefault01', {timeout: 10000}).clear()
        cy.get(':nth-child(2) > #validationDefault01', {timeout: 10000}).type('+2348080935239')
        cy.get('.col > .btn', {timeout: 10000}).click() 


        //Assert Search result is displayed
        cy.get('.table', {timeout: 10000}).should('be.visible')
        
    })

    it('Should Return "NO DATA" for Search by Invalid Phone Number', () => {
        cy.get(':nth-child(2) > #validationDefault01', {timeout: 10000}).type('+2347')
        cy.get('.col > .btn', {timeout: 10000}).click()

        cy.wait(2000)
        cy.get(':nth-child(2) > #validationDefault01', {timeout: 10000}).clear()
        cy.get(':nth-child(2) > #validationDefault01', {timeout: 10000}).type('95604390')
        cy.get('.col > .btn', {timeout: 10000}).click() 


        //Assert Search result is displayed
        cy.get('.table', {timeout: 10000}).should('be.visible')
        
    })

    it('Should Search by Taxpayer Type', () => {
        cy.get(':nth-child(5) > .form-control', {timeout: 10000}).select('CORPORATE')
        cy.get('.col > .btn', {timeout: 10000}).click()

        cy.wait(2000)
        //cy.get(':nth-child(5) > .form-control', {timeout: 10000}).clear()
        cy.get(':nth-child(5) > .form-control', {timeout: 10000}).select('INFORMAL BUSINESS')
        cy.get('.col > .btn', {timeout: 10000}).click() 

        //Assert Search result is displayed
        cy.get('.table', {timeout: 10000}).should('be.visible')
        
    })

    it('Should Search by Status', () => {
        cy.get(':nth-child(6) > .form-control', {timeout: 10000}).select('UNREGISTERED')
        cy.get('.col > .btn', {timeout: 10000}).click()

        cy.wait(2000)
        cy.get(':nth-child(6) > .form-control', {timeout: 10000}).select('REJECTED')
        cy.get('.col > .btn', {timeout: 10000}).click()

        //Assert Search result is displayed
        cy.get('.table', {timeout: 10000}).should('be.visible')
        
    })

    it('Should Search by Enumeration Date', () => {
        cy.get(':nth-child(3) > .input-group > .form-control', {timeout: 10000}).type('01/03/2023')
        cy.get(':nth-child(4) > .input-group > .form-control', {timeout: 10000}).type('31/03/2023')
        cy.get('.col > .btn', {timeout: 10000}).click()

        //Assert Search result is displayed
        cy.get('.table', {timeout: 10000}).should('be.visible')
        
    })

    it.only('Should return an error when end date is before start date', () => {
        cy.get(':nth-child(3) > .input-group > .form-control', {timeout: 10000}).type('01/03/2023')
        cy.get(':nth-child(4) > .input-group > .form-control', {timeout: 10000}).type('31/02/2023')
        cy.get('.col > .btn', {timeout: 10000}).click()

        //Assert Error message is displayed
        cy.get('.ng-trigger').contains('Enumerated after cannot be later than enumerated before')
            .should('be.visible')
        
    })

    
})