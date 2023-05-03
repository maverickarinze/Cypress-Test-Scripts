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
        cy.get('.open > .hs-sub-menu > :nth-child(5) > .nav-link').click()
        //cy.get('.col > .btn', {timeout: 25000}).click()

        //Assert WHT Page is Displayed
        //cy.url().should('include', '/withholding-tax/schedule-list', {timeout: 10000})
    })

    it('Should Click on Search Button to View Notices and Correspondence', () => {
        cy.get('.col-3 > .btn', {timeout: 10000}).click()

        //Assert Search result is displayed
        cy.get('.table', {timeout: 10000}).should('be.visible')
        
    })

    it('Should Search by ABSSIN', () => {
        cy.get('#tin', {timeout: 10000}).type('320211770298')
        cy.get('.col-3 > .btn', {timeout: 10000}).click()

        cy.wait(2000)
        cy.get('#tin', {timeout: 10000}).clear()
        cy.get('#tin', {timeout: 10000}).type('820212499012')
        cy.get('.col-3 > .btn', {timeout: 10000}).click() 


        //Assert Search result is displayed
        cy.get('.table', {timeout: 10000}).should('be.visible')
        
    })

    it('Should Return "NO DATA" for Search by Invalid ABSSIN', () => {
        cy.get('#tin', {timeout: 10000}).type('320211770')
        cy.get('.col-3 > .btn', {timeout: 10000}).click()

        //Assert NO DATA is displayed
        cy.get('tr > .text-center', {timeout: 10000}).contains('NO DATA').should('be.visible')
        
    })

    it('Should Search by Delivery Status', () => {
        cy.get('#deliveryStatus', {timeout: 10000}).select('Acknowledged')
        cy.get('.col-3 > .btn', {timeout: 10000}).click()

        cy.wait(2000)
        cy.get('#deliveryStatus', {timeout: 10000}).select('Delivered')
        cy.get('.col-3 > .btn', {timeout: 10000}).click()

        cy.wait(2000)
        cy.get('#deliveryStatus', {timeout: 10000}).select('Not Delivered')
        cy.get('.col-3 > .btn', {timeout: 10000}).click()
        

        //Assert Search result is displayed
        cy.get('.table', {timeout: 10000}).should('be.visible')
        
    })

    it('Should Search by Notice ID', () => {
        cy.get('.col-md-2 > div', {timeout: 10000}).click()
        cy.get('#noticeId', {timeout: 10000}).type('79850259')
        cy.get('.col-3 > .btn', {timeout: 10000}).click()

        cy.wait(2000)
        cy.get('#noticeId', {timeout: 10000}).clear()
        cy.get('#noticeId', {timeout: 10000}).type('79850243')
        cy.get('.col-3 > .btn', {timeout: 10000}).click() 


        //Assert Search result is displayed
        cy.get('.table', {timeout: 10000}).should('be.visible')
        
    })

    it('Should Return "NO DATA" for Search by Invalid Notice ID', () => {
        cy.get('.col-md-2 > div', {timeout: 10000}).click()
        cy.get('#noticeId', {timeout: 10000}).type('798259')
        cy.get('.col-3 > .btn', {timeout: 10000}).click()

        //Assert NO DATA is displayed
        cy.get('tr > .text-center', {timeout: 10000}).contains('NO DATA').should('be.visible')
        
    })

    it('Should Search by Delivery Channel', () => {
        cy.get('.col-md-2 > div', {timeout: 10000}).click()
        cy.get('#channel', {timeout: 10000}).select('EMAIL')
        cy.get('.col-3 > .btn', {timeout: 10000}).click()

        cy.wait(2000)
        cy.get('#channel', {timeout: 10000}).select('IN APP')
        cy.get('.col-3 > .btn', {timeout: 10000}).click()

        cy.wait(2000)
        cy.get('#channel', {timeout: 10000}).select('SMS')
        cy.get('.col-3 > .btn', {timeout: 10000}).click()
        

        //Assert Search result is displayed
        cy.get('.table', {timeout: 10000}).should('be.visible')
        
    })

    it('Should Search by Tax Office', () => {
        cy.get('.col-md-2 > div', {timeout: 10000}).click()
        cy.get('#taxOffice', {timeout: 10000}).select('Aba North Revenue Office')
        cy.get('.col-3 > .btn', {timeout: 10000}).click()

        cy.wait(2000)
        cy.get('#taxOffice', {timeout: 10000}).select('Aba South Revenue Office')
        cy.get('.col-3 > .btn', {timeout: 10000}).click()

        cy.wait(2000)
        cy.get('#taxOffice', {timeout: 10000}).select('Arochukwu Revenue Office')
        cy.get('.col-3 > .btn', {timeout: 10000}).click()
        

        //Assert Search result is displayed
        cy.get('.table', {timeout: 10000}).should('be.visible')
        
    })

    it.only('Should Search by Date', () => {
        cy.get('.col-md-2 > div', {timeout: 10000}).click()
        cy.get(':nth-child(8) > .form-group > .input-group > .form-control', {timeout: 10000}).type('15/10/2021')
        cy.get(':nth-child(9) > .form-group > .input-group > .form-control', {timeout: 10000}).type('20/10/2021')
        cy.get('.col-3 > .btn', {timeout: 10000}).click()

        //Assert Search result is displayed
        cy.get('.table', {timeout: 10000}).should('be.visible')
        
    })

    it.only('Should View Details of a Search Record', () => {
        cy.get('.col-3 > .btn', {timeout: 10000}).click()

        //View Details
        cy.get(':nth-child(1) > :nth-child(8) > .btn', {timeout: 10000}).click()
        cy.wait(2000)
        cy.get('.modal-body').should('be.visible')
        cy.get('.modal-footer > .btn', {timeout: 10000}).click()

        //Assert Search result is displayed
        cy.get('.table', {timeout: 10000}).should('be.visible')
        
    })


    
})