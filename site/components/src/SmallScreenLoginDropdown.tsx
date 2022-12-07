import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import cx from 'classnames';

interface Props {
  className?: string;
}

export const SmallScreenLoginDropdown: React.FC<Props> = ({ className }) => {
  return (
    <Menu as="div" className={cx(`relative text-left`, className)}>
      <div>
        <Menu.Button className="w-11 h-11 rounded-xl bg-white shadow-xl text-gray-400 hover:text-gray-500 transition duration-100 hover:bg-violet-50">
          <i className="fa-solid fa-bars text-xl" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              <a
                href="https://dash.gertrude.app/signup"
                className="hover:bg-violet-50 hover:text-gray-900 text-gray-700 block px-4 py-2 text-base transition duration-100"
              >
                Sign up
              </a>
            </Menu.Item>
            <Menu.Item>
              <a
                href="https://dash.gertrude.app"
                className="hover:bg-violet-50 hover:text-gray-900 text-gray-700 block px-4 py-2 text-base transition duration-100"
              >
                Log in
              </a>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};