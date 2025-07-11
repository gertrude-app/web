import {
  ArrowRightOnRectangleIcon,
  BookOpenIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Cog6ToothIcon,
  ComputerDesktopIcon,
  HomeIcon,
  KeyIcon,
  LifebuoyIcon,
  ShieldCheckIcon,
  UsersIcon,
} from '@heroicons/react/24/solid';
import { Logo } from '@shared/components';
import cx from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import SidebarOption from './SidebarOption';

interface Props {
  collapsed?: boolean;
  toggleCollapsed?: () => unknown;
  onInternalLinkClick(): unknown;
  urlPath: string;
}

const SidebarNav: React.FC<Props> = ({
  collapsed = false,
  toggleCollapsed,
  urlPath,
  onInternalLinkClick,
}) => (
  <div
    className="flex flex-col justify-between h-full SidebarNav"
    data-test="sidebar-nav"
  >
    <nav className={cx(`flex flex-col`, collapsed ? `py-4 px-2` : `px-4`)}>
      <a href="/">
        <Logo
          className={cx(
            `mb-4 sm:mb-6 scale-[0.8] sm:scale-100 Logo`,
            collapsed ? `mt-3 ml-[0.87em]` : `mt-8 -ml-2 sm:ml-4`,
          )}
          type="inverted"
          iconOnly={collapsed}
          withForParents
        />
      </a>
      <div
        className={cx(
          `pb-4 flex flex-col LinkList`,
          collapsed ? `collapsed` : `expanded`,
        )}
      >
        <SidebarOption
          Icon={HomeIcon}
          collapsed={collapsed}
          to="/"
          isSelected={urlPath === `/`}
          onClick={onInternalLinkClick}
        >
          Dashboard
        </SidebarOption>
        <SidebarOption
          Icon={UsersIcon}
          collapsed={collapsed}
          to="/children"
          isSelected={urlPath.startsWith(`/children`)}
          onClick={onInternalLinkClick}
        >
          Children
        </SidebarOption>
        <SidebarOption
          Icon={ComputerDesktopIcon}
          collapsed={collapsed}
          to="/computers"
          isSelected={urlPath.startsWith(`/computers`)}
          onClick={onInternalLinkClick}
        >
          Computers
        </SidebarOption>
        <SidebarOption
          Icon={KeyIcon}
          collapsed={collapsed}
          to="/keychains"
          onClick={onInternalLinkClick}
          isSelected={urlPath.startsWith(`/keychains`)}
        >
          Keychains
        </SidebarOption>
        <SidebarOption
          Icon={ShieldCheckIcon}
          collapsed={collapsed}
          to="/security-events"
          onClick={onInternalLinkClick}
          isSelected={urlPath.startsWith(`/security-events`)}
        >
          Security
        </SidebarOption>
        <SidebarOption
          Icon={Cog6ToothIcon}
          collapsed={collapsed}
          to="/settings"
          onClick={onInternalLinkClick}
          isSelected={urlPath.startsWith(`/settings`)}
        >
          Settings
        </SidebarOption>
      </div>
      <hr className="bg-indigo-200/10 border-0 h-0.5 mx-4" />
      <div
        className={cx(
          `grow pt-4 flex flex-col LinkList`,
          collapsed ? `collapsed` : `expanded`,
        )}
      >
        <SidebarOption
          Icon={BookOpenIcon}
          collapsed={collapsed}
          to="https://gertrude.app/docs"
          isSelected={false}
        >
          Docs
        </SidebarOption>
        <SidebarOption
          Icon={LifebuoyIcon}
          collapsed={collapsed}
          to="https://gertrude.app/contact"
          isSelected={false}
        >
          Support
        </SidebarOption>
      </div>
    </nav>
    <div
      className={cx(
        `flex h-14 md:h-auto border-t border-indigo-200/10 items-center p-1`,
        {
          'justify-center': collapsed,
          'justify-between': !collapsed && toggleCollapsed !== undefined,
          'justify-end': !collapsed && toggleCollapsed === undefined,
        },
      )}
    >
      <button
        type="button"
        className={cx(
          `h-14 hover:bg-violet-500/30 hover:text-violet-400 text-violet-200/50 items-center justify-center hidden md:flex`,
          `cursor-pointer transition duration-100`,
          `focus:outline-none focus:ring-2 focus:ring-inset focus:ring-violet-500/50`,
          collapsed
            ? `rounded-t-lg rounded-b-xl w-full`
            : `w-14 rounded-bl-xl rounded-lg`,
        )}
        onClick={toggleCollapsed}
      >
        <span className="sr-only">
          {collapsed ? `Maximize sidebar` : `Minimize sidebar`}
        </span>
        {collapsed ? (
          <ChevronRightIcon className="h-8" />
        ) : (
          <ChevronLeftIcon className="h-8" />
        )}
      </button>
      <Link
        to={`/logout`}
        className={cx(
          collapsed ? `hidden` : `flex`,
          `justify-end items-center px-4 mr-px`,
          `text-violet-400 text-right hover:text-violet-300 whitespace-nowrap`,
          `transition-[color] duration-100 cursor-pointer`,
          `focus:outline-none focus:ring-2 focus:ring-inset focus:ring-violet-500/50 rounded-md`,
        )}
      >
        <span className="font-medium">Log out</span>
        <ArrowRightOnRectangleIcon className="ml-1.5 h-6" />
      </Link>
    </div>
  </div>
);

export default SidebarNav;
