import { expect, it, describe } from 'vitest';
import { SubscriptionStatus, Trigger } from '@dash/types';
import { editable, Query, Req } from '../../../redux/helpers';
import { makeState } from '../../../redux/__tests__/test-helpers';
import { queryProps } from '../AdminProfile';

describe(`Profile.queryProps`, () => {
  it(`handles determining method deletability correctly`, () => {
    const state = makeState((state) => {
      state.admin.profileRequest = Req.succeed({
        email: `blob@blob.com`,
        subscriptionStatus: SubscriptionStatus.trialing,
      });

      state.admin.notificationMethods = {
        verifiedMethod1: {
          id: `verifiedMethod1`,
          data: { type: `email`, email: `blob@blob.com` }, // <-- required email
        },
        verifiedMethod2: {
          id: `verifiedMethod2`,
          data: { type: `text`, phoneNumber: `7` }, // <-- used by notification, not deletable
        },
        verifiedMethod3: {
          id: `verifiedMethod3`,
          data: { type: `text`, phoneNumber: `8` }, // <-- should be deletable
        },
      };
      state.admin.notifications = {
        notification1: {
          editing: false,
          ...editable({
            id: `notification1`,
            methodId: `verifiedMethod2`, // <-- makes method 2 not deletable
            trigger: Trigger.unlockRequestSubmitted,
          }),
        },
      };
    });

    const [query] = queryProps((() => {}) as any)(state);
    expect(Query.props(query)?.methods.map((m) => m.deletable)).toEqual([
      false,
      false,
      true,
    ]);
  });
});