import React, { useEffect } from 'react';
import Loading from '@shared/Loading';
import UsersScreen from '@shared/dashboard/Users/UsersScreen';
import { useDispatch, useSelector } from '../../redux/hooks';
import { fetchUsers } from '../../redux/slice-users';
import ApiErrorMessage from '../ApiErrorMessage';

const Users: React.FC = () => {
  const dispatch = useDispatch();
  const request = useSelector((state) => state.users.listReq);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (request.state === `failed`) {
    return <ApiErrorMessage error={request.error} />;
  }

  if (request.state === `idle` || request.state === `ongoing`) {
    return (
      <div className="flex justify-center m-12">
        <Loading />
      </div>
    );
  }

  return (
    <UsersScreen
      users={Object.values(request.payload ?? {}).map((resource) => ({
        id: resource.id,
        name: resource.name,
        numKeychains: resource.keychains.length,
        numKeys: resource.keychains.reduce(
          (acc, keychain) => acc + keychain.keys.length,
          0,
        ),
        devices: resource.devices.map((device) => ({
          id: device.id,
          // TODO: https://github.com/gertrude-app/project/issues/52
          model: device.hostname ?? `Macbook Pro`,
          status: `online`,
          icon: device.hostname?.toLowerCase().includes(`mini`) ? `desktop` : `laptop`,
        })),
        screenshotsEnabled: resource.screenshotsEnabled,
        keystrokesEnabled: resource.keystrokesEnabled,
      }))}
    />
  );
};

export default Users;
