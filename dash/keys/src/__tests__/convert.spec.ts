import { it, describe, expect } from 'vitest';
import type { UnlockRequestCreateKeyData } from '@dash/types';
import type { Key } from '@dash/types';
import { convert } from '..';

describe(`convert.unlockRequestToState()`, () => {
  it(`sets the unlockRequestAddress`, () => {
    const unlockRequest: UnlockRequestCreateKeyData = {
      url: `https://xyz.cloudfront.net/jim/jam.js`,
      appCategories: [`browser`],
      appBundleId: `com.brave`,
      appSlug: `brave`,
    };
    const state = convert.unlockRequestToState(`keyId`, `keychainId`, unlockRequest);
    expect(state.unlockRequestAddress).toBe(`https://xyz.cloudfront.net/jim/jam.js`);
  });
});

describe(`convert.toState()`, () => {
  it(`sets appIdentificationType correctly for bundleId-only skeleton key`, () => {
    const key: Key = {
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

  it(`turns on the advanced mode if key is domain regex`, () => {
    const key: Key = {
      id: `key-id`,
      keychainId: `keychain-id`,
      key: {
        type: `domainRegex`,
        pattern: `foo-*-bar.com`,
        scope: { type: `webBrowsers` },
      },
    };
    const state = convert.toState(key);
    expect(state.showAdvancedAddressOptions).toBe(true);
  });

  it(`turns on the advanced mode if key is ip address`, () => {
    const key: Key = {
      id: `key-id`,
      keychainId: `keychain-id`,
      key: {
        type: `ipAddress`,
        ipAddress: `1.2.3.4`,
        scope: { type: `webBrowsers` },
      },
    };
    const state = convert.toState(key);
    expect(state.showAdvancedAddressOptions).toBe(true);
  });

  it(`sets appIdentificationType correctly for bundleId-only domain key`, () => {
    const key: Key = {
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
