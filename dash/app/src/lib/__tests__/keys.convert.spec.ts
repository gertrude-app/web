import { it, describe, expect } from 'vitest';
import { convert } from '@dash/keys';
import type { KeyRecord } from '@dash/keys';

describe(`convert.toState()`, () => {
  it(`sets appIdentificationType correctly for bundleId-only skeleton key`, () => {
    const key: KeyRecord = {
      id: `key-id`,
      keychainId: `keychain-id`,
      key: {
        type: `skeleton`,
        scope: {
          type: `bundleId`,
          bundleId: `com.unknown`,
        },
      },
    };
    const state = convert.toState(key);
    expect(state.appIdentificationType).toBe(`bundleId`);
  });

  it(`sets appIdentificationType correctly for bundleId-only domain key`, () => {
    const key: KeyRecord = {
      id: `key-id`,
      keychainId: `keychain-id`,
      key: {
        type: `domain`,
        domain: `cf.iadsdk.apple.com`,
        scope: {
          type: `single`,
          single: {
            type: `bundleId`,
            bundleId: `.com.apple.ap.adprivacyd`,
          },
        },
      },
    };
    const state = convert.toState(key);
    expect(state.appIdentificationType).toBe(`bundleId`);
  });
});
