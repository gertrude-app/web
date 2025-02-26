import { Component } from 'solid-js';
import { clientOnly } from '@solidjs/start';
import ComponentDemo from '~/site-components/ComponentDemo';
import PageHeading from '~/ui-lib/components/PageHeading';
import SidebarDropdown from '~/ui-lib/components/SidebarDropdown';
import SidebarLink from '~/ui-lib/components/SidebarLink';
import SidebarSection from '~/ui-lib/components/SidebarSection';

const SquaresIcon = clientOnly(() => import(`lucide-solid/icons/layout-grid`));
const SquareIcon = clientOnly(() => import(`lucide-solid/icons/square`));

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
                <SidebarLink text="Here's something" href="#" icon={SquareIcon} />
                <SidebarLink text="Here's something else" href="#" icon={SquareIcon} />
                <SidebarDropdown text="Collection" icon={SquaresIcon}>
                  <SidebarLink text="Here's something" href="#" icon={SquareIcon} />
                  <SidebarLink text="Here's something else" href="#" icon={SquareIcon} />
                  <SidebarLink text="Here's another thing" href="#" icon={SquareIcon} />
                  <SidebarLink
                    text="Here's yet another thing"
                    href="#"
                    icon={SquareIcon}
                  />
                </SidebarDropdown>
                <SidebarLink text="Here's something" href="#" icon={SquareIcon} />
                <SidebarLink text="Here's something else" href="#" icon={SquareIcon} />
                <SidebarLink text="Here's another thing" href="#" icon={SquareIcon} />
              </SidebarSection>
            ),
          },
          {
            title: 'Without title',
            component: (
              <SidebarSection>
                <SidebarLink text="Here's something" href="#" icon={SquareIcon} />
                <SidebarLink text="Here's something else" href="#" icon={SquareIcon} />
                <SidebarDropdown text="Collection" icon={SquaresIcon}>
                  <SidebarLink text="Here's something" href="#" icon={SquareIcon} />
                  <SidebarLink text="Here's something else" href="#" icon={SquareIcon} />
                  <SidebarLink text="Here's another thing" href="#" icon={SquareIcon} />
                  <SidebarLink
                    text="Here's yet another thing"
                    href="#"
                    icon={SquareIcon}
                  />
                </SidebarDropdown>
                <SidebarLink text="Here's something" href="#" icon={SquareIcon} />
                <SidebarLink text="Here's something else" href="#" icon={SquareIcon} />
                <SidebarLink text="Here's another thing" href="#" icon={SquareIcon} />
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
