import { ApiErrorMessage, ListChildren, Loading } from '@dash/components';
import React from 'react';
import type { EditChild } from '@dash/components';
import type { DeviceModelFamily, UserDevice } from '@dash/types';
import Current from '../../environment';
import { Key, useMutation, useQuery } from '../../hooks';
import ReqState from '../../lib/ReqState';

const Users: React.FC = () => {
  const query = useQuery(Key.users, Current.api.getUsers);

  const addDevice = useMutation((userId: UUID) =>
    Current.api.createPendingAppConnection({ userId }),
  );

  if (query.isPending) {
    return <Loading />;
  }

  if (query.isError) {
    return <ApiErrorMessage error={query.error} />;
  }

  return (
    <ListChildren
      users={query.data.map((user) => ({
        id: user.id,
        name: user.name,
        numKeychains: user.keychains.length,
        numKeys: user.keychains.reduce((acc, keychain) => acc + keychain.numKeys, 0),
        devices: user.devices.map(deviceProps),
        screenshotsEnabled: user.screenshotsEnabled,
        keystrokesEnabled: user.keyloggingEnabled,
      }))}
      startAddDevice={(userId) => addDevice.mutate(userId)}
      dismissAddDevice={() => addDevice.reset()}
      addDeviceRequest={ReqState.fromMutation(addDevice)}
    />
  );
};

export default Users;

export function familyToIcon(family: DeviceModelFamily): `laptop` | `desktop` {
  switch (family) {
    case `iMac`:
    case `pro`:
    case `studio`:
    case `mini`:
      return `desktop`;
    case `macBookAir`:
    case `macBookPro`:
    case `macBook`:
    case `unknown`:
      return `laptop`;
  }
}

export function deviceProps(
  apiDevice: UserDevice,
): React.ComponentProps<typeof EditChild>[`devices`][number] {
  return {
    id: apiDevice.id,
    deviceId: apiDevice.deviceId,
    modelTitle: apiDevice.modelTitle,
    modelIdentifier: apiDevice.modelIdentifier,
    name: apiDevice.customName,
    status: apiDevice.status,
  };
}
