Cypress.Commands.add('login', () => {
  cy.session(
    'Admin',
    () => {
      cy.visit('/Security/login')

      cy.get('input[name="Email"]').type('development@wedevelop.nl');
      cy.get('input[name="Password"]').type(Cypress.env('admin_password'), { log: false });
      cy.get('input[name="action_doLogin"]').click()
      cy.getCookie('PHPSESSID').should('exist');
      cy.get('#MemberLoginForm_LoginForm_error')
        .text()
        .should('exist');
    },
    {
      validate: () => {
        cy.getCookie('PHPSESSID').should('exist');
      }
    }
  );
});

Cypress.Commands.add('logout', () => {
  // Need to flush everything here cause silverstripe sessions.
  cy.clearAllCookies();
  cy.clearAllLocalStorage();
  cy.clearAllSessionStorage();
  Cypress.session.clearAllSavedSessions();
  cy.log('Cleared session');
});