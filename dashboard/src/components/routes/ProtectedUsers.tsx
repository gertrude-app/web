import DashboardPageHeading from '@shared/DashboardPageHeading';
import ProtectedUserCard from '@shared/ProtectedUserCard';
import React from 'react';
import DashboardChrome from '../DashboardChrome';

const ProtectedUsers: React.FC = () => {
  return (
    <DashboardChrome>
      <div className="py-10 px-5 sm:px-10 lg:px-12 xl:px-16">
        <DashboardPageHeading icon="users">Protected users</DashboardPageHeading>
        <div className="py-10 flex flex-wrap items-start">
          <ProtectedUserCard
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
          <ProtectedUserCard
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
          <ProtectedUserCard
            title="Rachel"
            keys={0}
            keychains={0}
            devices={[]}
            screenshots={false}
            keystrokes={false}
          />
          <ProtectedUserCard
            title="Willow"
            keys={2}
            keychains={1}
            devices={[{ title: `Mac Pro`, status: `online` }]}
            screenshots={true}
            keystrokes={true}
          />
        </div>
      </div>
    </DashboardChrome>
  );
};

export default ProtectedUsers;
