import React, { useReducer } from 'react';
import { ApiErrorMessage, Loading, Profile } from '@dash/components';
import { capitalize } from '@shared/string';
import { notNullish, typesafe } from '@shared/ts-utils';
import { Result } from '@dash/types';
import type {
  GetAdmin,
  CreatePendingNotificationMethod,
  PendingNotificationMethod,
} from '@dash/types';
import type { State } from '../../reducers/admin-reducer';
import { isDirty, Req } from '../../redux/helpers';
import { useQuery, Key, useMutation } from '../../hooks/query';
import Current from '../../environment';
import ReqState from '../../lib/ReqState';
import reducer, { initialState } from '../../reducers/admin-reducer';
import { useConfirmableDelete } from '../../hooks/delete-entity';

const AdminProfile: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const query = useQuery(Key.admin, Current.api.getAdmin, {
    onReceive: (admin) => dispatch({ type: `receivedAdmin`, admin }),
  });

  const createBillingPortalSession = useMutation(
    `create:billing-portal-session`,
    Current.api.createBillingPortalSession,
  );

  const deleteNotification = useConfirmableDelete(`AdminNotification`, {
    invalidating: [Key.admin],
  });

  const deleteMethod = useConfirmableDelete(`AdminVerifiedNotificationMethod`, {
    invalidating: [Key.admin],
  });

  const saveNotification = useMutation({
    id: `upsert:notification`,
    fn: (id: UUID) => {
      const notification = state.notifications[id];
      if (!notification) return Result.resolveUnexpected(`1662407a`);
      return Current.api.saveNotification({
        id: notification.id,
        isNew: notification.isNew === true,
        methodId: notification.draft.methodId,
        trigger: notification.draft.trigger,
      });
    },
    invalidating: [Key.admin],
  });

  const createPendingNotificationMethod = useMutation({
    id: `create:pending-notification-method`,
    fn: () => {
      const method = state.pendingNotificationMethod;
      if (!method) return Result.resolveUnexpected(`bc7511bb`);
      dispatch(PendingMethod.createStarted);
      return Current.api.createPendingNotificationMethod(toInput(method));
    },
    onSuccess: ({ methodId }) => dispatch(PendingMethod.createSucceeded(methodId)),
    onError: () => dispatch(PendingMethod.createFailed),
    invalidating: [Key.admin],
  });

  const confirmPendingNotificationMethod = useMutation({
    id: `confirm:pending-notification-method`,
    fn: () => {
      dispatch(PendingMethod.confirmStarted);
      return Current.api.confirmPendingNotificationMethod({
        id: Req.payload(state.pendingNotificationMethod?.sendCodeRequest) ?? ``,
        code: Number(state.pendingNotificationMethod?.confirmationCode),
      });
    },
    onSuccess: () => dispatch(PendingMethod.confirmStarted),
    onError: () => dispatch(PendingMethod.confirmFailed),
    invalidating: [Key.admin],
  });

  const notificationProps = makeNotificationProps(state, saveNotification.isLoading);

  if (query.isLoading) {
    return <Loading />;
  }

  if (query.isError) {
    return <ApiErrorMessage error={query.error} />;
  }

  // return <pre>{JSON.stringify(query.data, null, 2)}</pre>;

  return (
    <Profile
      email={query.data.email}
      status={query.data.subscriptionStatus}
      billingPortalRequest={ReqState.fromMutation(createBillingPortalSession)}
      methods={typesafe.objectValues(state.notificationMethods).map((method) => ({
        id: method.value.id,
        method: methodSimpleType(method),
        value: methodPrimaryValue(method),
        deletable: methodDeletable(method, state.notifications, query.data.email),
      }))}
      notifications={typesafe
        .objectValues(state.notifications)
        .map(notificationProps)
        .filter(notNullish)}
      deleteNotification={deleteNotification}
      deleteMethod={deleteMethod}
      pendingMethod={state.pendingNotificationMethod}
      updateNotification={(update) => dispatch({ type: `updateNotification`, update })}
      saveNotification={(id) => saveNotification.mutate(id)}
      createNotification={() => dispatch({ type: `notificationCreated` })}
      manageSubscription={() => createBillingPortalSession.mutate()}
      newMethodEventHandler={(event) => {
        switch (event.type) {
          case `sendCodeClicked`:
            return createPendingNotificationMethod.mutate(undefined);
          case `verifyCodeClicked`:
            return confirmPendingNotificationMethod.mutate(undefined);
          default:
            return dispatch({ type: `newNotificationMethodEvent`, event });
        }
      }}
    />
  );
};

export default AdminProfile;

// helpers

function methodSimpleType(
  method: GetAdmin.VerifiedNotificationMethod,
): 'email' | 'slack' | 'text' {
  switch (method.type) {
    case `VerifiedEmailMethod`:
      return `email`;
    case `VerifiedSlackMethod`:
      return `slack`;
    case `VerifiedTextMethod`:
      return `text`;
  }
}

function methodPrimaryValue(method: GetAdmin.VerifiedNotificationMethod): string {
  switch (method.type) {
    case `VerifiedEmailMethod`:
      return method.value.email.toLowerCase();
    case `VerifiedSlackMethod`:
      return `#` + method.value.channelName.replace(/^#/, ``);
    case `VerifiedTextMethod`: {
      const number = method.value.phoneNumber;
      if (number.match(/^\d{10}$/)) {
        return `(${number.slice(0, 3)}) ${number.slice(3, 6)}-${number.slice(6, 10)}`;
      }
      return number;
    }
  }
}

function methodDeletable(
  method: GetAdmin.VerifiedNotificationMethod,
  notifications: State['notifications'],
  adminEmail: string,
): boolean {
  const methodBeingUsed = typesafe
    .objectValues(notifications)
    .some((notification) => notification.original.methodId === method.value.id);

  if (methodBeingUsed) {
    return false;
  }

  return method.type !== `VerifiedEmailMethod` || method.value.email !== adminEmail;
}

function makeNotificationProps(
  state: State,
  savingNotification: boolean,
): (
  editable: State['notifications'][number],
) => React.ComponentProps<typeof Profile>['notifications'][0] | null {
  return (editable) => {
    const { id, ...notification } = editable.draft;
    const methods = state.notificationMethods;
    const method = methods[notification.methodId];
    if (!method) return null; // should never happen...
    return {
      id,
      trigger: notification.trigger,
      selectedMethod: method,
      saveButtonDisabled: editable.isNew
        ? false
        : !isDirty(editable) || savingNotification,
      methodOptions: typesafe.objectValues(methods).map((method) => ({
        display: `${capitalize(methodSimpleType(method))} ${methodPrimaryValue(method)}`,
        value: method.value.id,
      })),
      editing: editable.editing === true,
    };
  };
}

function toInput(
  pending: PendingNotificationMethod,
): CreatePendingNotificationMethod.Input {
  switch (pending.type) {
    case `Email`:
      return { type: `Email`, value: pending.value };
    case `Text`:
      return { type: `Text`, value: pending.value };
    case `Slack`:
      return { type: `Slack`, value: pending.value };
  }
}

const PendingMethod = {
  createStarted: {
    type: `newNotificationMethodEvent`,
    event: { type: `createPendingMethodStarted` },
  },
  createFailed: {
    type: `newNotificationMethodEvent`,
    event: { type: `createPendingMethodFailed` },
  },
  createSucceeded(methodId: UUID) {
    return {
      type: `newNotificationMethodEvent`,
      event: { type: `createPendingMethodSucceeded`, methodId },
    } as const;
  },
  confirmStarted: {
    type: `newNotificationMethodEvent`,
    event: { type: `confirmPendingMethodSucceeded` },
  },
  confirmFailed: {
    type: `newNotificationMethodEvent`,
    event: { type: `confirmPendingMethodFailed` },
  },
} as const;
