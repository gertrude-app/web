import React from 'react';
import cx from 'classnames';
import '../styles/globals.css';
import { axiforma } from 'lib/fonts';

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <html>
    <body className={cx(`bg-violet-500`, axiforma)}>
      <div>{children}</div>
    </body>
  </html>
);

export default RootLayout;
