import React from 'react';
import { SubcomponentsOmit } from '@dash/types';
import { Button } from '@shared/components';
import EmptyState from '../EmptyState';
import PageHeading from '../PageHeading';
import ConnectModal from './ConnectDeviceModal';
import UserCard from './UserCard';

type Props = {
  users: SubcomponentsOmit<typeof UserCard, 'addDevice'>;
  addDeviceRequest?: RequestState<number>;
  startAddDevice(userId: UUID): unknown;
  dismissAddDevice(): unknown;
};

const Users: React.FC<Props> = ({
  users,
  addDeviceRequest,
  startAddDevice,
  dismissAddDevice,
}) => {
  return (
    <div className="flex flex-col">
      <ConnectModal request={addDeviceRequest} dismissAddDevice={dismissAddDevice} />
      <PageHeading icon="users">Users</PageHeading>
      <div className="mt-8 flex flex-col">
        {users.length > 0 ? (
          <>
            <div className="mb-16 grid grid-cols-1 lg+:grid-cols-2 gap-10 lg+:gap-8 xl:gap-10 2xl:grid-cols-3">
              {users.map((user) => (
                <UserCard
                  key={user.id}
                  addDevice={() => startAddDevice(user.id)}
                  {...user}
                />
              ))}
            </div>
            <Button
              type="link"
              to="/users/new"
              color="primary-violet"
              className="self-center mb-16"
            >
              <i className="fa fa-plus mr-4" />
              Add a user
            </Button>
          </>
        ) : (
          <div>
            <EmptyState
              heading={`No users`}
              secondaryText={`Get started by creating a protected user`}
              icon={`user`}
              buttonText={`Add a user`}
              action={`/users/new`}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;