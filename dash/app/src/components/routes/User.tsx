import { v4 as uuid } from 'uuid';
import { Navigate, useParams } from 'react-router-dom';
import { Loading, ApiErrorMessage } from '@dash/components';
import React, { useEffect, useMemo, useState } from 'react';
import { EditUser } from '@dash/components';
import type { KeychainSummary, User } from '@dash/types';
import type { UserUpdate } from '../../redux/slice-users';
import { receivedEditingUser } from '../../redux/slice-users';
import { newUserRouteVisited } from '../../redux/slice-users';
import { useDispatch, useSelector } from '../../redux/hooks';
import { userUpdated } from '../../redux/slice-users';
import { isDirty } from '../../redux/helpers';
import { _useSelectableKeychains } from '../../hooks/selectable-keychains';
import Current from '../../environment';
import { useMutation, Key, useQuery } from '../../hooks/query';
import { useConfirmableDelete } from '../../hooks/delete-entity';
import ReqState from '../../lib/ReqState';
import { deviceProps } from './Users';

const UserRoute: React.FC = () => {
  const { userId: id = `` } = useParams<{ userId: string }>();
  const editableUser = useSelector((state) => state.users.editing[id]);
  const dispatch = useDispatch();
  const queryKey = Key.user(id);
  const getKeychains = _useSelectableKeychains();
  const deleteUser = useConfirmableDelete(`User`, { id });
  const deleteDevice = useConfirmableDelete(`Device`, { invalidating: [queryKey] });

  // todo: this seems a little wonky
  const [addKeychain, setAddKeychain] = useState<KeychainSummary | undefined | null>();

  const getUser = useQuery(queryKey, () => Current.api.getUser(id), {
    payloadAction: receivedEditingUser,
    enabled: id !== `new` && editableUser?.isNew !== true,
  });

  const addDevice = useMutation(`create:pending-app-connection`, (userId: UUID) =>
    Current.api.createPendingAppConnection({ userId }),
  );

  const saveUser = useMutation(`upsert:user`, (editableUser: Editable<User>) =>
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

  const newUserId = useMemo(() => uuid(), []);
  useEffect(() => {
    id === `new` && dispatch(newUserRouteVisited(newUserId));
  }, [id, newUserId, dispatch]);

  if (id === `new`) {
    return <Navigate to={`/users/${newUserId}`} replace />;
  }

  if (deleteUser.state === `success`) {
    return <Navigate to="/users" />;
  }

  if (getUser.isError) {
    return <ApiErrorMessage error={getUser.error} />;
  }

  if (!editableUser) {
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
      devices={editableUser.original.devices.map(deviceProps)}
      deleteUser={deleteUser}
      startAddDevice={() => addDevice.mutate(id)}
      dismissAddDevice={() => addDevice.reset()}
      addDeviceRequest={ReqState.fromMutation(addDevice)}
      deleteDevice={deleteDevice}
      saveButtonDisabled={
        !isDirty(editableUser) || user.name.trim() === `` || saveUser.isLoading
      }
      onSave={() => saveUser.mutate(editableUser)}
      onAddKeychainClicked={() => setAddKeychain(null)}
      onSelectKeychainToAdd={(keychain) =>
        setAddKeychain(addKeychain?.id === keychain.id ? null : keychain)
      }
      onConfirmAddKeychain={() => {
        addKeychain && set({ type: `addKeychain`, value: addKeychain });
        setAddKeychain(undefined);
      }}
      onDismissAddKeychain={() => setAddKeychain(undefined)}
      selectingKeychain={addKeychain}
      fetchSelectableKeychainsRequest={
        addKeychain === undefined ? undefined : ReqState.fromQuery(getKeychains)
      }
    />
  );
};

export default UserRoute;

// helpers
