/// <reference types="cypress" />
import { betsy } from '../fixtures/helpers';

describe(`dashboard app login`, () => {
  beforeEach(() => {
    cy.interceptPql(`RequestMagicLink`, { success: true });
  });

  xdescribe(`standard login procedures`, () => {
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
    it(`handles happy path`, () => {});
  });
});
