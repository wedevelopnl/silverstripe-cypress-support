/**
 * Based upon: https://webtips.dev/webtips/cypress/check-if-element-is-in-viewport
 */
export default _chai => {
  function assertIsInViewport() {
    const windowBottom = Cypress.$(cy.state('window')).height();
    const width = Cypress.$(cy.state('window')).width();
    const rect = this._obj[0].getBoundingClientRect();

    this.assert(
      rect.bottom > 0 && rect.bottom < windowBottom && rect.left >= 0 && rect.right <= width,
      'expected #{this} to be in the viewport',
      'expected #{this} to not be in the viewport',
      this._obj
    );
  }

  _chai.Assertion.addMethod('inViewport', assertIsInViewport);
};
