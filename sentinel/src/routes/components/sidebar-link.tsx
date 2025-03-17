import { CircleHelpIcon } from 'lucide-solid';
import { Component } from 'solid-js';
import { createFileRoute } from '@tanstack/solid-router';
import ComponentDemo from '../../site-components/ComponentDemo';
import PageHeading from '../../ui/components/PageHeading';
import SidebarLink from '../../ui/components/SidebarLink';

export const Route = createFileRoute('/components/sidebar-link')({
  component: () => <SidebarLinkPage />,
});

const SidebarLinkPage: Component = () => {
  return (
    <div>
      <PageHeading subheading="The component for which the sidebar exists. Can be either an internal or external link.">
        Sidebar Link
      </PageHeading>
      <ComponentDemo
        stories={[
          {
            title: 'With icon',
            component: (
              <SidebarLink href="#" icon={CircleHelpIcon}>
                About us
              </SidebarLink>
            ),
          },
          {
            title: 'Without icon',
            component: <SidebarLink href="#">About us</SidebarLink>,
          },
        ]}
        class="mt-8"
      />
    </div>
  );
};

export default SidebarLinkPage;
