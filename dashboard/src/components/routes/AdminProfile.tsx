import React, { useEffect } from 'react';
import Loading from '@shared/Loading';
import Profile from '@dashboard/Profile';
import { AdminNotificationMethod } from '@dashboard/types/Admin';
import { useDispatch, useSelector } from '../../redux/hooks';
import {
  cancelEntityDelete,
  fetchProfileData,
  startEntityDelete,
  deleteNotification,
  deleteNotificationMethod,
  notificationChanged,
  upsertNotification,
  notificationCreated,
  newNotificationMethodEvent,
  createPendingNotificationMethod,
  confirmPendingNotificationMethod,
} from '../../redux/slice-admin';
import ApiErrorMessage from '../ApiErrorMessage';
import * as typesafe from '../../lib/typesafe';
import { isDirty, notNullish, Query } from '../../redux/helpers';
import { QueryProps, State } from '../../redux/store';
import { capitalize } from '../shared/lib/string';
import { isUnsaved } from '../shared/lib/id';

const AdminProfile: React.FC = () => {
  const dispatch = useDispatch();
  const adminId = useSelector((state) => state.auth.admin?.id ?? ``);
  const query = useSelector(queryProps(dispatch));

  const reqState = query.state;
  useEffect(() => {
    reqState === `idle` && dispatch(fetchProfileData(adminId));
  }, [dispatch, adminId, reqState]);

  if (query.state === `idle` || query.state === `ongoing`) {
    return <Loading />;
  }

  if (query.state === `failed`) {
    return <ApiErrorMessage error={query.error} />;
  }

  return <Profile {...query.props} />;
};

export default AdminProfile;

export const queryProps: QueryProps<typeof Profile> = (dispatch) => (state) => {
  const request = state.admin.profileRequest;
  if (request.state !== `succeeded`) {
    return request;
  }

  const admin = state.admin;
  const methods = admin.notificationMethods;
  const deleteNotificationId = admin.deleting.notification;
  const deleteMethodId = admin.deleting.notificationMethod;
  const notificationProps = makeGetNotificationProps(admin);

  return Query.succeed({
    email: request.payload.email,
    status: request.payload.subscriptionStatus,
    methods: typesafe.objectValues(methods).map((method) => ({
      id: method.id,
      method: method.data.type,
      value: methodPrimaryValue(method),
      deletable: methodDeletable(method, admin.notifications, request.payload.email),
    })),
    notifications: typesafe
      .objectValues(admin.notifications)
      .map(notificationProps)
      .filter(notNullish),
    deleteNotification: {
      id: deleteNotificationId,
      start: (id) => dispatch(startEntityDelete({ type: `notification`, id })),
      confirm: () =>
        deleteNotificationId && dispatch(deleteNotification(deleteNotificationId)),
      cancel: () => dispatch(cancelEntityDelete(`notification`)),
    },
    deleteMethod: {
      id: deleteMethodId,
      start: (id) => dispatch(startEntityDelete({ type: `notificationMethod`, id })),
      confirm: () => deleteMethodId && dispatch(deleteNotificationMethod(deleteMethodId)),
      cancel: () => dispatch(cancelEntityDelete(`notificationMethod`)),
    },
    pendingMethod: admin.pendingNotificationMethod,
    createNotification: () => dispatch(notificationCreated()),
    saveNotification: (id) => dispatch(upsertNotification(id)),
    updateNotification: (update) => dispatch(notificationChanged(update)),
    newMethodEventHandler: (event) => {
      switch (event.type) {
        case `send_code_clicked`:
          return dispatch(createPendingNotificationMethod());
        case `verify_code_clicked`:
          return dispatch(confirmPendingNotificationMethod());
        default:
          return dispatch(newNotificationMethodEvent(event));
      }
    },
  });
};

// helpers

function methodPrimaryValue(method: AdminNotificationMethod): string {
  switch (method.data.type) {
    case `email`:
      return method.data.email.toLowerCase();
    case `slack`:
      return `#` + method.data.channelName.replace(/^#/, ``);
    case `text`: {
      const number = method.data.phoneNumber;
      if (number.match(/^\d{10}$/)) {
        return `(${number.slice(0, 3)}) ${number.slice(3, 6)}-${number.slice(6, 10)}`;
      }
      return number;
    }
  }
}

function methodDeletable(
  method: AdminNotificationMethod,
  notifications: State['admin']['notifications'],
  adminEmail: EmailAddress,
): any {
  const methodBeingUsed = typesafe
    .objectValues(notifications)
    .some((notification) => notification.original.methodId === method.id);

  if (methodBeingUsed) {
    return false;
  }

  return method.data.type !== `email` || method.data.email !== adminEmail;
}

function makeGetNotificationProps(
  state: State['admin'],
): (
  editable: State['admin']['notifications'][string],
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
      saveButtonDisabled: isUnsaved(id)
        ? false
        : !isDirty(editable) || state.saveNotificationRequests[id]?.state === `ongoing`,
      methodOptions: typesafe.objectValues(methods).map((method) => ({
        display: `${capitalize(method.data.type)} ${methodPrimaryValue(method)}`,
        value: method.id,
      })),
      editing: editable.editing,
    };
  };
}