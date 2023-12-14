import React from 'react';
import cx from 'classnames';
import { Logo } from '@shared/components';
import Link from 'next/link';
import { useScrollY } from '../../app/lib/hooks';

const MainHeader: React.FC = () => {
  const scrollY = useScrollY();
  const [windowHeight, setWindowHeight] = React.useState(1000);

  React.useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  const atTop = scrollY < windowHeight - 600;

  return (
    <header
      className={cx(
        `flex justify-between items-center px-8 transition-[background-color,padding,margin,border-radius,box-shadow] duration-500 fixed top-0 left-0 right-0 z-50`,
        atTop ? `py-6` : `bg-white/90 backdrop-blur-xl rounded-b-3xl py-5`,
      )}
    >
      <Logo />
      <Logo
        className={cx(`absolute transition-opacity duration-500`, !atTop && `opacity-0`)}
        type="inverted"
      />
      <div
        className={cx(
          `flex gap-4 absolute right-8 transition-opacity duration-500`,
          !atTop && `opacity-0 pointer-events-none`,
        )}
      >
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
      <div
        className={cx(
          `flex gap-4 transition-opacity duration-300`,
          atTop && `opacity-0 pointer-events-none`,
        )}
      >
        <Link
          className="rounded-2xl px-6 py-2 text-lg font-semibold hover:bg-violet-50 transition-[background-color,transform] duration-300 active:bg-violet-100 active:scale-95"
          href="https://parents.gertrude.app/login"
        >
          <span className="w-fit bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
            Log in
          </span>
        </Link>
        <Link
          className="bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl px-6 py-2 text-lg font-semibold text-white transition-transform hover:scale-105 active:scale-95"
          href="https://parents.gertrude.app/signup"
        >
          Sign up
        </Link>
      </div>
    </header>
  );
};

export default MainHeader;
