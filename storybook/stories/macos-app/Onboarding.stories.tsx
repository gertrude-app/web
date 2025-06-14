import { Onboarding } from '@macos/appviews';
import type { Meta, StoryObj } from '@storybook/react';
import { appWindow, props } from '../story-helpers';

const meta = {
  title: 'MacOS App/Onboarding', // eslint-disable-line
  component: Onboarding,
  parameters: appWindow(900, 700),
} satisfies Meta<typeof Onboarding>;

type Story = StoryObj<typeof meta>;

export const Welcome: Story = props({
  windowOpen: true,
  osVersion: { name: `sequoia`, major: 15 },
  step: `welcome`,
  connectChildRequest: { case: `idle` },
  screenRecordingPermissionGranted: false,
  keyloggingPermissionGranted: false,
  currentUser: { id: 502, name: `Suzy`, isAdmin: false },
  users: [
    { id: 503, name: `Little Jimmy`, isAdmin: false },
    { id: 501, name: `Bob McParent`, isAdmin: true },
    { id: 502, name: `Suzy`, isAdmin: false },
  ],
  exemptableUserIds: [501, 503],
  exemptUserIds: [501],
  connectionCode: ``,
  didResume: false,
  receivedAppState: true,
  isUpgrade: false,
  emit: () => {},
  dispatch: () => {},
});

export const WrongInstallDir: Story = props({
  ...Welcome.args,
  step: `wrongInstallDir`,
});

export const ConfirmGertrudeAcct: Story = props({
  ...Welcome.args,
  step: `confirmGertrudeAccount`,
});

export const NoGertrudeAcct: Story = props({
  ...Welcome.args,
  step: `noGertrudeAccount`,
});

export const MacUserGood: Story = props({
  ...Welcome.args,
  step: `macosUserAccountType`,
});

export const MacUserGood2: Story = props({
  ...Welcome.args,
  step: `macosUserAccountType`,
  users: [
    { id: 501, name: `Bob McParent`, isAdmin: true },
    { id: 504, name: `Betsy`, isAdmin: true },
  ],
});

export const MacUserBad: Story = props({
  ...Welcome.args,
  step: `macosUserAccountType`,
  currentUser: { id: 501, name: `Bob McParent`, isAdmin: true },
  users: [{ id: 501, name: `Bob McParent`, isAdmin: true }],
});

export const MacUserChoose: Story = props({
  ...MacUserBad.args,
  userRemediationStep: `choose`,
  users: [
    { id: 501, name: `Bob McParent`, isAdmin: true },
    { id: 502, name: `Sally McMom`, isAdmin: true },
    { id: 502, name: `Little Jimmy`, isAdmin: false },
  ],
});

export const MacUserTutorialCreate: Story = props({
  ...MacUserBad.args,
  userRemediationStep: `create`,
});

export const MacUserTutorialSwitch: Story = props({
  ...MacUserBad.args,
  userRemediationStep: `switch`,
});

export const MacUserTutorialDemote: Story = props({
  ...MacUserBad.args,
  userRemediationStep: `demote`,
});

export const GetConnectionCode: Story = props({
  ...Welcome.args,
  step: `getChildConnectionCode`,
});

export const ConnectChildIdle: Story = props({
  ...Welcome.args,
  step: `connectChild`,
});

export const ConnectChildOngoing: Story = props({
  ...Welcome.args,
  step: `connectChild`,
  connectChildRequest: { case: `ongoing` },
});

export const ConnectChildFailed: Story = props({
  ...Welcome.args,
  step: `connectChild`,
  connectChildRequest: { case: `failed` },
});

export const ConnectChildSuccess: Story = props({
  ...Welcome.args,
  step: `connectChild`,
  connectChildRequest: { case: `succeeded`, payload: `Little Jimmy` },
});

export const HowToUseGifs: Story = props({
  ...Welcome.args,
  step: `howToUseGifs`,
});

export const AllowNotificationsStart: Story = props({
  ...Welcome.args,
  step: `allowNotifications_start`,
});

export const AllowNotificationsGrant: Story = props({
  ...Welcome.args,
  step: `allowNotifications_grant`,
});

export const AllowNotificationsFailed: Story = props({
  ...Welcome.args,
  step: `allowNotifications_failed`,
});

export const AllowDiskAccessGrant: Story = props({
  ...Welcome.args,
  step: `allowFullDiskAccess_grantAndRestart`,
});

export const AllowDiskAccessSuccess: Story = props({
  ...Welcome.args,
  step: `allowFullDiskAccess_success`,
});

export const AllowDiskAccessFailed: Story = props({
  ...Welcome.args,
  step: `allowFullDiskAccess_failed`,
});

export const AllowDiskAccessGrantUpgrade: Story = props({
  ...Welcome.args,
  step: `allowFullDiskAccess_grantAndRestart`,
  isUpgrade: true,
});

export const AllowDiskAccessSuccessUpgrade: Story = props({
  ...Welcome.args,
  step: `allowFullDiskAccess_success`,
  isUpgrade: true,
});

export const AllowScreenshotsRequired: Story = props({
  ...Welcome.args,
  step: `allowScreenshots_required`,
});

export const AllowScreenshotsGrant: Story = props({
  ...Welcome.args,
  step: `allowScreenshots_grantAndRestart`,
});

export const AllowScreenshotsSuccess: Story = props({
  ...Welcome.args,
  step: `allowScreenshots_success`,
});

export const AllowScreenshotsFailed: Story = props({
  ...Welcome.args,
  step: `allowScreenshots_failed`,
});

export const AllowKeyloggingRequired: Story = props({
  ...Welcome.args,
  step: `allowKeylogging_required`,
});

export const AllowKeyloggingGrant: Story = props({
  ...Welcome.args,
  step: `allowKeylogging_grant`,
});

export const AllowKeyloggingFailed: Story = props({
  ...Welcome.args,
  step: `allowKeylogging_failed`,
});

export const InstallSysExtExplain: Story = props({
  ...Welcome.args,
  step: `installSysExt_explain`,
});

export const InstallSysExtAllowTrick: Story = props({
  ...Welcome.args,
  step: `installSysExt_trick`,
});

export const InstallSysExtAllowInstall: Story = props({
  ...Welcome.args,
  step: `installSysExt_allow`,
});

export const InstallSysExtFail: Story = props({
  ...Welcome.args,
  step: `installSysExt_failed`,
});

export const InstallSysExtSuccess: Story = props({
  ...Welcome.args,
  step: `installSysExt_success`,
});

export const ExemptUsers: Story = props({
  ...Welcome.args,
  step: `exemptUsers`,
});

export const LocateMenuBarIcon: Story = props({
  ...Welcome.args,
  step: `locateMenuBarIcon`,
});

export const ViewHealthCheck: Story = props({
  ...Welcome.args,
  step: `viewHealthCheck`,
});

export const EasyMode: Story = props({
  ...Welcome.args,
  step: `encourageFilterSuspensions`,
});

export const HowToUseGertrude: Story = props({
  ...Welcome.args,
  step: `howToUseGertrude`,
});

export const Finish: Story = props({
  ...Welcome.args,
  step: `finish`,
});

export default meta;
