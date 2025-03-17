import { Component } from 'solid-js';
import { createFileRoute } from '@tanstack/solid-router';
import ComponentDemo from '../../site-components/ComponentDemo';
import PageHeading from '../../ui/components/PageHeading';
import Card from '../../ui/components/Card';

export const Route = createFileRoute('/components/card')({
  component: () => <CardPage />,
});

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
