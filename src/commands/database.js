Cypress.Commands.add('reloadDatabase', () => {
  cy.logout();
  cy.task('db:reload');
});
