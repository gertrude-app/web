// auto-generated, do not edit
import type * as T from '@dash/types';

export function interceptPql(
  slug: `AllowingSignups`,
  output: T.AllowingSignups.Output,
): void;
export function interceptPql(
  slug: `CombinedUsersActivityFeed`,
  output: T.CombinedUsersActivityFeed.Output,
): void;
export function interceptPql(
  slug: `CombinedUsersActivitySummaries`,
  output: T.CombinedUsersActivitySummaries.Output,
): void;
export function interceptPql(
  slug: `ConfirmPendingNotificationMethod`,
  output: T.ConfirmPendingNotificationMethod.Output,
): void;
export function interceptPql(
  slug: `CreateBillingPortalSession`,
  output: T.CreateBillingPortalSession.Output,
): void;
export function interceptPql(
  slug: `CreatePendingAppConnection`,
  output: T.CreatePendingAppConnection.Output,
): void;
export function interceptPql(
  slug: `CreatePendingNotificationMethod`,
  output: T.CreatePendingNotificationMethod.Output,
): void;
export function interceptPql(
  slug: `DeleteActivityItems_v2`,
  output: T.DeleteActivityItems_v2.Output,
): void;
export function interceptPql(slug: `DeleteEntity`, output: T.DeleteEntity.Output): void;
export function interceptPql(slug: `GetAdmin`, output: T.GetAdmin.Output): void;
export function interceptPql(
  slug: `GetAdminKeychain`,
  output: T.GetAdminKeychain.Output,
): void;
export function interceptPql(
  slug: `GetAdminKeychains`,
  output: T.GetAdminKeychains.Output,
): void;
export function interceptPql(
  slug: `GetCheckoutUrl`,
  output: T.GetCheckoutUrl.Output,
): void;
export function interceptPql(
  slug: `GetDashboardWidgets`,
  output: T.GetDashboardWidgets.Output,
): void;
export function interceptPql(
  slug: `GetIdentifiedApps`,
  output: T.GetIdentifiedApps.Output,
): void;
export function interceptPql(
  slug: `GetSelectableKeychains`,
  output: T.GetSelectableKeychains.Output,
): void;
export function interceptPql(
  slug: `GetSuspendFilterRequest`,
  output: T.GetSuspendFilterRequest.Output,
): void;
export function interceptPql(
  slug: `GetUnlockRequest`,
  output: T.GetUnlockRequest.Output,
): void;
export function interceptPql(
  slug: `GetUnlockRequests`,
  output: T.GetUnlockRequests.Output,
): void;
export function interceptPql(slug: `GetUser`, output: T.GetUser.Output): void;
export function interceptPql(slug: `GetUsers`, output: T.GetUsers.Output): void;
export function interceptPql(
  slug: `GetUserUnlockRequests`,
  output: T.GetUserUnlockRequests.Output,
): void;
export function interceptPql(
  slug: `HandleCheckoutCancel`,
  output: T.HandleCheckoutCancel.Output,
): void;
export function interceptPql(
  slug: `HandleCheckoutSuccess`,
  output: T.HandleCheckoutSuccess.Output,
): void;
export function interceptPql(slug: `JoinWaitlist`, output: T.JoinWaitlist.Output): void;
export function interceptPql(slug: `Login`, output: T.Login.Output): void;
export function interceptPql(
  slug: `LoginMagicLink`,
  output: T.LoginMagicLink.Output,
): void;
export function interceptPql(
  slug: `RequestMagicLink`,
  output: T.RequestMagicLink.Output,
): void;
export function interceptPql(slug: `SaveKey`, output: T.SaveKey.Output): void;
export function interceptPql(slug: `SaveKeychain`, output: T.SaveKeychain.Output): void;
export function interceptPql(
  slug: `SaveNotification`,
  output: T.SaveNotification.Output,
): void;
export function interceptPql(slug: `SaveUser`, output: T.SaveUser.Output): void;
export function interceptPql(slug: `Signup`, output: T.Signup.Output): void;
export function interceptPql(
  slug: `UpdateSuspendFilterRequest`,
  output: T.UpdateSuspendFilterRequest.Output,
): void;
export function interceptPql(
  slug: `UpdateUnlockRequest`,
  output: T.UpdateUnlockRequest.Output,
): void;
export function interceptPql(
  slug: `UserActivityFeed`,
  output: T.UserActivityFeed.Output,
): void;
export function interceptPql(
  slug: `UserActivitySummaries`,
  output: T.UserActivitySummaries.Output,
): void;
export function interceptPql(
  slug: `VerifySignupEmail`,
  output: T.VerifySignupEmail.Output,
): void;

export function interceptPql(slug: string, output: any): void {
  cy.intercept(`/pairql/dashboard/${slug}`, output).as(slug);
}

export function forcePqlErr(
  slug:
    | 'AllowingSignups'
    | 'CombinedUsersActivityFeed'
    | 'CombinedUsersActivitySummaries'
    | 'ConfirmPendingNotificationMethod'
    | 'CreateBillingPortalSession'
    | 'CreatePendingAppConnection'
    | 'CreatePendingNotificationMethod'
    | 'DeleteActivityItems_v2'
    | 'DeleteEntity'
    | 'GetAdmin'
    | 'GetAdminKeychain'
    | 'GetAdminKeychains'
    | 'GetCheckoutUrl'
    | 'GetDashboardWidgets'
    | 'GetIdentifiedApps'
    | 'GetSelectableKeychains'
    | 'GetSuspendFilterRequest'
    | 'GetUnlockRequest'
    | 'GetUnlockRequests'
    | 'GetUser'
    | 'GetUsers'
    | 'GetUserUnlockRequests'
    | 'HandleCheckoutCancel'
    | 'HandleCheckoutSuccess'
    | 'JoinWaitlist'
    | 'Login'
    | 'LoginMagicLink'
    | 'RequestMagicLink'
    | 'SaveKey'
    | 'SaveKeychain'
    | 'SaveNotification'
    | 'SaveUser'
    | 'Signup'
    | 'UpdateSuspendFilterRequest'
    | 'UpdateUnlockRequest'
    | 'UserActivityFeed'
    | 'UserActivitySummaries'
    | 'VerifySignupEmail',
  details: Record<string, any> = {},
): void {
  cy.intercept(`/pairql/dashboard/${slug}`, { __cyStubbedError: true, ...details });
}