import React from 'react';
import Button from '@shared/Button';
import PageHeading from '@shared/dashboard/PageHeading';
import UserCard from '@shared/dashboard/UserCard';

const Users: React.FC = () => {
  return (
    <div className="py-10 px-5 sm:px-10 lg:px-12 xl:px-16 flex flex-col">
      <PageHeading icon="users">Users</PageHeading>
      <div className="py-10 flex flex-wrap items-start">
        <UserCard
          title="Winfield"
          keys={213}
          keychains={3}
          devices={[
            { title: `14" MacBook Pro`, status: `online` },
            { title: `Mac Studio`, status: `offline` },
          ]}
          screenshots={true}
          keystrokes={true}
        />
        <UserCard
          title="Ezra"
          keys={10344}
          keychains={37}
          devices={[
            { title: `16" Macbook Pro`, status: `offline` },
            { title: `14" MacBook Air`, status: `offline` },
            { title: `iMac`, status: `online` },
          ]}
          screenshots={true}
          keystrokes={false}
        />
        <UserCard
          title="Rachel"
          keys={0}
          keychains={0}
          devices={[]}
          screenshots={false}
          keystrokes={false}
        />
        <UserCard
          title="Willow"
          keys={2}
          keychains={1}
          devices={[{ title: `Mac Pro`, status: `online` }]}
          screenshots={true}
          keystrokes={true}
        />
      </div>
      <Button
        type="button"
        onClick={() => {}}
        color="primary-violet"
        className="self-center"
      >
        <i className="fa fa-plus mr-4" />
        Add a user
      </Button>
    </div>
  );
};

export default Users;
