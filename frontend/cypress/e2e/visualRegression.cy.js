
describe('Visual E2E', () => {
    beforeEach(() => { // run before each test
        cy.eyesOpen({
            appName: 'Expense Tracker',
            testName: 'Visual E2E',
            browser: { width: 800, height: 600 },
        });
    }
    );

    afterEach(() => { // run after each test
        cy.eyesClose();
    }
    );  

    it('Visits the app', () => {
        cy.visit('http://165.22.36.253/')
        cy.eyesCheckWindow('Login Page');
    }
    );

    it('Logs in', () => {
        cy.visit('http://165.22.36.253/')
        cy.get('input[name="username"]').type('testuser')
        cy.get('input[name="password"]').type('password')
        cy.get('button[type="submit"]').click()
        cy.eyesCheckWindow('Dashboard Page');
    }
    );

    it('Navigates to expenses page', () => {
        cy.visit('http://165.22.36.253/')
        cy.get('[link="/expenses"]').click()
        cy.eyesCheckWindow('Expenses Page');
        cy.eyesCheckWindow('Add Budget Categories');
        cy.eyesCheckWindow('Set Month');
        cy.eyesCheckWindow('Active Budget Categories');
        cy.eyesCheckWindow('Expense Input');
    }
    );

    it('Logs out', () => {
        cy.visit('http://165.22.36.253/')
        cy.contains('Login').click();
        cy.url().should('include', '/login');
        cy.get('input[name="username"]').type('testuser')
        cy.get('input[name="password"]').type('password')
        cy.get('button[type="submit"]').click()
        cy.get('[link="/logout"]').click()
        cy.eyesCheckWindow('Login Page');
    });
}
);


