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
        cy.get('#nav-link--page0').click()
        cy.get('#nav-submenu--page0 > :nth-child(7) > .nav-link').click()

        //Assert PRR Page is Displayed
       // cy.url().should('include', '/payment-reconciliations')
    })

    it('Should Display Result when Search Button is Clicked', () => {
        
        cy.get('.col > .btn', {timeout: 10000}).click()

        //Assert Search result is displayed
        cy.get('.table-responsive > .table').should('be.visible')
        

    })

    it('should search by Type', () => {
        //cy.get('.form-row > :nth-child(1) > .form-control').click()
        cy.get('.form-row > :nth-child(1) > .form-control', {timeout: 10000}).select('Tax Payer Payment Linkage')
        cy.get('.col > .btn').click()

        cy.wait(2000)
        cy.get('.form-row > :nth-child(1) > .form-control').select('Payment Invoice Linkage')
        cy.get('.col > .btn').click()

        cy.wait(2000)
        cy.get('.form-row > :nth-child(1) > .form-control').select('CDN Payment Linkage')
        cy.get('.col > .btn').click()

        //Assert search is complete
        cy.get('.table-responsive > .table').should('be.visible')

    })

    it('Should Search by Valid Payment Reference', ()=> {
        cy.get('#paymentReference', {timeout: 10000}).type('FCMB|BRH|ABIA|29-03-2022|223675')
        cy.get('.col > .btn').click()
        
        //Assert search success
        cy.get('.table-responsive > .table').should('be.visible')

    })

    it('Should Return "NO DATA" for Search by Invalid Payment Reference', ()=> {
        cy.get('#paymentReference', {timeout: 10000}).type('FCMB|BRH|ABIA|29-03-2022|2235')
        cy.get('.col > .btn').click()
        
        //Assert NO DATA IS displayed
        cy.get('tr > .text-center').contains('NO DATA').should('be.visible')

    })

    it('Should Search by Narrative', ()=> {
        cy.get('#narrative', {timeout: 10000}).type('Board of Internal Revenue')
        cy.get('.col > .btn').click()
        
        //Assert search success
        cy.get('.table-responsive > .table').should('be.visible')

    })

    it('Should Search by Agency and Revenue Head', ()=> {
        cy.get(':nth-child(5) > .form-control', {timeout: 10000}).select('ABIA COMETS FOOTBALL CLUB')
        cy.get(':nth-child(6) > .form-control', {timeout: 10000}).select('Grants from NFF')
        cy.get('.col > .btn').click()
        
        //Assert search success
        cy.get('.table-responsive > .table').should('be.visible')

    })

    it('Should Search by Linked Date', () => {
        cy.get(':nth-child(7) > .input-group > .form-control', {timeout: 10000}).type('01/03/2023')
        cy.get(':nth-child(8) > .input-group > .form-control', {timeout: 10000}).type('31/03/2023')
        cy.get('.col').click()
        cy.get('.col > .btn', {timeout: 10000}).click()

        //Assert Search result is displayed
        cy.get('.table-responsive > .table').should('be.visible')
        
    })


})