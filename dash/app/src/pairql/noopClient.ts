import { Result } from '@dash/types';
import type { ApiClient } from './client';

const noopClient: ApiClient = {
  confirmPendingNotificationMethod: async () => {
    return Result.success({ success: true });
  },
  createPendingAppConnection: async () => {
    return Result.success({ code: 0 });
  },
  createPendingNotificationMethod: async () => {
    return Result.success({ methodId: `` });
  },
  deleteActivityItems: async () => {
    return Result.success({ success: true });
  },
  deleteEntity: async () => {
    return Result.success({ success: true });
  },
  flagActivityItems: async () => {
    return Result.success({ success: true });
  },
  getAdmin: async () => {
    return Result.success({
      id: ``,
      email: ``,
      subscriptionStatus: { case: `paid` },
      notifications: [],
      verifiedNotificationMethods: [],
      hasAdminChild: false,
      monthlyPriceInDollars: 10,
    });
  },
  getAdminKeychain: async () => {
    return Result.success({
      children: [],
      summary: {
        id: ``,
        parentId: ``,
        name: ``,
        description: ``,
        isPublic: false,
        numKeys: 0,
      },
      keys: [],
    });
  },
  getAdminKeychains: async () => {
    return Result.success({ children: [], keychains: [] });
  },
  dashboardWidgets: async () => {
    return Result.success({
      children: [],
      childActivitySummaries: [],
      unlockRequests: [],
      recentScreenshots: [],
      numParentNotifications: 0,
    });
  },
  getIdentifiedApps: async () => {
    return Result.success([]);
  },
  getSelectableKeychains: async () => {
    return Result.success({ own: [], public: [] });
  },
  getSuspendFilterRequest: async () => {
    return Result.success({
      id: ``,
      deviceId: ``,
      userName: ``,
      userId: ``,
      requestedDurationInSeconds: 0,
      requestComment: ``,
      status: `rejected`,
      createdAt: new Date().toISOString(),
      extraMonitoringOptions: {},
    });
  },
  getUnlockRequest: async () => {
    return Result.success({
      id: ``,
      userId: ``,
      userName: ``,
      status: `rejected`,
      url: ``,
      domain: ``,
      ipAddress: ``,
      requestComment: ``,
      appName: ``,
      appSlug: ``,
      appBundleId: ``,
      appCategories: [],
      createdAt: new Date().toISOString(),
    });
  },
  getUnlockRequests: async () => {
    return Result.success([]);
  },
  getUser: async () => {
    return Result.success({
      id: ``,
      name: ``,
      keyloggingEnabled: false,
      screenshotsEnabled: false,
      screenshotsResolution: 1000,
      screenshotsFrequency: 90,
      showSuspensionActivity: true,
      keychains: [],
      devices: [],
      createdAt: new Date().toISOString(),
    });
  },
  getDevice: async () => {
    return Result.success({
      id: ``,
      name: undefined,
      releaseChannel: `stable`,
      appVersion: ``,
      users: [],
      serialNumber: ``,
      modelIdentifier: ``,
      modelFamily: `unknown`,
      modelTitle: ``,
    });
  },
  handleCheckoutCancel: async () => {
    return Result.success({ success: true });
  },
  handleCheckoutSuccess: async () => {
    return Result.success({ success: true });
  },
  userActivityFeed: async () => {
    return Result.success({
      numDeleted: 0,
      userName: ``,
      showSuspensionActivity: true,
      items: [],
    });
  },
  combinedUsersActivityFeed: async () => {
    return Result.success([]);
  },
  childActivitySummaries: async () => {
    return Result.success({ childName: ``, days: [] });
  },
  familyActivitySummaries: async () => {
    return Result.success([]);
  },
  getUsers: async () => {
    return Result.success([]);
  },
  decideFilterSuspensionRequest: async () => {
    return Result.success({ success: true });
  },
  getDevices: async () => {
    return Result.success([]);
  },
  latestAppVersions: async () => {
    return Result.success({
      stable: ``,
      beta: ``,
      canary: ``,
    });
  },
  getUserUnlockRequests: async () => {
    return Result.success([]);
  },
  login: async () => {
    return Result.success({ token: ``, adminId: `` });
  },
  loginMagicLink: async () => {
    return Result.success({ token: ``, adminId: `` });
  },
  logEvent: async () => {
    return Result.success({ success: true });
  },
  requestMagicLink: async () => {
    return Result.success({ success: true });
  },
  resetPassword: async () => {
    return Result.success({ success: true });
  },
  saveConferenceEmail: async () => {
    return Result.success({ success: true });
  },
  saveKey: async () => {
    return Result.success({ success: true });
  },
  saveKeychain: async () => {
    return Result.success({ success: true });
  },
  saveNotification: async () => {
    return Result.success({ success: true });
  },
  saveUser: async () => {
    return Result.success({ success: true });
  },
  saveDevice: async () => {
    return Result.success({ success: true });
  },
  sendPasswordResetEmail: async () => {
    return Result.success({ success: true });
  },
  signup: async () => {
    return Result.success({});
  },
  stripeUrl: async () => {
    return Result.success({ url: `/` });
  },
  securityEventsFeed: async () => {
    return Result.success([]);
  },
  toggleChildKeychain: async () => {
    return Result.success({ success: true });
  },
  updateUnlockRequest: async () => {
    return Result.success({ success: true });
  },
  verifySignupEmail: async () => {
    return Result.success({ token: ``, adminId: `` });
  },
  requestPublicKeychain: async () => {
    return Result.success({ success: true });
  },
};

export default noopClient;
