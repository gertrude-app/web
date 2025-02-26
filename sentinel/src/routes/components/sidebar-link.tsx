import { Component } from 'solid-js';
import { clientOnly } from '@solidjs/start';
import ComponentDemo from '~/site-components/ComponentDemo';
import PageHeading from '~/ui-lib/components/PageHeading';
import SidebarLink from '~/ui-lib/components/SidebarLink';

const QuestionMarkIcon = clientOnly(() => import(`lucide-solid/icons/circle-help`));

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
            component: <SidebarLink text="About us" href="#" icon={QuestionMarkIcon} />,
          },
          {
            title: 'Without icon',
            component: <SidebarLink text="About us" href="#" />,
          },
        ]}
        class="mt-8"
      />
    </div>
  );
};

export default SidebarLinkPage;
