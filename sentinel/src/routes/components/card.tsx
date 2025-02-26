import { Component } from 'solid-js';
import ComponentDemo from '~/site-components/ComponentDemo';
import PageHeading from '~/ui-lib/components/PageHeading';
import Card from '~/ui-lib/components/Card';

const CardPage: Component = () => {
  return (
    <div>
      <PageHeading subheading="An elevated, semi-transparent containing element.">
        Card
      </PageHeading>
      <ComponentDemo
        stories={[
          {
            title: 'Default',
            component: (
              <Card class="!w-40 !h-40">
                <div></div>
              </Card>
            ),
          },
        ]}
        class="mt-8"
      />
    </div>
  );
};

export default CardPage;
