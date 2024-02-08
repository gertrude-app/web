'use client';

import React from 'react';
import cx from 'classnames';
import { MainFooter, MainHeader } from '@site/components';
import '../styles/globals.css';
import { roboto } from 'lib/fonts';

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
