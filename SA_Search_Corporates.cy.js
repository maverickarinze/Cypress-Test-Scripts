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
        cy.get('.open > .hs-sub-menu > :nth-child(1) > .nav-link').click()
        cy.get('#corporate', {timeout: 25000}).click()

        //Assert WHT Page is Displayed
        //cy.url().should('include', '/withholding-tax/schedule-list', {timeout: 10000})
    })

    it('Should click on search button to Search Corporates', () => {
        cy.wait(3000)
        cy.get('#corporateSubmitButton', {timeout: 10000}).click()

        //Assert Search result is displayed
        cy.get('.table-responsive', {timeout: 10000}).should('be.visible')
        
    })

    it('Should Search by Organization Name', () => {
        cy.get('.row > :nth-child(1) > .form-control', {timeout: 10000}).type('KHOLA VET SERVICES')
        cy.get('#corporateSubmitButton', {timeout: 10000}).click()

        //Assert Search result is displayed
        cy.get('.table-responsive', {timeout: 10000}).should('be.visible')
        
    })

    it('Should Search by ABSSIN', () => {
        cy.get(':nth-child(4) > .form-control', {timeout: 10000}).type('2232523352')
        cy.get('#corporateSubmitButton', {timeout: 10000}).click()

        //Assert Search result is displayed
        cy.get('.table-responsive', {timeout: 10000}).should('be.visible')
        
    })

    it('Should Return "NO DATA" for Search by Invalid ABSSIN', () => {
        cy.get(':nth-child(4) > .form-control', {timeout: 10000}).type('223252335')
        cy.get('#corporateSubmitButton', {timeout: 10000}).click()

        //Assert Search result is displayed
        cy.get('.table-responsive', {timeout: 10000}).should('be.visible')
        cy.get('tr > .text-center').contains('NO DATA').should('be.visible')
        
    })

    it('Should Search by LGA and Area', () => {
        cy.get(':nth-child(7) > .form-control', {timeout: 10000}).select('Aba North')
        cy.get(':nth-child(8) > .form-control', {timeout: 10000}).select('Aba')
        cy.get('#corporateSubmitButton', {timeout: 10000}).click()

        //Assert Search result is displayed
        cy.get('.table-responsive', {timeout: 10000}).should('be.visible')
        
    })

    it('Should Search by Profile', () => {
        cy.get(':nth-child(9) > .form-control', {timeout: 10000}).select('Urban')
        cy.get('#corporateSubmitButton', {timeout: 10000}).click()

        //Assert Search result is displayed
        cy.get('.table-responsive', {timeout: 10000}).should('be.visible')
        
    })

    it('Should Search by Date', () => {
        cy.get(':nth-child(10) > .input-group > .form-control', {timeout: 10000}).type('01/03/2023')
        cy.get(':nth-child(11) > .input-group > .form-control', {timeout: 10000}).type('31/03/2023')
        cy.get('#corporateSubmitButton', {timeout: 10000}).click()

        //Assert Search result is displayed
        cy.get('.table-responsive', {timeout: 10000}).should('be.visible')
        
    })

    it('Should Search by Assessment Status and Assessment Type', () => {
        cy.get(':nth-child(12) > .form-control', {timeout: 10000}).select('ASSESSED')
        cy.get(':nth-child(13) > .form-control', {timeout: 10000}).select('PAYE SCHEDULE')
        cy.get('#corporateSubmitButton', {timeout: 10000}).click()

        //Assert Search result is displayed
        cy.get('.table-responsive', {timeout: 10000}).should('be.visible')
        
    })

    it('Should Search by Profile Status and Profiled Under', () => {
        cy.get(':nth-child(15) > .form-control', {timeout: 10000}).select('PROFILED')
        cy.get(':nth-child(16) > .form-control', {timeout: 10000}).select('ANY')
        cy.get('#corporateSubmitButton', {timeout: 10000}).click()

        //Assert Search result is displayed
        cy.get('.table-responsive', {timeout: 10000}).should('be.visible')

    })

    it('Should Search by Business Category and Sub-Category', () => {
        cy.get(':nth-child(17) > .form-control', {timeout: 10000}).select('ARTISAN')
        cy.get(':nth-child(18) > .form-control', {timeout: 10000}).select('ANY')
        cy.get('#corporateSubmitButton', {timeout: 10000}).click()

        //Assert Search result is displayed
        cy.get('.table-responsive', {timeout: 10000}).should('be.visible')

    })

    it('Should Search by Record Source', () => {
        cy.get(':nth-child(19) > .form-control', {timeout: 10000}).select('IDMS')
        cy.get('#corporateSubmitButton', {timeout: 10000}).click()

        cy.wait(2000)
        cy.get(':nth-child(19) > .form-control', {timeout: 10000}).select('WEB')
        cy.get('#corporateSubmitButton', {timeout: 10000}).click()

        cy.wait(2000)
        cy.get(':nth-child(19) > .form-control', {timeout: 10000}).select('VENDOR')
        cy.get('#corporateSubmitButton', {timeout: 10000}).click()

        cy.wait(2000)
        cy.get(':nth-child(19) > .form-control', {timeout: 10000}).select('ANICS HDN')
        cy.get('#corporateSubmitButton', {timeout: 10000}).click()

        cy.wait(2000)
        cy.get(':nth-child(19) > .form-control', {timeout: 10000}).select('JTB')
        cy.get('#corporateSubmitButton', {timeout: 10000}).click()

        //Assert Search result is displayed
        cy.get('.table-responsive', {timeout: 10000}).should('be.visible')

    })

    it.only('Should Search by Demand Notice', () => {
        cy.get(':nth-child(20) > .form-control', {timeout: 10000}).select('BAKERY')
        cy.get('#corporateSubmitButton', {timeout: 10000}).click()

        cy.wait(2000)
        cy.get(':nth-child(20) > .form-control', {timeout: 10000}).select('BUILDING')
        cy.get('#corporateSubmitButton', {timeout: 10000}).click()

        cy.wait(2000)
        cy.get(':nth-child(20) > .form-control', {timeout: 10000}).select('GAMING')
        cy.get('#corporateSubmitButton', {timeout: 10000}).click()

        cy.wait(2000)
        cy.get(':nth-child(20) > .form-control', {timeout: 10000}).select('HOTELS')
        cy.get('#corporateSubmitButton', {timeout: 10000}).click()

        cy.wait(2000)
        cy.get(':nth-child(20) > .form-control', {timeout: 10000}).select('INDUSTRIES')
        cy.get('#corporateSubmitButton', {timeout: 10000}).click()

        //Assert Search result is displayed
        cy.get('.table-responsive', {timeout: 10000}).should('be.visible')

    })


})