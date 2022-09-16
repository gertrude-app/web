import { expect, test, describe } from 'vitest';
import * as keys from '../keys';

describe(`keys.parse()`, () => {
  const cases: Array<[Record<string, unknown>, Key | boolean]> = [
    [{}, false],
    [
      {
        __typename: `IpAddressData`,
        type: `ipAddress`,
        ipAddress: `1.2.3.4`,
        scope: { type: `unrestricted` },
        extraField: true, // <-- extra props not allowed
      },
      false,
    ],
    [
      {
        __typename: `IpAddressData`,
        type: `ipAddress`,
        domain: `goats.com`, // <-- mismatched prop key',
        scope: { type: `unrestricted` },
      },
      false,
    ],
    [
      {
        __typename: `IpAddressData`,
        type: `ipAddress`,
        ipAddress: `1.2.3.4`,
        scope: { type: `unrestricted`, __typename: `UnrestrictedData` },
      },
      true,
    ],
    [
      {
        __typename: `SkeletonData`,
        scope: {
          __typename: `IdentifiedAppData`,
          type: `identifiedAppSlug`,
          identifiedAppSlug: `goats`,
        },
        type: `skeleton`,
      },
      true,
    ],
  ];

  test.each(cases)(`parse input %s`, (obj, isValid) => {
    if (isValid) {
      expect(keys.parse(JSON.stringify(obj))).toEqual(obj);
    } else {
      expect(keys.parse(JSON.stringify(obj))).toBeNull();
    }
  });
});
