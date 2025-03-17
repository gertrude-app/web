import { createFileRoute } from '@tanstack/solid-router';
import { LayoutGridIcon, SquareIcon } from 'lucide-solid';
import { Component } from 'solid-js';
import ComponentDemo from '../../site-components/ComponentDemo';
import PageHeading from '../../ui/components/PageHeading';
import SidebarDropdown from '../../ui/components/SidebarDropdown';
import SidebarLink from '../../ui/components/SidebarLink';

export const Route = createFileRoute('/components/sidebar-dropdown')({
  component: () => <SidebarDropdownPage />,
});

const SidebarDropdownPage: Component = () => {
  return (
    <div>
      <PageHeading subheading="A collapsable containing element for grouping Sidebar Links into categories.">
        Sidebar Dropdown
      </PageHeading>
      <ComponentDemo
        stories={[
          {
            title: 'With icons',
            component: (
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
            ),
          },
          {
            title: 'Without icons',
            component: (
              <SidebarDropdown text="Collection">
                <SidebarLink href="#">Here's something</SidebarLink>
                <SidebarLink href="#">Here's something else</SidebarLink>
                <SidebarLink href="#">Here's another thing</SidebarLink>
                <SidebarLink href="#">Here's yet another thing</SidebarLink>
              </SidebarDropdown>
            ),
          },
          {
            title: 'With sub-dropdowns',
            component: (
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
                <SidebarDropdown text="Inner collection" icon={LayoutGridIcon}>
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
                  Here's yet another thing
                </SidebarLink>
              </SidebarDropdown>
            ),
          },
          {
            title: 'With many children',
            component: (
              <SidebarDropdown text="Collection">
                <SidebarLink href="#">Link the first</SidebarLink>
                <SidebarLink href="#">Link the second</SidebarLink>
                <SidebarLink href="#">Link the third</SidebarLink>
                <SidebarLink href="#">Link the fourth</SidebarLink>
                <SidebarLink href="#">Link the fifth</SidebarLink>
                <SidebarLink href="#">Link the sixth</SidebarLink>
                <SidebarLink href="#">Link the seventh</SidebarLink>
                <SidebarLink href="#">Link the eighth</SidebarLink>
                <SidebarLink href="#">Link the ninth</SidebarLink>
                <SidebarLink href="#">Link the tenth</SidebarLink>
                <SidebarLink href="#">Link the eleventh</SidebarLink>
                <SidebarLink href="#">Link the twelfth</SidebarLink>
                <SidebarLink href="#">Link the thirteenth</SidebarLink>
                <SidebarLink href="#">Link the fourteenth</SidebarLink>
                <SidebarLink href="#">Link the fifteenth</SidebarLink>
              </SidebarDropdown>
            ),
          },
        ]}
        class="mt-8"
      />
    </div>
  );
};

export default SidebarDropdownPage;
