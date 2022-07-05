import DashboardPageHeading from '@shared/DashboardPageHeading';
import TextInput from '@shared/TextInput';
import React from 'react';
import DashboardChrome from '../DashboardChrome';

const Profile: React.FC = () => {
  return (
    <DashboardChrome>
      <div className="py-10 px-20">
        <DashboardPageHeading icon="user">Profile</DashboardPageHeading>
        <div className="flex mt-8">
          <div className="p-8 bg-gray-100 rounded-xl flex-grow mr-2 border">
            <h2 className="text-lg text-gray-900 mb-2">Email address:</h2>
            <TextInput
              type={'email'}
              label={''}
              value={'johndoe@example.com'}
              setValue={() => {}}
            />
          </div>
          <div className="px-8 py-4 bg-gray-100 rounded-xl ml-2 flex justify-between relative border">
            <div className="flex justify-end items-start flex-col mr-8">
              <h2 className="font-bold text-gray-700">Basic plan</h2>
              <h3>
                <span className="text-gray-600">$</span>
                <span className="text-gray-700 text-3xl font-bold">10</span>
                <span className="text-gray-600 text-lg">/month</span>
              </h3>
              <a className="mt-1 text-sm text-blue-700 hover:text-blue-800 cursor-pointer transition duration-100">
                Manage subscription
              </a>
            </div>
            <h3 className="px-6 py-0.5 bg-green-200 rounded-full text-green-800 absolute right-2 top-2">
              active
            </h3>
          </div>
        </div>
        <div className="mt-12">
          <h1 className="text-2xl font-bold">Notifications</h1>
          <div>
            <div className=""></div>
          </div>
        </div>
      </div>
    </DashboardChrome>
  );
};

export default Profile;