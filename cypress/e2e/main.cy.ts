describe('Main test', () => {
    before(() => {
        cy.exec('yarn testdb:create')
    })

    it('Reaches the auth page', () => {
        cy.visit('http://localhost:3000')
    })
    it('Creates an account', () => {
        cy.visit('http://localhost:3000')
        cy.contains('Register').click()
        cy.get('input[placeholder="paulecode"]').type('user1')
        cy.get('input[placeholder="********"]').type('pass123')
        cy.contains('Submit').click()

        cy.url().should('include', '/home')

        cy.contains('Log out').click()

        cy.url().should('not.include', '/home')
    })

    it('fails when trying to bypass auth', () => {
        cy.visit('http://localhost:3000/home')
        cy.url().should('not.include', '/home')
    })

    it('fails logging in with wrong credentials', () => {
        cy.visit('http://localhost:3000')
        cy.contains('Login').click()
        cy.get('input[placeholder="paulecode"]').type('user1')
        cy.get('input[placeholder="********"]').type('pass124')
        cy.contains('Submit').click()
        cy.contains('Invalid credentials')
    })

    it('fails creating the same user again', () => {
        cy.visit('http://localhost:3000')
        cy.contains('Register').click()
        cy.get('input[placeholder="paulecode"]').type('user1')
        cy.get('input[placeholder="********"]').type('pass124')
        cy.contains('Submit').click()
        cy.contains('User exists')
    })

    it('logs in successfully', () => {
        cy.visit('http://localhost:3000')
        cy.contains('Login').click()
        cy.get('input[placeholder="paulecode"]').type('user1')
        cy.get('input[placeholder="********"]').type('pass123')
        cy.contains('Submit').click()

        cy.url().should('include', '/home')

        cy.contains('Upload').click()

        cy.get('input[type="file"]').as('fileInput')

        cy.fixture('test.midi').then((fileContent) => {
            cy.get('@fileInput').attachFile({
                fileContent: fileContent.toString(),
                fileName: 'Random bach piece',
                mimeType: 'audio/midi',
            })
        })

        cy.get('button[type="submit"]').click()

        cy.visit('http://localhost:3000/home')
        cy.reload()

        cy.contains('No file selected')
        cy.contains('Random bach piece').click()
        // https://stackoverflow.com/questions/76669245/why-does-a-midi-files-header-change-after-being-uploaded-as-a-flutter-http-mult
        // This is as far as this end2end test goes

        cy.get('button.w-9').click()

        cy.contains('No pieces uploaded yet')

        cy.contains('Delete Account').click()
    })

    it("can't log in after deleting account", () => {
        cy.visit('http://localhost:3000')
        cy.contains('Login').click()
        cy.get('input[placeholder="paulecode"]').type('user1')
        cy.get('input[placeholder="********"]').type('pass123')
        cy.contains('Submit').click()

        cy.url().should('not.include', '/home')
    })

    after(() => {
        cy.exec('yarn testdb:stop')
        cy.exec('yarn testdb:rm')
    })
})

Cypress.on('uncaught:exception', (err) => {
    console.log('err.message', err.message)

    if (err.message.includes('NEXT_REDIRECT')) {
        return false
    }
})

