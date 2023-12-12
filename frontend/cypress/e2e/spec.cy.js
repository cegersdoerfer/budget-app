describe('App E2E', () => {
  it('Visits the app and navigates through pages', () => {
      // Visit the root of the application
      cy.visit('http://165.22.36.253/'); // Replace with the actual URL of your app

      // Check if the login page is shown
      cy.contains('Login'); // Assuming 'Login' is a text in your LoginPanel

      // click signup button
      cy.contains('Sign Up').click();
      cy.url().should('include', '/login');
      cy.get('input[type="email"]').type('testuser');
      cy.get('input[placeholder="Enter your password"]').type('password');
      cy.get('input[placeholder="Confirm your password"]').type('password');
      cy.contains('Sign Up').click();
      cy.url().should('include', '/dashboard');
      cy.contains('Dashboard');

      // Navigate to Expenses page
      cy.contains('Expenses').click();
      cy.url().should('include', '/expenses');

      // Navigate back to Dashboard page
      cy.contains('Dashboard').click();
      cy.url().should('include', '/dashboard');

      // Logout from the application
      cy.contains('Logout').click();
      cy.contains('Login'); // Assuming 'Login' is shown after successful logout
  });

  it('Logs in', () => {
      // Visit the login page
      cy.visit('http://165.22.36.253/');
      cy.contains('Login'); // Assuming 'Login' is a text in your LoginPanel
      cy.contains('Login').click();
      cy.url().should('include', '/login');
      cy.get('input[type="email"]').type('testuser');
      cy.get('input[placeholder="Enter your password"]').type('password');
      cy.contains('Login').click();
      cy.url().should('include', '/dashboard');
      cy.contains('Dashboard');
  });

});
