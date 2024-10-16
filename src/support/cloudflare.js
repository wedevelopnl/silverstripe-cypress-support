'use strict';

/**
 * Helper to ensure requests can passthrough the cloudflare firewall.
 *
 * This assumes that you have the client id and client secred configured in your
 * `cypress.env.json` under the following keys:
 * ```
 * {
 *   "cloudflare_request_client_id": "{{ CLOUDFLARE_REQUEST_CLIENT_ID }}",
 *   "cloudflare_request_client_secret": "{{ CLOUDFLARE_REQUEST_CLIENT_SECRET }}"
 * }
 */

beforeEach(() => {
  const cloudflareClientId = Cypress.env('cloudflare_request_client_id');
  const cloudflareClientSecret = Cypress.env('cloudflare_request_client_secret');

  if (
    cloudflareClientId &&
    cloudflareClientId !== '{{ CLOUDFLARE_REQUEST_CLIENT_ID }}' &&
    cloudflareClientSecret &&
    cloudflareClientSecret !== '{{ CLOUDFLARE_REQUEST_CLIENT_SECRET }}'
  ) {
    cy.intercept(`${Cypress.config('baseUrl')}**`, (req) => {
      req.headers['CF-Access-Client-Id'] = cloudflareClientId;
      req.headers['CF-Access-Client-Secret'] = cloudflareClientSecret;
    });
  }
});