// auto-generated, do not edit
import type { PlainTimeWindow, BlockedApp, SuccessOutput, RuleSchedule } from '../shared';

export namespace SaveUser {
  export interface Input {
    id: UUID;
    isNew: boolean;
    name: string;
    keyloggingEnabled: boolean;
    screenshotsEnabled: boolean;
    screenshotsResolution: number;
    screenshotsFrequency: number;
    showSuspensionActivity: boolean;
    downtime?: PlainTimeWindow;
    keychains: Array<{
      id: UUID;
      schedule?: RuleSchedule;
    }>;
    blockedApps?: BlockedApp[];
  }

  export type Output = SuccessOutput;
}
