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
        cy.get('#nav-submenu--page0 > li[routerlinkactive="active"] > .nav-link').click()

        //Assert PRR Page is Displayed
       // cy.url().should('include', '/payment-reconciliations')
    })

    it('Should not search without selecting dates', () => {
        
        cy.get('.col > .btn').click()

        //Assert Error Message
        cy.get('.ng-trigger').should('be.visible')
        //cy.get('.ng-trigger > .ng-tns-c48-4').should('be.visible')
        //cy.contains('Date Range of not more than 3 months difference must be selected').should('be.visible')

    })

    it.only('Should not return result for search greater than 3 months', () => {
        cy.get(':nth-child(7) > .input-group > .form-control').click()
        cy.get('.previous > span').click()
        cy.get('.previous > span').click()
        cy.get('.previous > span').click()
        cy.get('.previous > span').click()
        cy.get('tbody > :nth-child(2) > :nth-child(4) > .ng-star-inserted').click()
        cy.get(':nth-child(8) > .input-group > .form-control').click()
        cy.get('tbody > :nth-child(2) > :nth-child(2) > .ng-star-inserted').click()
        cy.get('.col > .btn').click()

        //Assert Error Message
        cy.get('.ng-trigger').should('be.visible')
        //cy.get('.ng-trigger > .ng-tns-c48-4').should('be.visible')
        //cy.contains('Date Range of not more than 3 months difference must be selected').should('be.visible')

    })

    it('should search by Type', () => {
        //cy.get('.form-row > :nth-child(1) > .form-control').click()
        cy.get('.form-row > :nth-child(1) > .form-control').select('Tax Payer Payment Linkage')
        cy.get(':nth-child(7) > .input-group > .input-group-addon > .btn > .fa').click()
        cy.get(':nth-child(1) > :nth-child(3) > .ng-star-inserted').click()
        cy.get(':nth-child(8) > .input-group > .form-control').click()
        cy.get('tbody > :nth-child(2) > :nth-child(2) > .ng-star-inserted').click()
        cy.get('.col > .btn').click()

        //Assert search is complete
        cy.contains('Link Payment').should('be.visible')

    })

    it('should search by Valid APRR', ()=> {
        cy.get(':nth-child(2) > #validationDefault01').type('000004701751')
        cy.get(':nth-child(7) > .input-group > .form-control').click()
        cy.get(':nth-child(1) > :nth-child(3) > .ng-star-inserted').click()
        cy.get(':nth-child(8) > .input-group > .form-control').click()
        cy.get('tbody > :nth-child(2) > :nth-child(2) > .ng-star-inserted').click()
        cy.get('.col > .btn').click()

       //Assert valid result
       cy.get('.table-responsive').should('exist')
       cy.get('.table-responsive').contains('Ministry') //find('li').should('have.length.greaterThan', 1)
       cy.contains('Link Payment').should('be.visible')
    })

    it('should return no result for search by Invalid APRR', ()=> {
        cy.get(':nth-child(2) > #validationDefault01').type('000004701')
        cy.get(':nth-child(7) > .input-group > .form-control').click()
        cy.get(':nth-child(1) > :nth-child(3) > .ng-star-inserted').click()
        cy.get(':nth-child(8) > .input-group > .form-control').click()
        cy.get('tbody > :nth-child(2) > :nth-child(2) > .ng-star-inserted').click()
        cy.get('.col > .btn').click()

        //Assert No Data is returned
        cy.get('.card-body').contains('NO DATA').should('be.visible')
    })

    it('should search by Valid Payment Reference', ()=> {
        cy.wait(3000)
        cy.get(':nth-child(3) > #validationDefault01').type('FBP|BRH|ABGIS|6-01-2023|172465')
        cy.get(':nth-child(7) > .input-group > .form-control').click()
        cy.get(':nth-child(1) > :nth-child(3) > .ng-star-inserted').click()
        cy.get(':nth-child(8) > .input-group > .form-control').click()
        cy.get('tbody > :nth-child(2) > :nth-child(2) > .ng-star-inserted').click()
        cy.get('.col > .btn').click()
        
        //Assert search success
        cy.get('tr.ng-star-inserted > :nth-child(5)').contains('FBP|BRH|ABGIS|6-01-2023|172465').should('be.visible')

    })

    it('should return no result for search by Invalid Payment Reference', ()=> {
        cy.wait(3000)
        cy.get(':nth-child(3) > #validationDefault01').type('FBP|BRK|6-01-2023|172465')
        cy.get(':nth-child(7) > .input-group > .form-control').click()
        cy.get(':nth-child(1) > :nth-child(3) > .ng-star-inserted').click()
        cy.get(':nth-child(8) > .input-group > .form-control').click()
        cy.get('tbody > :nth-child(2) > :nth-child(2) > .ng-star-inserted').click()
        cy.get('.col > .btn').click()
        
        //Assert search success
        cy.get('.table-responsive').contains('NO DATA')

    })

    it('should download result as pdf', ()=> {
        cy.get(':nth-child(5) > .form-control').type('82019001565')
        cy.get('.text-right > .btn').click()

        // Download PDF
        cy.intercept('GET', 'https://ics3staging.abiairs.gov.ng/collections/vendor-bookings',"")
        cy.get('#downloadPdf').click()

    })

    it('should download result as Xls', ()=> {
        cy.get(':nth-child(5) > .form-control').type('82019001565')
        cy.get('.text-right > .btn').click()

        // Download Xls
        cy.intercept('GET', 'https://ics3staging.abiairs.gov.ng/collections/vendor-bookings',"")
        cy.get('#downloadXls').click()

    })

})