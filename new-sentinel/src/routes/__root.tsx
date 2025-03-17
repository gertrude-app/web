import { createRootRoute, Outlet } from '@tanstack/solid-router';
import { Component } from 'solid-js';
import {
  CircleHelpIcon,
  ExternalLinkIcon,
  HomeIcon,
  LayoutGridIcon,
  LayoutPanelLeft,
  SidebarIcon,
} from 'lucide-solid';
import SidebarLayout from '~/ui/layouts/SidebarLayout';
import SidebarSection from '../ui/components/SidebarSection';
import SidebarLink from '../ui/components/SidebarLink';
import SidebarDropdown from '../ui/components/SidebarDropdown';
import '../index.css';

export const Route = createRootRoute({
  component: () => <RootRoute />,
});

const RootRoute: Component = () => {
  return (
    <SidebarLayout content={<Outlet />}>
      <SidebarSection>
        <SidebarLink href="/" icon={HomeIcon}>
          Home
        </SidebarLink>
        <SidebarLink href="/about" icon={CircleHelpIcon}>
          About
        </SidebarLink>
        <SidebarLink href="https://gertrude.app" icon={ExternalLinkIcon}>
          Gertrude
        </SidebarLink>
      </SidebarSection>
      <SidebarSection heading="UI Components">
        <SidebarDropdown text="Components" icon={LayoutGridIcon}>
          <SidebarLink href="/components/card">Card</SidebarLink>
          <SidebarDropdown text="Sidebar">
            <SidebarLink href="/components/sidebar-dropdown">SidebarDropdown</SidebarLink>
            <SidebarLink href="/components/sidebar-link">SidebarLink</SidebarLink>
            <SidebarLink href="/components/sidebar-section">SidebarSection</SidebarLink>
          </SidebarDropdown>
          <SidebarLink href="/components/select">Select</SidebarLink>
          <SidebarLink href="/components/tinted-bg">TintedBg</SidebarLink>
        </SidebarDropdown>
        <SidebarDropdown text="Layouts" icon={LayoutPanelLeft}>
          <SidebarLink href="/layouts/sidebar-layout" icon={SidebarIcon}>
            SidebarLayout
          </SidebarLink>
        </SidebarDropdown>
      </SidebarSection>
    </SidebarLayout>
  );
};
