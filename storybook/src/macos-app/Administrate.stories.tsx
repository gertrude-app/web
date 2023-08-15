import { Administrate } from '@macos/appviews';
import type { Meta, StoryObj } from '@storybook/react';
import { props, appWindow } from '../story-helpers';

const meta = {
  title: 'MacOS App/Administrate', // eslint-disable-line
  component: Administrate,
  parameters: appWindow(),
} satisfies Meta<typeof Administrate>;

type Story = StoryObj<typeof meta>;

export const ActionsChecksPassing: Story = props({
  screen: `actions`,
  windowOpen: true,
  healthCheck: {
    latestAppVersion: { case: `ok`, value: `2.0.0` },
    filterStatus: {
      case: `installed`,
      version: `2.0.0`,
      numUserKeys: 42,
    },
    screenRecordingPermissionOk: true,
    keystrokeRecordingPermissionOk: true,
    macOsUserType: { case: `ok`, value: `standard` },
    notificationsSetting: `alert`,
    accountStatus: { case: `ok`, value: `active` },
  },
  installedAppVersion: `2.0.0`,
  filterState: { case: `on` },
  userName: `Little Jimmy`,
  screenshotMonitoringEnabled: true,
  keystrokeMonitoringEnabled: false,
  releaseChannel: `stable`,
  quitting: false,
  filterSuspensionDurationInSeconds: `300`,
  emit: () => {},
  dispatch: () => {},
});

export const ActionsAccountNeedsAttention: Story = props({
  ...ActionsChecksPassing.args,
  healthCheck: {
    ...ActionsChecksPassing.args.healthCheck,
    accountStatus: { case: `ok`, value: `needsAttention` },
  },
});

export const ActionsAccountInactive: Story = props({
  ...ActionsChecksPassing.args,
  healthCheck: {
    ...ActionsChecksPassing.args.healthCheck,
    accountStatus: { case: `ok`, value: `inactive` },
  },
});

export const ActionsChecksFailing: Story = props({
  ...ActionsChecksPassing.args,
  healthCheck: {
    ...ActionsChecksPassing.args.healthCheck,
    screenshotMonitoringEnabled: false,
    notificationsSetting: `none`,
  },
  filterState: { case: `on` },
});

export const HealthCheckLoading: Story = props({
  ...ActionsChecksPassing.args,
  screen: `healthCheck`,
  healthCheck: {},
});

export const HealthCheckFailing: Story = props({
  ...HealthCheckLoading.args,
  screen: `healthCheck`,
  healthCheck: {
    latestAppVersion: { case: `ok`, value: `2.1.0` },
    filterStatus: { case: `communicationBroken`, repairing: false },
    screenRecordingPermissionOk: false,
    keystrokeRecordingPermissionOk: false,
    macOsUserType: { case: `ok`, value: `admin` },
    notificationsSetting: `none`,
    accountStatus: { case: `ok`, value: `active` },
  },
  screenshotMonitoringEnabled: true,
  keystrokeMonitoringEnabled: true,
});

export const HealthCheckError: Story = props({
  ...HealthCheckLoading.args,
  screen: `healthCheck`,
  healthCheck: {
    latestAppVersion: { case: `error` },
    filterStatus: { case: `unexpected` },
    screenRecordingPermissionOk: false,
    keystrokeRecordingPermissionOk: false,
    macOsUserType: { case: `error`, message: `Check the specs on the rotary girder` },
    notificationsSetting: `none`,
    accountStatus: { case: `error` },
  },
});

export const ExemptUsers: Story = props({
  ...ActionsChecksPassing.args,
  screen: `exemptUsers`,
  exemptableUsers: {
    case: `ok`,
    value: [
      { id: 501, name: `Dad`, isExempt: true, isAdmin: true },
      { id: 503, name: `Big Suzy`, isExempt: false, isAdmin: false },
    ],
  },
});

export const ExemptUsersError: Story = props({
  ...ExemptUsers.args,
  exemptableUsers: { case: `error` },
});

export const Advanced: Story = props({
  ...ActionsChecksPassing.args,
  screen: `advanced`,
  advanced: {
    pairqlEndpointDefault: `https://api.getrude.app/pairql`,
    websocketEndpointDefault: `https://api.getrude.app/websocket-app`,
    appcastEndpointDefault: `https://api.getrude.app/appcast.xml`,
    appVersions: {
      '2.1.1': `2.1.1`,
      '2.2.0': `2.2.0 (beta)`,
    },
  },
});

export default meta;
