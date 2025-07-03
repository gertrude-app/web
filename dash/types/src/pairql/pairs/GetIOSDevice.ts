// auto-generated, do not edit

export namespace GetIOSDevice {
  export type Input = UUID;

  export interface Output {
    childName: string;
    deviceType: string;
    osVersion: string;
    allBlockGroups: Array<{
      id: UUID;
      name: string;
    }>;
    enabledBlockGroups: UUID[];
    webPolicy: string;
    webPolicyDomains: string[];
  }
}
