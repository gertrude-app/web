import { createRootRoute, Outlet } from '@tanstack/solid-router';
import { SidebarLayout, SidebarLink, SidebarSection } from '@gertrude/sentinel';
import { Component } from 'solid-js';
import { ChartColumnIcon, ExternalLinkIcon } from 'lucide-solid';

export const Route = createRootRoute({
  component: () => <RootLayout />,
});

const RootLayout: Component = () => {
  return (
    <SidebarLayout content={<Outlet />}>
      <SidebarSection>
        <SidebarLink href="/" icon={ChartColumnIcon}>
          Home
        </SidebarLink>
      </SidebarSection>
      <SidebarSection heading="Handy links">
        <SidebarLink href="/" icon={ExternalLinkIcon}>
          Gertrude
        </SidebarLink>
      </SidebarSection>
    </SidebarLayout>
  );
};
