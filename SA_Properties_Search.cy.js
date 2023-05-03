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
        cy.get(':nth-child(11) > .nav-link', {timeout: 10000}).click()
        

        //Assert WHT Page is Displayed
        //cy.url().should('include', '/withholding-tax/schedule-list', {timeout: 10000})
    })

    it('Should Click Search to View Properties', () => {
        cy.get('.col-12 > .btn', {timeout: 10000}).click()

        //Assert Search result is displayed
        cy.get('.p-3', {timeout: 10000}).should('be.visible')
        
    })

    it('Should Search by Property ID', () => {
        cy.get('.row > :nth-child(1) > .form-control', {timeout: 10000}).type('0002058024')
        cy.get('.col-12 > .btn', {timeout: 10000}).click()

        cy.wait(5000)
        cy.get('.row > :nth-child(1) > .form-control', {timeout: 10000}).clear()
        cy.get('.row > :nth-child(1) > .form-control', {timeout: 10000}).type('0002058022')
        cy.get('.col-12 > .btn', {timeout: 10000}).click() 


        //Assert Search result is displayed
        cy.get('.p-3', {timeout: 10000}).should('be.visible')
        
    })

    it('Should Search by Type', () => {
        cy.get('.row > :nth-child(2) > .form-control', {timeout: 10000}).select('LIST')
        cy.get('.col-12 > .btn', {timeout: 10000}).click()

        cy.wait(5000)
        cy.get('.row > :nth-child(2) > .form-control', {timeout: 10000}).select('MAP')
        cy.get('.col-12 > .btn', {timeout: 10000}).click()

        //Assert Search result is displayed
        cy.get('.p-3', {timeout: 10000}).should('be.visible')
        
    })

    it('Should Search by Profile Category', () => {
        cy.get('.row > :nth-child(3) > .form-control', {timeout: 10000}).select('BUSINESS CATEGORY')
        cy.get('.col-12 > .btn', {timeout: 10000}).click()

        cy.wait(2000)
        cy.get('.row > :nth-child(3) > .form-control', {timeout: 10000}).select('BUSINESS PREMISES')
        cy.get('.col-12 > .btn', {timeout: 10000}).click()

        cy.wait(2000)
        cy.get('.row > :nth-child(3) > .form-control', {timeout: 10000}).select('BUSINESS SIZE')
        cy.get('.col-12 > .btn', {timeout: 10000}).click()

        cy.wait(2000)
        cy.get('.row > :nth-child(3) > .form-control', {timeout: 10000}).select('INCOME CLASSIFICATION')
        cy.get('.col-12 > .btn', {timeout: 10000}).click()

        cy.wait(2000)
        cy.get('.row > :nth-child(3) > .form-control', {timeout: 10000}).select('PETROLEUM (INSPECTION/CERTIFICATION)')
        cy.get('.col-12 > .btn', {timeout: 10000}).click()

        cy.wait(2000)
        cy.get('.row > :nth-child(3) > .form-control', {timeout: 10000}).select('PETROLEUM (OPERATION PERMIT)')
        cy.get('.col-12 > .btn', {timeout: 10000}).click()

        cy.wait(2000)
        cy.get('.row > :nth-child(3) > .form-control', {timeout: 10000}).select('PRESUMPTIVE TAX')
        cy.get('.col-12 > .btn', {timeout: 10000}).click()

        cy.wait(2000)
        cy.get('.row > :nth-child(3) > .form-control', {timeout: 10000}).select('SANITATION')
        cy.get('.col-12 > .btn', {timeout: 10000}).click()

        cy.wait(2000)
        cy.get('.row > :nth-child(3) > .form-control', {timeout: 10000}).select('SCHOOL')
        cy.get('.col-12 > .btn', {timeout: 10000}).click()

        cy.wait(2000)
        cy.get('.row > :nth-child(3) > .form-control', {timeout: 10000}).select('SETTLEMENT TYPE')
        cy.get('.col-12 > .btn', {timeout: 10000}).click()

        cy.wait(2000)
        cy.get('.row > :nth-child(3) > .form-control', {timeout: 10000}).select('SIGNAGE')
        cy.get('.col-12 > .btn', {timeout: 10000}).click()

        cy.wait(2000)
        cy.get('.row > :nth-child(3) > .form-control', {timeout: 10000}).select('WATER RATE')
        cy.get('.col-12 > .btn', {timeout: 10000}).click()

        
        //Assert Search result is displayed
        cy.get('.p-3', {timeout: 10000}).should('be.visible')
        
    })

    it('Should Search by Address', () => {
        cy.get('[name="lgaCode"]', {timeout: 10000}).select('ABA NORTH')
        cy.get('[name="areaCode"]', {timeout: 10000}).select('ABA NORTH')
        cy.get('[name="streetCode"]').select('ABA OWERRI ROAD')
        cy.get('.col-12 > .btn', {timeout: 10000}).click()

        cy.wait(5000)
        cy.get('[name="lgaCode"]', {timeout: 10000}).select('ABA SOUTH')
        cy.get('[name="areaCode"]', {timeout: 10000}).select('ABA SOUTH')
        cy.get('[name="streetCode"]').select('ASA ROAD')
        cy.get('.col-12 > .btn', {timeout: 10000}).click()
        

        //Assert Search result is displayed
        cy.get('.p-3', {timeout: 10000}).should('be.visible')
        
    })

    it('Should Search by Building', () => {
        cy.get('[name="buildingUseCode"]', {timeout: 10000}).select('AGRICULTURAL')
        cy.get('.col-12 > .btn', {timeout: 10000}).click()

        cy.wait(5000)
        cy.get('[name="buildingUseCode"]', {timeout: 10000}).select('COMMERCIAL')
        cy.get('.col-12 > .btn', {timeout: 10000}).click()
        

        //Assert Search result is displayed
        cy.get('.p-3', {timeout: 10000}).should('be.visible')
        
    })

    it('Should Search by Date', () => {
        cy.get('.grp-filter > :nth-child(3) > .form-control', {timeout: 10000}).type('01/03/2023')
        cy.get(':nth-child(5) > .form-control', {timeout: 10000}).type('30/03/2023')
        cy.get('.col-12 > .btn', {timeout: 10000}).click()

        //Assert Search result is displayed
        cy.get('.p-3', {timeout: 10000}).should('be.visible')
        
    })


})