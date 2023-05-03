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

        // Open Vendor Collection
        cy.get('#nav-link--page0').click()
        cy.get('#nav-submenu--page0 > :nth-child(2) > .nav-link').click()
    })

    it('should search by date', () => {
        cy.get(':nth-child(1) > .input-group > .input-group-addon > .btn > .fa', {timeout: 10000}).click()
        cy.get('tbody > :nth-child(1) > :nth-child(2) > .ng-star-inserted').click()
        cy.get(':nth-child(2) > .input-group > .input-group-addon > .btn > .fa').click()
        cy.get(':nth-child(1) > :nth-child(8) > .ng-star-inserted').click()
        cy.get('.text-right > .btn').click()

    })

    it('Start date should not be later than end date', () => {
        cy.get(':nth-child(1) > .input-group > .input-group-addon > .btn > .fa', {timeout: 10000}).click()
        cy.get('tbody > :nth-child(1) > :nth-child(4) > .ng-star-inserted').click()
        cy.get(':nth-child(2) > .input-group > .form-control').click()
        cy.get(':nth-child(1) > :nth-child(3) > .ng-star-inserted').click()
        cy.get('.text-right > .btn').click()

        //Assert Error Message
        cy.get('.ng-trigger').should('be.visible')
        cy.contains('Start date cannot be later than end date').should('be.visible')

    })

    it.only('should return result by Valid ABSSIN', ()=> {
        cy.get(':nth-child(5) > .form-control', {timeout: 10000}).type('82019001565')
        cy.get('.text-right > .btn').click()

        //Assert valid result
        cy.contains('82019001565', {timeout: 10000}).should('be.visible')
    })

    it('should return no result for search by Invalid ABSSIN', ()=> {
        cy.get(':nth-child(5) > .form-control', {timeout: 10000}).type('82019001565')
        cy.get('.text-right > .btn').click()
    })

    it('should search by valid payer name', () => {
        cy.get(':nth-child(16) > .form-control', {timeout: 10000}).type('POSSIBLE PRINCE')
        cy.get('.text-right > .btn').click()

        //Assert valid result
        cy.contains('POSSIBLE PRINCE', {timeout: 10000}).should('be.visible')
    })

    it('should return no result for search by invalid payer name', () => {
        cy.get(':nth-child(16) > .form-control', {timeout: 10000}).type('Stanley')
        cy.get('.text-right > .btn').click()
    })

    it('should search by Valid APRR', ()=> {
        cy.get(':nth-child(3) > .form-control', {timeout: 10000}).type('000003422012')
        cy.get('.text-right > .btn').click()
    })

    it('should return no result for search by Invalid APRR', ()=> {
        cy.get(':nth-child(3) > .form-control', {timeout: 10000}).type('000012458789')
        cy.get('.text-right > .btn').click()
    })

    it('should search by Valid Receipt Number', ()=> {
        cy.get(':nth-child(4) > .form-control', {timeout: 10000}).type('RCT525501')
        cy.get('.text-right > .btn').click()
    })

    it('should return no result for search by Invalid Receipt Number', ()=> {
        cy.get(':nth-child(4) > .form-control', {timeout: 10000}).type('000012458789')
        cy.get('.text-right > .btn').click()
    })

    it('should fill all filters', () => {
        cy.get(':nth-child(1) > .input-group > .input-group-addon > .btn > .fa').click()
        cy.get('tbody > :nth-child(1) > :nth-child(4) > .ng-star-inserted').click()
        cy.get(':nth-child(2) > .input-group > .input-group-addon > .btn > .fa').click()
        cy.get(':nth-child(2) > :nth-child(7) > .ng-star-inserted').click()
        cy.get('.text-right > .btn').click()
        cy.get(':nth-child(3) > .form-control').type('123')
        cy.get(':nth-child(4) > .form-control').type('123')
        cy.get(':nth-child(5) > .form-control').type('123')
        cy.get(':nth-child(6) > .form-control').type('123')
        cy.get(':nth-child(7) > .form-control').select(["Aba North"])
        cy.get(':nth-child(8) > .form-control').select(["Aba"])
        cy.get(':nth-child(9) > .form-control').select(["Bush Market 1"])
        cy.get(':nth-child(10) > .form-control').select(["Grain Barn"])
        cy.get(':nth-child(11) > .form-control').select(["Grain Line"])
        cy.get(':nth-child(12) > .form-control').type('123')
        cy.get(':nth-child(13) > .form-control').type('123')
        cy.get(':nth-child(14) > .form-control').type('123')
        cy.get(':nth-child(15) > .form-group > .form-control').select(["ANY"])
        cy.get(':nth-child(16) > .form-control').type('Stanley Agbo')
        cy.get(':nth-child(17) > .form-group > .form-control').select(["POS"])
        cy.get(':nth-child(18) > .form-group > .form-control').select(["FIRSTMONIE"])
        cy.get('.dropdown-btn').click()
        cy.get('.item2 > :nth-child(1) > div').click()
        //cy.get('#revenueSource > .multiselect-dropdown > :nth-child(1) > .dropdown-btn > .ng-star-inserted').click()
        //cy.get('#revenueSource > .multiselect-dropdown > .dropdown-list > .item1 > .multiselect-item-checkbox > div').click()
        cy.get('.text-right > .btn').click()
    })

    it('should download result as pdf', ()=> {
        cy.get(':nth-child(5) > .form-control', {timeout: 10000}).type('82019001565')
        cy.get('.text-right > .btn').click()

        // Download PDF
        cy.intercept('GET', 'https://ics3staging.abiairs.gov.ng/collections/vendor-bookings',"")
        cy.get('#downloadPdf').click()

    })

    it('should download result as Xls', ()=> {
        cy.get(':nth-child(5) > .form-control', {timeout: 10000}).type('82019001565')
        cy.get('.text-right > .btn').click()

        // Download Xls
        cy.intercept('GET', 'https://ics3staging.abiairs.gov.ng/collections/vendor-bookings',"")
        cy.get('#downloadXls').click()

    })

})