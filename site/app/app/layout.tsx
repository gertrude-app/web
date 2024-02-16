import React from 'react';
import cx from 'classnames';
import '../styles/globals.css';
import { roboto } from 'lib/fonts';
import MainHeader from '../components/MainHeader';
import MainFooter from '../components/MainFooter';

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <html>
    <body className={cx(`bg-violet-500 min-h-screen flex flex-col`, roboto)}>
      <MainHeader />
      <div className="flex-grow">{children}</div>
      <MainFooter />
    </body>
  </html>
);

export default RootLayout;
