import { createFileRoute } from '@tanstack/solid-router';
import type { Component } from 'solid-js';
import SidebarNavLayout from '~/layouts/SidebarNavLayout';
import Logo from '/sentinel-logo.svg';
import SidebarSection from '~/components/SidebarSection';
import SidebarDropdown from '~/components/SidebarDropdown';
import SidebarLink from '~/components/SidebarLink';
import SidebarSpacer from '~/components/SidebarSpacer';

export const Route = createFileRoute(`/`)({
  component: () => <HomePage />,
});

const HomePage: Component = () => <div>home</div>;
