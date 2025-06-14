// auto-generated, do not edit
import type * as T from '@dash/types';
import { query } from './query';

export const liveClient = {
  childActivitySummaries(
    input: T.ChildActivitySummaries.Input,
  ): Promise<T.Result<T.ChildActivitySummaries.Output>> {
    return query<T.ChildActivitySummaries.Input, T.ChildActivitySummaries.Output>(
      input,
      `parent`,
      `ChildActivitySummaries`,
    );
  },

  combinedUsersActivityFeed(
    input: T.CombinedUsersActivityFeed.Input,
  ): Promise<T.Result<T.CombinedUsersActivityFeed.Output>> {
    return query<T.CombinedUsersActivityFeed.Input, T.CombinedUsersActivityFeed.Output>(
      input,
      `parent`,
      `CombinedUsersActivityFeed`,
    );
  },

  confirmPendingNotificationMethod(
    input: T.ConfirmPendingNotificationMethod.Input,
  ): Promise<T.Result<T.ConfirmPendingNotificationMethod.Output>> {
    return query<
      T.ConfirmPendingNotificationMethod.Input,
      T.ConfirmPendingNotificationMethod.Output
    >(input, `parent`, `ConfirmPendingNotificationMethod`);
  },

  createPendingAppConnection(
    input: T.CreatePendingAppConnection.Input,
  ): Promise<T.Result<T.CreatePendingAppConnection.Output>> {
    return query<T.CreatePendingAppConnection.Input, T.CreatePendingAppConnection.Output>(
      input,
      `parent`,
      `CreatePendingAppConnection`,
    );
  },

  createPendingNotificationMethod(
    input: T.CreatePendingNotificationMethod.Input,
  ): Promise<T.Result<T.CreatePendingNotificationMethod.Output>> {
    return query<
      T.CreatePendingNotificationMethod.Input,
      T.CreatePendingNotificationMethod.Output
    >(input, `parent`, `CreatePendingNotificationMethod`);
  },

  dashboardWidgets(
    input: T.DashboardWidgets.Input,
  ): Promise<T.Result<T.DashboardWidgets.Output>> {
    return query<T.DashboardWidgets.Input, T.DashboardWidgets.Output>(
      input,
      `parent`,
      `DashboardWidgets`,
    );
  },

  decideFilterSuspensionRequest(
    input: T.DecideFilterSuspensionRequest.Input,
  ): Promise<T.Result<T.DecideFilterSuspensionRequest.Output>> {
    return query<
      T.DecideFilterSuspensionRequest.Input,
      T.DecideFilterSuspensionRequest.Output
    >(input, `parent`, `DecideFilterSuspensionRequest`);
  },

  deleteActivityItems(
    input: T.DeleteActivityItems_v2.Input,
  ): Promise<T.Result<T.DeleteActivityItems_v2.Output>> {
    return query<T.DeleteActivityItems_v2.Input, T.DeleteActivityItems_v2.Output>(
      input,
      `parent`,
      `DeleteActivityItems_v2`,
    );
  },

  deleteEntity(
    input: T.DeleteEntity_v2.Input,
  ): Promise<T.Result<T.DeleteEntity_v2.Output>> {
    return query<T.DeleteEntity_v2.Input, T.DeleteEntity_v2.Output>(
      input,
      `parent`,
      `DeleteEntity_v2`,
    );
  },

  familyActivitySummaries(
    input: T.FamilyActivitySummaries.Input,
  ): Promise<T.Result<T.FamilyActivitySummaries.Output>> {
    return query<T.FamilyActivitySummaries.Input, T.FamilyActivitySummaries.Output>(
      input,
      `parent`,
      `FamilyActivitySummaries`,
    );
  },

  flagActivityItems(
    input: T.FlagActivityItems.Input,
  ): Promise<T.Result<T.FlagActivityItems.Output>> {
    return query<T.FlagActivityItems.Input, T.FlagActivityItems.Output>(
      input,
      `parent`,
      `FlagActivityItems`,
    );
  },

  getAdmin(input: T.GetAdmin.Input): Promise<T.Result<T.GetAdmin.Output>> {
    return query<T.GetAdmin.Input, T.GetAdmin.Output>(input, `parent`, `GetAdmin`);
  },

  getAdminKeychain(
    input: T.GetAdminKeychain.Input,
  ): Promise<T.Result<T.GetAdminKeychain.Output>> {
    return query<T.GetAdminKeychain.Input, T.GetAdminKeychain.Output>(
      input,
      `parent`,
      `GetAdminKeychain`,
    );
  },

  getAdminKeychains(
    input: T.GetAdminKeychains.Input,
  ): Promise<T.Result<T.GetAdminKeychains.Output>> {
    return query<T.GetAdminKeychains.Input, T.GetAdminKeychains.Output>(
      input,
      `parent`,
      `GetAdminKeychains`,
    );
  },

  getDevice(input: T.GetDevice.Input): Promise<T.Result<T.GetDevice.Output>> {
    return query<T.GetDevice.Input, T.GetDevice.Output>(input, `parent`, `GetDevice`);
  },

  getDevices(input: T.GetDevices.Input): Promise<T.Result<T.GetDevices.Output>> {
    return query<T.GetDevices.Input, T.GetDevices.Output>(input, `parent`, `GetDevices`);
  },

  getIdentifiedApps(
    input: T.GetIdentifiedApps.Input,
  ): Promise<T.Result<T.GetIdentifiedApps.Output>> {
    return query<T.GetIdentifiedApps.Input, T.GetIdentifiedApps.Output>(
      input,
      `parent`,
      `GetIdentifiedApps`,
    );
  },

  getSelectableKeychains(
    input: T.GetSelectableKeychains.Input,
  ): Promise<T.Result<T.GetSelectableKeychains.Output>> {
    return query<T.GetSelectableKeychains.Input, T.GetSelectableKeychains.Output>(
      input,
      `parent`,
      `GetSelectableKeychains`,
    );
  },

  getSuspendFilterRequest(
    input: T.GetSuspendFilterRequest.Input,
  ): Promise<T.Result<T.GetSuspendFilterRequest.Output>> {
    return query<T.GetSuspendFilterRequest.Input, T.GetSuspendFilterRequest.Output>(
      input,
      `parent`,
      `GetSuspendFilterRequest`,
    );
  },

  getUnlockRequest(
    input: T.GetUnlockRequest.Input,
  ): Promise<T.Result<T.GetUnlockRequest.Output>> {
    return query<T.GetUnlockRequest.Input, T.GetUnlockRequest.Output>(
      input,
      `parent`,
      `GetUnlockRequest`,
    );
  },

  getUnlockRequests(
    input: T.GetUnlockRequests.Input,
  ): Promise<T.Result<T.GetUnlockRequests.Output>> {
    return query<T.GetUnlockRequests.Input, T.GetUnlockRequests.Output>(
      input,
      `parent`,
      `GetUnlockRequests`,
    );
  },

  getUser(input: T.GetUser.Input): Promise<T.Result<T.GetUser.Output>> {
    return query<T.GetUser.Input, T.GetUser.Output>(input, `parent`, `GetUser`);
  },

  getUsers(input: T.GetUsers.Input): Promise<T.Result<T.GetUsers.Output>> {
    return query<T.GetUsers.Input, T.GetUsers.Output>(input, `parent`, `GetUsers`);
  },

  getUserUnlockRequests(
    input: T.GetUserUnlockRequests.Input,
  ): Promise<T.Result<T.GetUserUnlockRequests.Output>> {
    return query<T.GetUserUnlockRequests.Input, T.GetUserUnlockRequests.Output>(
      input,
      `parent`,
      `GetUserUnlockRequests`,
    );
  },

  handleCheckoutCancel(
    input: T.HandleCheckoutCancel.Input,
  ): Promise<T.Result<T.HandleCheckoutCancel.Output>> {
    return query<T.HandleCheckoutCancel.Input, T.HandleCheckoutCancel.Output>(
      input,
      `parent`,
      `HandleCheckoutCancel`,
    );
  },

  handleCheckoutSuccess(
    input: T.HandleCheckoutSuccess.Input,
  ): Promise<T.Result<T.HandleCheckoutSuccess.Output>> {
    return query<T.HandleCheckoutSuccess.Input, T.HandleCheckoutSuccess.Output>(
      input,
      `parent`,
      `HandleCheckoutSuccess`,
    );
  },

  latestAppVersions(
    input: T.LatestAppVersions.Input,
  ): Promise<T.Result<T.LatestAppVersions.Output>> {
    return query<T.LatestAppVersions.Input, T.LatestAppVersions.Output>(
      input,
      `parent`,
      `LatestAppVersions`,
    );
  },

  logEvent(input: T.LogEvent.Input): Promise<T.Result<T.LogEvent.Output>> {
    return query<T.LogEvent.Input, T.LogEvent.Output>(input, `parent`, `LogEvent`);
  },

  login(input: T.Login.Input): Promise<T.Result<T.Login.Output>> {
    return query<T.Login.Input, T.Login.Output>(input, `none`, `Login`);
  },

  loginMagicLink(
    input: T.LoginMagicLink.Input,
  ): Promise<T.Result<T.LoginMagicLink.Output>> {
    return query<T.LoginMagicLink.Input, T.LoginMagicLink.Output>(
      input,
      `none`,
      `LoginMagicLink`,
    );
  },

  requestMagicLink(
    input: T.RequestMagicLink.Input,
  ): Promise<T.Result<T.RequestMagicLink.Output>> {
    return query<T.RequestMagicLink.Input, T.RequestMagicLink.Output>(
      input,
      `none`,
      `RequestMagicLink`,
    );
  },

  requestPublicKeychain(
    input: T.RequestPublicKeychain.Input,
  ): Promise<T.Result<T.RequestPublicKeychain.Output>> {
    return query<T.RequestPublicKeychain.Input, T.RequestPublicKeychain.Output>(
      input,
      `parent`,
      `RequestPublicKeychain`,
    );
  },

  resetPassword(input: T.ResetPassword.Input): Promise<T.Result<T.ResetPassword.Output>> {
    return query<T.ResetPassword.Input, T.ResetPassword.Output>(
      input,
      `none`,
      `ResetPassword`,
    );
  },

  saveConferenceEmail(
    input: T.SaveConferenceEmail.Input,
  ): Promise<T.Result<T.SaveConferenceEmail.Output>> {
    return query<T.SaveConferenceEmail.Input, T.SaveConferenceEmail.Output>(
      input,
      `none`,
      `SaveConferenceEmail`,
    );
  },

  saveDevice(input: T.SaveDevice.Input): Promise<T.Result<T.SaveDevice.Output>> {
    return query<T.SaveDevice.Input, T.SaveDevice.Output>(input, `parent`, `SaveDevice`);
  },

  saveKey(input: T.SaveKey.Input): Promise<T.Result<T.SaveKey.Output>> {
    return query<T.SaveKey.Input, T.SaveKey.Output>(input, `parent`, `SaveKey`);
  },

  saveKeychain(input: T.SaveKeychain.Input): Promise<T.Result<T.SaveKeychain.Output>> {
    return query<T.SaveKeychain.Input, T.SaveKeychain.Output>(
      input,
      `parent`,
      `SaveKeychain`,
    );
  },

  saveNotification(
    input: T.SaveNotification.Input,
  ): Promise<T.Result<T.SaveNotification.Output>> {
    return query<T.SaveNotification.Input, T.SaveNotification.Output>(
      input,
      `parent`,
      `SaveNotification`,
    );
  },

  saveUser(input: T.SaveUser.Input): Promise<T.Result<T.SaveUser.Output>> {
    return query<T.SaveUser.Input, T.SaveUser.Output>(input, `parent`, `SaveUser`);
  },

  securityEventsFeed(
    input: T.SecurityEventsFeed.Input,
  ): Promise<T.Result<T.SecurityEventsFeed.Output>> {
    return query<T.SecurityEventsFeed.Input, T.SecurityEventsFeed.Output>(
      input,
      `parent`,
      `SecurityEventsFeed`,
    );
  },

  sendPasswordResetEmail(
    input: T.SendPasswordResetEmail.Input,
  ): Promise<T.Result<T.SendPasswordResetEmail.Output>> {
    return query<T.SendPasswordResetEmail.Input, T.SendPasswordResetEmail.Output>(
      input,
      `none`,
      `SendPasswordResetEmail`,
    );
  },

  signup(input: T.Signup.Input): Promise<T.Result<T.Signup.Output>> {
    return query<T.Signup.Input, T.Signup.Output>(input, `none`, `Signup`);
  },

  stripeUrl(input: T.StripeUrl.Input): Promise<T.Result<T.StripeUrl.Output>> {
    return query<T.StripeUrl.Input, T.StripeUrl.Output>(input, `parent`, `StripeUrl`);
  },

  toggleChildKeychain(
    input: T.ToggleChildKeychain.Input,
  ): Promise<T.Result<T.ToggleChildKeychain.Output>> {
    return query<T.ToggleChildKeychain.Input, T.ToggleChildKeychain.Output>(
      input,
      `parent`,
      `ToggleChildKeychain`,
    );
  },

  updateUnlockRequest(
    input: T.UpdateUnlockRequest.Input,
  ): Promise<T.Result<T.UpdateUnlockRequest.Output>> {
    return query<T.UpdateUnlockRequest.Input, T.UpdateUnlockRequest.Output>(
      input,
      `parent`,
      `UpdateUnlockRequest`,
    );
  },

  userActivityFeed(
    input: T.UserActivityFeed.Input,
  ): Promise<T.Result<T.UserActivityFeed.Output>> {
    return query<T.UserActivityFeed.Input, T.UserActivityFeed.Output>(
      input,
      `parent`,
      `UserActivityFeed`,
    );
  },

  verifySignupEmail(
    input: T.VerifySignupEmail.Input,
  ): Promise<T.Result<T.VerifySignupEmail.Output>> {
    return query<T.VerifySignupEmail.Input, T.VerifySignupEmail.Output>(
      input,
      `none`,
      `VerifySignupEmail`,
    );
  },
};

export type ApiClient = typeof liveClient;

export const throwingClient: ApiClient = {
  childActivitySummaries: () => {
    throw new Error(`ApiClient.childActivitySummaries() not implemented`);
  },
  combinedUsersActivityFeed: () => {
    throw new Error(`ApiClient.combinedUsersActivityFeed() not implemented`);
  },
  confirmPendingNotificationMethod: () => {
    throw new Error(`ApiClient.confirmPendingNotificationMethod() not implemented`);
  },
  createPendingAppConnection: () => {
    throw new Error(`ApiClient.createPendingAppConnection() not implemented`);
  },
  createPendingNotificationMethod: () => {
    throw new Error(`ApiClient.createPendingNotificationMethod() not implemented`);
  },
  dashboardWidgets: () => {
    throw new Error(`ApiClient.dashboardWidgets() not implemented`);
  },
  decideFilterSuspensionRequest: () => {
    throw new Error(`ApiClient.decideFilterSuspensionRequest() not implemented`);
  },
  deleteActivityItems: () => {
    throw new Error(`ApiClient.deleteActivityItems() not implemented`);
  },
  deleteEntity: () => {
    throw new Error(`ApiClient.deleteEntity() not implemented`);
  },
  familyActivitySummaries: () => {
    throw new Error(`ApiClient.familyActivitySummaries() not implemented`);
  },
  flagActivityItems: () => {
    throw new Error(`ApiClient.flagActivityItems() not implemented`);
  },
  getAdmin: () => {
    throw new Error(`ApiClient.getAdmin() not implemented`);
  },
  getAdminKeychain: () => {
    throw new Error(`ApiClient.getAdminKeychain() not implemented`);
  },
  getAdminKeychains: () => {
    throw new Error(`ApiClient.getAdminKeychains() not implemented`);
  },
  getDevice: () => {
    throw new Error(`ApiClient.getDevice() not implemented`);
  },
  getDevices: () => {
    throw new Error(`ApiClient.getDevices() not implemented`);
  },
  getIdentifiedApps: () => {
    throw new Error(`ApiClient.getIdentifiedApps() not implemented`);
  },
  getSelectableKeychains: () => {
    throw new Error(`ApiClient.getSelectableKeychains() not implemented`);
  },
  getSuspendFilterRequest: () => {
    throw new Error(`ApiClient.getSuspendFilterRequest() not implemented`);
  },
  getUnlockRequest: () => {
    throw new Error(`ApiClient.getUnlockRequest() not implemented`);
  },
  getUnlockRequests: () => {
    throw new Error(`ApiClient.getUnlockRequests() not implemented`);
  },
  getUser: () => {
    throw new Error(`ApiClient.getUser() not implemented`);
  },
  getUsers: () => {
    throw new Error(`ApiClient.getUsers() not implemented`);
  },
  getUserUnlockRequests: () => {
    throw new Error(`ApiClient.getUserUnlockRequests() not implemented`);
  },
  handleCheckoutCancel: () => {
    throw new Error(`ApiClient.handleCheckoutCancel() not implemented`);
  },
  handleCheckoutSuccess: () => {
    throw new Error(`ApiClient.handleCheckoutSuccess() not implemented`);
  },
  latestAppVersions: () => {
    throw new Error(`ApiClient.latestAppVersions() not implemented`);
  },
  logEvent: () => {
    throw new Error(`ApiClient.logEvent() not implemented`);
  },
  login: () => {
    throw new Error(`ApiClient.login() not implemented`);
  },
  loginMagicLink: () => {
    throw new Error(`ApiClient.loginMagicLink() not implemented`);
  },
  requestMagicLink: () => {
    throw new Error(`ApiClient.requestMagicLink() not implemented`);
  },
  requestPublicKeychain: () => {
    throw new Error(`ApiClient.requestPublicKeychain() not implemented`);
  },
  resetPassword: () => {
    throw new Error(`ApiClient.resetPassword() not implemented`);
  },
  saveConferenceEmail: () => {
    throw new Error(`ApiClient.saveConferenceEmail() not implemented`);
  },
  saveDevice: () => {
    throw new Error(`ApiClient.saveDevice() not implemented`);
  },
  saveKey: () => {
    throw new Error(`ApiClient.saveKey() not implemented`);
  },
  saveKeychain: () => {
    throw new Error(`ApiClient.saveKeychain() not implemented`);
  },
  saveNotification: () => {
    throw new Error(`ApiClient.saveNotification() not implemented`);
  },
  saveUser: () => {
    throw new Error(`ApiClient.saveUser() not implemented`);
  },
  securityEventsFeed: () => {
    throw new Error(`ApiClient.securityEventsFeed() not implemented`);
  },
  sendPasswordResetEmail: () => {
    throw new Error(`ApiClient.sendPasswordResetEmail() not implemented`);
  },
  signup: () => {
    throw new Error(`ApiClient.signup() not implemented`);
  },
  stripeUrl: () => {
    throw new Error(`ApiClient.stripeUrl() not implemented`);
  },
  toggleChildKeychain: () => {
    throw new Error(`ApiClient.toggleChildKeychain() not implemented`);
  },
  updateUnlockRequest: () => {
    throw new Error(`ApiClient.updateUnlockRequest() not implemented`);
  },
  userActivityFeed: () => {
    throw new Error(`ApiClient.userActivityFeed() not implemented`);
  },
  verifySignupEmail: () => {
    throw new Error(`ApiClient.verifySignupEmail() not implemented`);
  },
};
