import { Component } from 'solid-js';
import { clientOnly } from '@solidjs/start';
import ComponentDemo from '~/site-components/ComponentDemo';
import PageHeading from '~/ui-lib/components/PageHeading';
import SidebarDropdown from '~/ui-lib/components/SidebarDropdown';
import SidebarLink from '~/ui-lib/components/SidebarLink';

const SquaresIcon = clientOnly(() => import(`lucide-solid/icons/layout-grid`));
const SquareIcon = clientOnly(() => import(`lucide-solid/icons/square`));

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
              <SidebarDropdown text="Collection" icon={SquaresIcon}>
                <SidebarLink text="Here's something" href="#" icon={SquareIcon} />
                <SidebarLink text="Here's something else" href="#" icon={SquareIcon} />
                <SidebarLink text="Here's another thing" href="#" icon={SquareIcon} />
                <SidebarLink text="Here's yet another thing" href="#" icon={SquareIcon} />
              </SidebarDropdown>
            ),
          },
          {
            title: 'Without icons',
            component: (
              <SidebarDropdown text="Collection">
                <SidebarLink text="Here's something" href="#" />
                <SidebarLink text="Here's something else" href="#" />
                <SidebarLink text="Here's another thing" href="#" />
                <SidebarLink text="Here's yet another thing" href="#" />
              </SidebarDropdown>
            ),
          },
          {
            title: 'With sub-dropdowns',
            component: (
              <SidebarDropdown text="Collection" icon={SquaresIcon}>
                <SidebarLink text="Here's something" href="#" icon={SquareIcon} />
                <SidebarLink text="Here's something else" href="#" icon={SquareIcon} />
                <SidebarLink text="Here's another thing" href="#" icon={SquareIcon} />
                <SidebarDropdown text="Inner collection" icon={SquaresIcon}>
                  <SidebarLink text="Here's something" href="#" icon={SquareIcon} />
                  <SidebarLink text="Here's something else" href="#" icon={SquareIcon} />
                  <SidebarLink text="Here's another thing" href="#" icon={SquareIcon} />
                  <SidebarLink
                    text="Here's yet another thing"
                    href="#"
                    icon={SquareIcon}
                  />
                </SidebarDropdown>
                <SidebarLink text="Here's yet another thing" href="#" icon={SquareIcon} />
              </SidebarDropdown>
            ),
          },
          {
            title: 'With many children',
            component: (
              <SidebarDropdown text="Collection">
                <SidebarLink text="Link the first" href="#" />
                <SidebarLink text="Link the second" href="#" />
                <SidebarLink text="Link the third" href="#" />
                <SidebarLink text="Link the fourth" href="#" />
                <SidebarLink text="Link the fifth" href="#" />
                <SidebarLink text="Link the sixth" href="#" />
                <SidebarLink text="Link the seventh" href="#" />
                <SidebarLink text="Link the eighth" href="#" />
                <SidebarLink text="Link the ninth" href="#" />
                <SidebarLink text="Link the tenth" href="#" />
                <SidebarLink text="Link the eleventh" href="#" />
                <SidebarLink text="Link the twelfth" href="#" />
                <SidebarLink text="Link the thirteenth" href="#" />
                <SidebarLink text="Link the fourteenth" href="#" />
                <SidebarLink text="Link the fifteenth" href="#" />
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
