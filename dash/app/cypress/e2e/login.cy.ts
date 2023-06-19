/// <reference types="cypress" />
import { betsy } from '../fixtures/helpers';

describe(`dashboard app login`, () => {
  beforeEach(() => {
    cy.interceptPql(`RequestMagicLink`, { success: true });
  });

  describe(`standard login procedures`, () => {
    it(`handles happy path`, () => {
      cy.visit(`/login`);
      cy.get(`input[name=email]`).type(betsy.email);
      cy.get(`input[name=password]`).type(`${betsy.password}{enter}`);
      cy.location(`pathname`).should(`eq`, `/`);
      cy.contains(`Little Jimmy`).should(() => {
        expect(localStorage.getItem(`admin_id`)).to.eq(betsy.id);
        expect(localStorage.getItem(`admin_token`)).to.match(/^[0-9a-f-]{36}$/);
      });
    });

    it(`handles wrong password`, () => {
      cy.visit(`/login`);
      cy.get(`input[name=email]`).type(betsy.email);
      cy.get(`input[name=password]`).type(`bad{enter}`);
      cy.location(`pathname`).should(`eq`, `/login`);
      cy.contains(`Incorrect`);
    });

    it(`handles magic-link`, () => {
      cy.visit(`/login`);
      cy.testId(`magic-link`).should(`be.disabled`);
      cy.get(`input[name=email]`).type(betsy.email);
      cy.testId(`magic-link`).should(`not.be.disabled`).click();

      cy.wait(`@requestMagicLink`).its(`request.body.email`).should(`eq`, betsy.email);

      cy.contains(`Check your email`);
    });

    it(`handles magic-link with redirect`, () => {
      cy.visit(`/login?redirect=${encodeURIComponent(`/users/123`)}`);
      cy.get(`input[name=email]`).type(betsy.email);
      cy.testId(`magic-link`).click();

      cy.wait(`@requestMagicLink`)
        .its(`request.body`)
        .should(`deep.equal`, { email: betsy.email, redirect: `/users/123` });

      cy.contains(`Check your email`);
    });

    it(`redirects to / if admin is already logged in`, () => {
      cy.simulateLoggedIn();
      cy.visit(`/login`);
      cy.contains(`Dashboard`);
    });

    it(`redirects to intended location after login (missing admin tokens)`, () => {
      cy.visit(`/users`);
      cy.url().should(`include`, `/login`);
      cy.get(`input[name=email]`).type(`82uii.betsy-mcstandard@inbox.testmail.app`);
      cy.get(`input[name=password]`).type(`betsy123{enter}`);
      cy.location(`pathname`).should(`eq`, `/users`);
    });

    it(`redirects to intended location after login (expired admin tokens)`, () => {
      localStorage.setItem(`admin_id`, betsy.id);
      localStorage.setItem(`admin_token`, `deadbeef-dead-beef-dead-beefdeadbeef`);
      cy.visit(`/users`);
      cy.url().should(`include`, `/login`);
      cy.get(`input[name=email]`).type(`82uii.betsy-mcstandard@inbox.testmail.app`);
      cy.get(`input[name=password]`).type(`betsy123{enter}`);
      cy.location(`pathname`).should(`eq`, `/users`);
    });
  });

  describe(`password reset`, () => {
    it(`shows email sent confirmation when no error`, () => {
      cy.intercept(`/pairql/dashboard/SendPasswordResetEmail`, (req) => {
        req.alias = `sendPasswordResetEmail`;
        req.reply({ success: true });
      });
      cy.visit(`/login`);
      cy.contains(`Forgot password?`).click();
      cy.location(`pathname`).should(`eq`, `/reset-password`);
      cy.contains(`Reset your password`);
      cy.get(`input[type=email]`).type(betsy.email);
      cy.contains(`Send reset link`).click();
      cy.contains(`Email sent!`).should(`be.visible`);
    });

    it(`shows error when there's no user with given email address`, () => {
      cy.intercept(`/pairql/dashboard/SendPasswordResetEmail`, (req) => {
        req.alias = `sendPasswordResetEmail`;
        req.reply({ success: false });
      });
      cy.visit(`/login`);
      cy.contains(`Forgot password?`).click();
      cy.location(`pathname`).should(`eq`, `/reset-password`);
      cy.contains(`Reset your password`);
      cy.get(`input[type=email]`).type(betsy.email);
      cy.contains(`Send reset link`).click();
      cy.contains(`Uh-oh!`).should(`be.visible`);
    });

    it(`logs user back in after password reset`, () => {
      cy.intercept(`/pairql/dashboard/ResetPassword`, (req) => {
        req.alias = `resetPassword`;
        req.reply({ success: true });
      });
      cy.visit(`/reset-password/123`);
      cy.contains(`Choose a new password`);
      cy.get(`input[type=password]`).type(`super_secret?`);
      cy.contains(`Log in`).click();
      cy.contains(`Password successfully changed!`);
    });

    it(`shows error when password reset fails due to invalid token`, () => {
      cy.intercept(`/pairql/dashboard/ResetPassword`, (req) => {
        req.alias = `resetPassword`;
        req.reply({ success: false });
      });
      cy.visit(`/reset-password/123`);
      cy.contains(`Choose a new password`);
      cy.get(`input[type=password]`).type(`super_secret?`);
      cy.contains(`Log in`).click();
      cy.contains(`Uh-oh!`);
      cy.contains(`Invalid token.`);
    });
  });
});
