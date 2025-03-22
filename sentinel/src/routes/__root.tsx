import { Outlet, createRootRoute } from '@tanstack/solid-router';
import { clientOnly } from '@solidjs/start';
import { Suspense } from 'solid-js';
import type { Component } from 'solid-js';
import '../app.css';
import SidebarNavLayout from '~/layouts/SidebarNavLayout';
import SidebarSection from '~/components/SidebarSection';
import SidebarLink from '~/components/SidebarLink';
import SidebarDropdown from '~/components/SidebarDropdown';
import SidebarSpacer from '~/components/SidebarSpacer';
import Logo from '/sentinel-logo.svg';

// const Devtools = clientOnly(() => import(`../lib/Devtools`));
const LoadIcons = clientOnly(() => import(`../lib/load-icons`));

export const Route = createRootRoute({
  component: () => <Root />,
});

const Root: Component = () => (
  <Suspense>
    <SidebarNavLayout logo={Logo} content={<Outlet />}>
      <SidebarSection>
        <SidebarLink href="/" icon="home">
          Overview
        </SidebarLink>
        <SidebarLink href="/about" icon="circle-help">
          About
        </SidebarLink>
      </SidebarSection>
      <SidebarSection title="Components">
        <SidebarDropdown title="Sidebar" icon="panel-left">
          <SidebarLink href="/components/sidebar">Sidebar</SidebarLink>
          <SidebarLink href="/components/sidebar-dropdown">SidebarDropdown</SidebarLink>
          <SidebarLink href="/components/sidebar-link">SidebarLink</SidebarLink>
          <SidebarLink href="/components/sidebar-section">SidebarSection</SidebarLink>
          <SidebarLink href="/components/sidebar-spacer">SidebarSpacer</SidebarLink>
        </SidebarDropdown>
        <SidebarLink href="/components/sidebar" icon="square">
          Sidebar
        </SidebarLink>
        <SidebarLink href="/components/sidebar-dropdown" icon="square">
          SidebarDropdown
        </SidebarLink>
        <SidebarLink href="/components/sidebar-link" icon="square">
          SidebarLink
        </SidebarLink>
        <SidebarLink href="/components/sidebar-section" icon="square">
          SidebarSection
        </SidebarLink>
        <SidebarLink href="/components/sidebar-spacer" icon="square">
          SidebarSpacer
        </SidebarLink>
      </SidebarSection>
      <SidebarSection title="Layouts">
        <SidebarLink href="/layouts/sidebar-nav-layout" icon="panel-left">
          SidebarNavLayout
        </SidebarLink>
      </SidebarSection>
      <SidebarSpacer />
      <SidebarSection>
        <SidebarLink href="https://gertrude.app" icon="external-link">
          Gertrude
        </SidebarLink>
        <SidebarLink href="https://replist.innocencelabs.com" icon="external-link">
          RepList
        </SidebarLink>
      </SidebarSection>
    </SidebarNavLayout>
    {/* <Devtools position="bottom-right" /> */}
    <LoadIcons />
  </Suspense>
);
