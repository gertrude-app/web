import React, { useState } from 'react';
import cx from 'classnames';
import Button from '@shared/Button';
import TextInput from '@shared/TextInput';
import { Link } from 'react-router-dom';
import NewNotificationMethodSidebar from '@shared/NewNotificationMethodSidebar';
import Chrome from '../Chrome';
import PageHeading from '@shared/dashboard/PageHeading';
import PillBadge from '@shared/dashboard/PillBadge';
import NotificationCard from '@shared/dashboard/NotificationCard';

const Profile: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <Chrome>
      <div className="py-10 px-5 sm:px-10 lg:px-12 xl:px-16 relative">
        <div
          className={cx(
            `absolute left-0 top-0 w-full h-full z-20 bg-gray-100 bg-opacity-50`,
            sidebarOpen ? 'block' : 'hidden',
          )}
        />
        <NewNotificationMethodSidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <PageHeading icon="user">Profile</PageHeading>
        <div className="flex flex-col md:flex-row mt-8">
          <div className="p-8 bg-gray-100 rounded-xl flex-grow md:mr-2 border max-w-3xl">
            <h2 className="text-lg text-gray-900 mb-2">Email address:</h2>
            <TextInput
              type={`email`}
              label={``}
              value={`johndoe@example.com`}
              setValue={() => {}}
            />
          </div>
          <div className="px-8 py-4 bg-gray-100 rounded-xl md:ml-2 flex justify-between relative border mt-4 md:mt-0">
            <div className="flex justify-end items-start flex-col mr-8">
              <h2 className="font-bold text-gray-700">Basic plan</h2>
              <h3>
                <span className="text-gray-600">$</span>
                <span className="text-gray-700 text-3xl font-bold">10</span>
                <span className="text-gray-600 text-lg">/month</span>
              </h3>
              <Link
                className="mt-1 text-sm text-blue-700 hover:text-blue-800 cursor-pointer transition duration-100"
                to="/profile"
              >
                Manage subscription
              </Link>
            </div>
            <PillBadge type="ok" className="absolute right-2 top-2">
              active
            </PillBadge>
          </div>
        </div>
        <div className="mt-12">
          <div className="">
            <h2 className="text-2xl font-bold text-gray-800">Notifications</h2>
            <div className="flex flex-wrap items-start pt-4 sm:pt-2">
              <NotificationCard
                method="email"
                email="me@example.com"
                when="suspension requests"
                setSidebarOpen={setSidebarOpen}
              />
              <NotificationCard
                method="slack"
                botToken="abc123-def456-ghi789"
                channelId="8xjd82-jkd8j2-lkd8j2"
                channelName="#Gertrude"
                when="unlock requests"
                setSidebarOpen={setSidebarOpen}
              />
              <NotificationCard
                method="text"
                number="(123) 456-7890"
                when="suspension requests"
                setSidebarOpen={setSidebarOpen}
              />
            </div>
          </div>
        </div>
      </div>
    </Chrome>
  );
};

export default Profile;
