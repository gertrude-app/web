'use client';

import React, { useState } from 'react';
import cx from 'classnames';
import { MenuIcon } from 'lucide-react';
import Sidebar from '@/components/articles/Sidebar';

const DocsLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <html>
      <body className="bg-white flex relative overflow-x-clip">
        <div className="absolute h-[100vw] w-screen -right-[50vh] -top-[50vw] [background:radial-gradient(#fae8ff,transparent_75%)]"></div>
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <main className="flex-grow lg:ml-80">
          <header className="p-6 xs:p-8 flex justify-between lg:hidden fixed top-0 z-20">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="bg-slate-200/80 backdrop-blur w-12 h-12 rounded-full flex justify-center items-center text-slate-500 relative"
            >
              <MenuIcon />
            </button>
          </header>
          <div className="mt-16 lg:mt-0">{children}</div>
        </main>
        <div
          className={cx(
            `fixed w-screen h-screen bg-slate-200/80 backdrop-blur top-0 left-0 transition-opacity duration-300 lg:hidden`,
            sidebarOpen ? `opacity-100` : `opacity-0 pointer-events-none`,
          )}
          onClick={() => setSidebarOpen(false)}
        />
      </body>
    </html>
  );
};

export default DocsLayout;
