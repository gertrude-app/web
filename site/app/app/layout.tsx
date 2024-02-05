'use client';

import React from 'react';
import cx from 'classnames';
import { MainFooter, MainHeader } from '@site/components';
import { axiforma } from 'lib/fonts';
import '../styles/globals.css';

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <html>
    <body className={cx(`bg-violet-500 min-h-screen flex flex-col`, axiforma)}>
      <MainHeader />
      <div className="flex-grow">{children}</div>
      <MainFooter />
    </body>
  </html>
);

export default RootLayout;
