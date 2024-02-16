'use client';

import React from 'react';
import cx from 'classnames';
import Link from 'next/link';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Logo } from '@shared/components';
import { MenuIcon } from 'lucide-react';
import FancyLink from './FancyLink';

const MainHeader: React.FC = () => (
  <header
    className={cx(
      `flex justify-between items-center px-8 transition-[background-color,padding,margin,border-radius,box-shadow] duration-500 top-0 left-0 right-0 z-50 py-6 relative`,
    )}
  >
    <Link href="/">
      <Logo className={cx(`transition-opacity duration-500`)} type="inverted" />
    </Link>
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="sm:hidden block hover:scale-105 active:scale-95 transition-transform duration-200">
        <button className="bg-white w-10 h-10 rounded-full flex justify-center items-center text-slate-400">
          <MenuIcon />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="bg-white rounded-xl p-1 mt-2 mr-8">
          <DropdownLink href="https://parents.gertrude.app/signup">Sign up</DropdownLink>
          <DropdownLink href="https://parents.gertrude.app">Log in</DropdownLink>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
    <div className={cx(`gap-4 transition-opacity duration-500 hidden sm:flex`)}>
      <FancyLink href="https://parents.gertrude.app" size="sm" color="secondary" inverted>
        Log in
      </FancyLink>
      <FancyLink
        href="https://parents.gertrude.app/signup"
        size="sm"
        color="primary"
        inverted
      >
        Sign up
      </FancyLink>
    </div>
  </header>
);

export default MainHeader;

const DropdownLink: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
}) => (
  <DropdownMenu.Item>
    <Link
      href={href}
      className="block px-4 py-2 hover:bg-violet-100 hover:text-violet-600 rounded-lg font-medium text-slate-600 transition-[background-color,color,transform] duration-200 active:scale-95 active:bg-violet-200 active:text-violet-700"
    >
      {children}
    </Link>
  </DropdownMenu.Item>
);
