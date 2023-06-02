import { Loading, ListUsers, ApiErrorMessage } from '@dash/components';
import { typesafe } from '@shared/ts-utils';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import type { DeviceModelFamily } from '@dash/types';
import { useDispatch } from '../../redux/hooks';
import { addDeviceDismissed, createPendingAppConnection } from '../../redux/slice-users';
import Current from '../../environment';

const Users: React.FC = () => {
  const dispatch = useDispatch();

  const query = useQuery([`users`], async () => {
    const result = await Current.api.getUsers();
    return result.valueOrThrow();
  });

  if (query.isLoading) {
    return <Loading />;
  }

  if (query.isError) {
    return <ApiErrorMessage />;
  }

  return (
    <ListUsers
      users={query.data.map((user) => ({
        id: user.id,
        name: user.name,
        numKeychains: user.keychains.length,
        numKeys: user.keychains.reduce((acc, keychain) => acc + keychain.numKeys, 0),
        devices: user.devices.map((device) => ({
          id: device.id,
          model: device.modelTitle,
          status: device.isOnline ? `online` : `offline`,
          icon: familyToIcon(device.modelFamily),
        })),
        screenshotsEnabled: user.screenshotsEnabled,
        keystrokesEnabled: user.keyloggingEnabled,
      }))}
      startAddDevice={(userId) => dispatch(createPendingAppConnection({ userId }))}
      dismissAddDevice={() => dispatch(addDeviceDismissed())}
      // addDeviceRequest={addDeviceRequest} TODO!
      addDeviceRequest={undefined}
    />
  );

  // const { users, listRequest, addDeviceRequest } = useSelector((state) => ({
  //   listRequest: state.users.listRequest,
  //   addDeviceRequest: state.users.addDeviceRequest,
  //   users: typesafe
  //     .objectValues(state.users.entities)
  //     .filter((editable) => !editable.isNew)
  //     .map((editable) => editable.original),
  // }));

  // useEffect(() => {
  //   listRequest.state === `idle` && dispatch(fetchUsers());
  // }, [dispatch, listRequest, listRequest.state]);

  // if (listRequest.state === `failed`) {
  //   return <ApiErrorMessage error={listRequest.error} />;
  // }

  // if (listRequest.state === `idle` || listRequest.state === `ongoing`) {
  //   return <Loading />;
  // }

  // return (
  //   <ListUsers
  //     users={users.map((resource) => ({
  //       id: resource.id,
  //       name: resource.name,
  //       numKeychains: resource.keychains.length,
  //       numKeys: resource.keychains.reduce((acc, keychain) => acc + keychain.numKeys, 0),
  //       devices: resource.devices.map((device) => ({
  //         id: device.id,
  //         model: device.modelTitle,
  //         status: device.isOnline ? `online` : `offline`,
  //         icon: familyToIcon(device.modelFamily),
  //       })),
  //       screenshotsEnabled: resource.screenshotsEnabled,
  //       keystrokesEnabled: resource.keyloggingEnabled,
  //     }))}
  //     startAddDevice={(userId) => dispatch(createPendingAppConnection({ userId }))}
  //     dismissAddDevice={() => dispatch(addDeviceDismissed())}
  //     addDeviceRequest={addDeviceRequest}
  //   />
  // );
  return null;
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
    case `unknown`:
      return `laptop`;
  }
}
