/// <reference types="cypress" />
import * as mock from '../../src/redux/__tests__/mocks';
import { entireDay } from '../../src/lib/helpers';
import { dateFromUrl } from '@dash/datetime';
import { controlledTime } from '../../../datetime/node_modules/@shared/datetime/src';

describe(`user screen`, () => {
  beforeEach(() => {
    cy.simulateLoggedIn();

    cy.intercept(`/pairql/dashboard/SaveUser`, (req) => {
      req.alias = `saveUser`;
      req.reply({ success: true });
    });

    cy.intercept(`/pairql/dashboard/GetUsers`, [mock.user({ id: `user-123` })]);

    cy.intercept(`/pairql/dashboard/DeleteEntity`, { success: true });
  });

  describe(`new user creation`, () => {
    it(`creating and updating user`, () => {
      cy.visit(`/users/new`);
      cy.testId(`user-name`).type(`Bo`);

      cy.contains(`Save user`).click();
      cy.wait(`@saveUser`);

      cy.testId(`page-heading`).should(`have.text`, `Edit user`);
      cy.contains(`Save user`).should(`be.disabled`);

      cy.testId(`user-name`).type(`az`);
      cy.contains(`Save user`).should(`be.enabled`).click();
      cy.wait(`@saveUser`);

      cy.sidebarClick(`Users`);
      cy.contains(`Boaz`);
      cy.testId(`user-card`).should(`have.length`, 2);
    });

    it(`redirects to new uuid path & doesn't list unsaved new user`, () => {
      cy.visit(`/users/new`);

      // redirects to /users/<new-user-id>
      cy.location(`pathname`).should(`not.eq`, `/users/new`);
      cy.contains(`Create user`);

      // don't show the empty new user in the list
      cy.sidebarClick(`Users`);
      cy.testId(`user-card`).should(`have.length`, 1);
    });
  });

  describe(`user deletion`, () => {
    it(`redirects to /users path`, () => {
      cy.visit(`/users`);
      cy.contains(`Edit`).click();

      cy.contains(`Delete user`).click();
      cy.testId(`modal-primary-btn`).click();

      // redirects to /users
      cy.location(`pathname`).should(`eq`, `/users`);
    });
  });

  describe(`all users activity`, () => {
    it.only(`overviews page`, () => {
      cy.intercept(`/pairql/dashboard/GetUsersActivityDays`,
        [
          mock.allUsersActivityOverviewItem({
            userId: `1`,
            days: [
              mock.activityDay(10, 4, controlledTime.now()),
              mock.activityDay(1234, 5, controlledTime.subtracting({ days: 1 })),
            ],
          }),
          mock.allUsersActivityOverviewItem({
            userId: `456`,
            userName: `Suzy`,
            days: [mock.activityDay(16, 2, controlledTime.now())],
          }),
        ]
      );

      cy.visit(`/users/activity`);

      cy.contains(`6 out of 26`)
      cy.contains(`5 out of 1234`)
    });

    it(`review day`, () => {
      cy.intercept(`/pairql/dashboard/GetUsersActivityDay`, (req) => {
        req.alias = `getUsersActivityDay`;
        req.reply([
          mock.allUsersActivityDay(),
          mock.allUsersActivityDay({ userName: `Suzy`, numDeleted: 1 }),
        ]);
      });

      cy.visit(`/users/activity/03-06-2023`);

      cy.wait(`@getUsersActivityDay`)
        .its(`request.body`)
        .should(`deep.equal`, { range: entireDay(dateFromUrl('03-06-2023')) });
    });
  });
});
