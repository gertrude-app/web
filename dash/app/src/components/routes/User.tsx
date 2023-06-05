import { v4 as uuid } from 'uuid';
import { Navigate, useParams } from 'react-router-dom';
import { Loading, ApiErrorMessage } from '@dash/components';
import { useIsMutating, useQueries } from '@tanstack/react-query';
import React from 'react';
import { EditUser } from '@dash/components';
import type { UseQueryResult } from '@tanstack/react-query';
import type { Device, RequestState, User } from '@dash/types';
import type { UserUpdate } from '../../redux/slice-users';
import type { QueryProps } from '../../redux/store';
import { receivedEditingUser } from '../../redux/slice-users';
import { newUserRouteVisited } from '../../redux/slice-users';
import { useDispatch, useSelector } from '../../redux/hooks';
import {
  userUpdated,
  upsertUser,
  userEntityDeleteStarted,
  userEntityDeleteCanceled,
  deleteDevice,
  deleteUser,
  createPendingAppConnection,
  addDeviceDismissed,
  addKeychainClicked,
  keychainSelected,
  keychainAdded,
  addKeychainModalDismissed,
} from '../../redux/slice-users';
import { isDirty, Query, Req } from '../../redux/helpers';
import useSelectableKeychains, {
  _useSelectableKeychains,
} from '../../hooks/selectable-keychains';
import Current from '../../environment';
import { ensurePqlError } from '../../pairql/query';
import { useUpsert, useDelete, Key, useQuery } from '../../hooks/query';
import { familyToIcon } from './Users';

function requestState<T>(query: UseQueryResult<T>): RequestState<T> {
  if (query.isLoading) {
    return { state: `ongoing` };
  } else if (query.isError) {
    return { state: `failed`, error: ensurePqlError(query.error) };
  } else {
    return { state: `succeeded`, payload: query.data };
  }
}

const UserRoute: React.FC = () => {
  const dispatch = useDispatch();
  const { userId: id = `` } = useParams<{ userId: string }>();
  const editableUser = useSelector((state) => state.users.editing[id]);
  const addingKeychain = useSelector((state) => state.users.adding?.keychain);
  const deleteDeviceId = useSelector((state) => state.users.deleting.device);
  const deleteUserId = useSelector((state) => state.users.deleting.user);

  const getKeychains = _useSelectableKeychains();
  const getUser = useQuery(Key.user(id), () => Current.api.getUser(id), {
    dispatch: receivedEditingUser,
  });

  // usedeleteentity?
  const deleteUser = useDelete(Key.user(id), (id: UUID) =>
    Current.api.deleteEntity({ id, type: `User` }),
  );

  const saveUser = useUpsert(Key.user(id), (editableUser: Editable<User>) =>
    Current.api.saveUser({
      id: editableUser.draft.id,
      name: editableUser.draft.name,
      keyloggingEnabled: editableUser.draft.keyloggingEnabled,
      screenshotsEnabled: editableUser.draft.screenshotsEnabled,
      screenshotsFrequency: editableUser.draft.screenshotsFrequency,
      screenshotsResolution: editableUser.draft.screenshotsResolution,
      isNew: editableUser.isNew ?? false,
      keychainIds: editableUser.draft.keychains.map(({ id }) => id),
    }),
  );

  if (getUser.isError) {
    return <ApiErrorMessage />;
  }

  if (getUser.isLoading || !editableUser) {
    return <Loading />;
  }

  const user = editableUser.draft;

  function set(arg: Partial<UserUpdate>): void {
    dispatch(userUpdated({ id, ...arg } as UserUpdate));
  }

  return (
    <EditUser
      isNew={editableUser.isNew || false}
      name={user.name}
      id={user.id}
      setName={(value) => set({ type: `name`, value })}
      keyloggingEnabled={user.keyloggingEnabled}
      setKeyloggingEnabled={(value) => set({ type: `keyloggingEnabled`, value })}
      screenshotsEnabled={user.screenshotsEnabled}
      setScreenshotsEnabled={(value) => set({ type: `screenshotsEnabled`, value })}
      screenshotsResolution={user.screenshotsResolution}
      setScreenshotsResolution={(value) => set({ type: `screenshotsResolution`, value })}
      screenshotsFrequency={user.screenshotsFrequency}
      setScreenshotsFrequency={(value) => set({ type: `screenshotsFrequency`, value })}
      removeKeychain={(keychainId) =>
        dispatch(userUpdated({ id, type: `removeKeychain`, value: keychainId }))
      }
      keychains={user.keychains}
      devices={user.devices.map(deviceProps)}
      deleteUser={{
        id: deleteUserId,
        start: () => dispatch(userEntityDeleteStarted({ type: `user`, id })),
        confirm: () => deleteUser.mutate(id),
        cancel: () => dispatch(userEntityDeleteCanceled(`user`)),
      }}
      startAddDevice={() => {}}
      dismissAddDevice={() => {}}
      deleteDevice={{
        id: deleteDeviceId,
        start: (id) => dispatch(userEntityDeleteStarted({ type: `device`, id })),
        confirm: () => {},
        cancel: () => dispatch(userEntityDeleteCanceled(`device`)),
      }}
      saveButtonDisabled={
        !isDirty(editableUser) || user.name.trim() === `` || saveUser.isLoading
      }
      onSave={() => saveUser.mutate(editableUser)}
      onAddKeychainClicked={() => dispatch(addKeychainClicked())}
      onSelectKeychainToAdd={(keychain) => dispatch(keychainSelected(keychain))}
      onConfirmAddKeychain={() => dispatch(keychainAdded(id))}
      onDismissAddKeychain={() => dispatch(addKeychainModalDismissed())}
      selectingKeychain={addingKeychain}
      fetchSelectableKeychainsRequest={
        addingKeychain === undefined ? undefined : requestState(getKeychains)
      }
    />
  );

  // const newUserId = useMemo(() => uuid(), []);
  // const [query, shouldFetch] = useSelector(queryProps(dispatch, id));

  // useEffect(() => {
  //   shouldFetch && dispatch(fetchUser(id));
  //   id === `new` && dispatch(newUserRouteVisited(newUserId));
  // }, [dispatch, id, shouldFetch, newUserId]);

  // if (id === `new`) {
  //   return <Navigate to={`/users/${newUserId}`} replace />;
  // }

  // if (query.state === `entityDeleted`) {
  //   return <Navigate to={query.redirectUrl} />;
  // }

  // if (query.state === `shouldFetch` || query.state === `ongoing`) {
  //   return <Loading />;
  // }

  // if (query.state === `failed`) {
  //   return <ApiErrorMessage error={query.error} />;
  // }

  // return <EditUser {...query.props} />;
  // return null;
};

export default UserRoute;

export const queryProps: QueryProps<typeof EditUser, UUID> =
  (dispatch, id) => (appState) => {
    const state = appState.users;
    const fetch = state.fetchUserRequest[id];
    const editable = state.entities[id];
    const selectableKeychains = useSelectableKeychains(
      state.adding.keychain !== undefined,
    );

    if (state.deleted.includes(id)) {
      return [Query.redirectDeleted(`/users`), false];
    }

    if (id === `new`) {
      return [{ state: `ongoing` }, false];
    }

    if (!editable && fetch?.state !== `succeeded`) {
      return [Req.toUnresolvedQuery(fetch), fetch?.state !== `failed`];
    }

    if (!editable) {
      return [Query.unexpectedError(`c989c73a`, `missing user`), false];
    }

    const user = editable.draft;
    const update = state.updateUserRequest[id];
    const deleteDeviceId = state.deleting.device;
    const deleteUserId = state.deleting.user;

    function set(arg: Partial<UserUpdate>): void {
      dispatch(userUpdated({ id, ...arg } as UserUpdate));
    }

    return [
      Query.resolve({
        isNew: editable.isNew === true,
        name: user.name,
        id: user.id,
        setName: (value) => set({ type: `name`, value }),
        keyloggingEnabled: user.keyloggingEnabled,
        setKeyloggingEnabled: (value) => set({ type: `keyloggingEnabled`, value }),
        screenshotsEnabled: user.screenshotsEnabled,
        setScreenshotsEnabled: (value) => set({ type: `screenshotsEnabled`, value }),
        screenshotsResolution: user.screenshotsResolution,
        setScreenshotsResolution: (value) =>
          set({ type: `screenshotsResolution`, value }),
        screenshotsFrequency: user.screenshotsFrequency,
        setScreenshotsFrequency: (value) => set({ type: `screenshotsFrequency`, value }),
        removeKeychain: (keychainId) =>
          dispatch(userUpdated({ id, type: `removeKeychain`, value: keychainId })),
        keychains: user.keychains,
        devices: user.devices.map(deviceProps),
        saveButtonDisabled:
          !isDirty(editable) ||
          update?.state === `ongoing` ||
          editable.draft.name.trim() === ``,
        onSave: () => dispatch(upsertUser(id)),
        deleteUser: {
          id: deleteUserId,
          start: () => dispatch(userEntityDeleteStarted({ type: `user`, id })),
          confirm: () => dispatch(deleteUser(deleteUserId ?? ``)),
          cancel: () => dispatch(userEntityDeleteCanceled(`user`)),
        },
        deleteDevice: {
          id: deleteDeviceId,
          start: (id) => dispatch(userEntityDeleteStarted({ type: `device`, id })),
          confirm: () => dispatch(deleteDevice(deleteDeviceId ?? ``)),
          cancel: () => dispatch(userEntityDeleteCanceled(`device`)),
        },
        startAddDevice: () => dispatch(createPendingAppConnection({ userId: id })),
        dismissAddDevice: () => dispatch(addDeviceDismissed()),
        addDeviceRequest: state.addDeviceRequest,
        onAddKeychainClicked: () => dispatch(addKeychainClicked()),
        onSelectKeychainToAdd: (keychain) => dispatch(keychainSelected(keychain)),
        onConfirmAddKeychain: () => dispatch(keychainAdded(id)),
        onDismissAddKeychain: () => dispatch(addKeychainModalDismissed()),
        selectingKeychain: state.adding?.keychain,
        fetchSelectableKeychainsRequest:
          state.adding?.keychain === undefined ? undefined : selectableKeychains,
      }),
      false,
    ];
  };

// helpers

function deviceProps(
  apiDevice: Device,
): React.ComponentProps<typeof EditUser>['devices'][0] {
  return {
    id: apiDevice.id,
    model: apiDevice.modelTitle,
    status: apiDevice.isOnline ? `online` : `offline`,
    icon: familyToIcon(apiDevice.modelFamily),
  };
}
