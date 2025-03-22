import { Outlet, createRootRoute } from '@tanstack/solid-router';
import { clientOnly } from '@solidjs/start';
import { Suspense } from 'solid-js';
import { SidebarNavLayout } from '@gertrude/sentinel';
import type { Component } from 'solid-js';

const Devtools = clientOnly(() => import(`../components/Devtools`));

export const Route = createRootRoute({
  component: () => <RootLayout />,
});

const RootLayout: Component = () => (
  <Suspense>
    <SidebarNavLayout></SidebarNavLayout>
    <Outlet />
    <Devtools />
  </Suspense>
);
