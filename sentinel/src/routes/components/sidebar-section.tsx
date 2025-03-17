import { LayoutGridIcon, SquareIcon } from 'lucide-solid';
import { Component } from 'solid-js';
import { createFileRoute } from '@tanstack/solid-router';
import ComponentDemo from '../../site-components/ComponentDemo';
import PageHeading from '../../ui/components/PageHeading';
import SidebarDropdown from '../../ui/components/SidebarDropdown';
import SidebarLink from '../../ui/components/SidebarLink';
import SidebarSection from '../../ui/components/SidebarSection';

export const Route = createFileRoute('/components/sidebar-section')({
  component: () => <SidebarSectionPage />,
});

const SidebarSectionPage: Component = () => {
  return (
    <div>
      <PageHeading subheading="A collection of links and dropdowns in the sidebar that represents the highest level of organization.">
        Sidebar Section
      </PageHeading>
      <ComponentDemo
        stories={[
          {
            title: 'With title',
            component: (
              <SidebarSection heading="Sidebar section">
                <SidebarLink href="#" icon={SquareIcon}>
                  Here's something
                </SidebarLink>
                <SidebarLink href="#" icon={SquareIcon}>
                  Here's something else
                </SidebarLink>
                <SidebarDropdown text="Collection" icon={LayoutGridIcon}>
                  <SidebarLink href="#" icon={SquareIcon}>
                    Here's something
                  </SidebarLink>
                  <SidebarLink href="#" icon={SquareIcon}>
                    Here's something else
                  </SidebarLink>
                  <SidebarLink href="#" icon={SquareIcon}>
                    Here's another thing
                  </SidebarLink>
                  <SidebarLink href="#" icon={SquareIcon}>
                    Here's yet another thing
                  </SidebarLink>
                </SidebarDropdown>
                <SidebarLink href="#" icon={SquareIcon}>
                  Here's something
                </SidebarLink>
                <SidebarLink href="#" icon={SquareIcon}>
                  Here's something else
                </SidebarLink>
                <SidebarLink href="#" icon={SquareIcon}>
                  Here's another thing
                </SidebarLink>
              </SidebarSection>
            ),
          },
          {
            title: 'Without title',
            component: (
              <SidebarSection>
                <SidebarLink href="#" icon={SquareIcon}>
                  Here's something
                </SidebarLink>
                <SidebarLink href="#" icon={SquareIcon}>
                  Here's something else
                </SidebarLink>
                <SidebarDropdown text="Collection" icon={LayoutGridIcon}>
                  <SidebarLink href="#" icon={SquareIcon}>
                    Here's something
                  </SidebarLink>
                  <SidebarLink href="#" icon={SquareIcon}>
                    Here's something else
                  </SidebarLink>
                  <SidebarLink href="#" icon={SquareIcon}>
                    Here's another thing
                  </SidebarLink>
                  <SidebarLink href="#" icon={SquareIcon}>
                    Here's yet another thing
                  </SidebarLink>
                </SidebarDropdown>
                <SidebarLink href="#" icon={SquareIcon}>
                  Here's something
                </SidebarLink>
                <SidebarLink href="#" icon={SquareIcon}>
                  Here's something else
                </SidebarLink>
                <SidebarLink href="#" icon={SquareIcon}>
                  Here's another thing
                </SidebarLink>
              </SidebarSection>
            ),
          },
        ]}
        class="mt-8"
      />
    </div>
  );
};

export default SidebarSectionPage;
