import React from 'react';
import cx from 'classnames';
import { Logo } from '@shared/components';
import Link from 'next/link';

const MainHeader: React.FC = () => (
  <header
    className={cx(
      `flex justify-between items-center px-8 transition-[background-color,padding,margin,border-radius,box-shadow] duration-500 top-0 left-0 right-0 z-50 py-6 relative`,
    )}
  >
    <Logo className={cx(`transition-opacity duration-500`)} type="inverted" />
    <div className={cx(`flex gap-4 transition-opacity duration-500`)}>
      <Link
        className="rounded-2xl px-6 py-2 text-lg font-semibold hover:bg-white/10 transition-[background-color,transform] duration-300 active:bg-white/20 active:scale-95 text-white"
        href="https://parents.gertrude.app/login"
      >
        Log in
      </Link>
      <Link
        className="bg-white rounded-2xl px-6 py-2 text-lg font-semibold text-white transition-transform hover:scale-105 active:scale-95"
        href="https://parents.gertrude.app/signup"
      >
        <span className="w-fit bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
          Sign up
        </span>
      </Link>
    </div>
  </header>
);

export default MainHeader;
