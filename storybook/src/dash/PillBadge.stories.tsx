import { ComponentStory, ComponentMeta } from '@storybook/react';
import { PillBadge } from '@dash/components';

export default {
  title: `Dashboard/Core/PillBadge`,
  component: PillBadge,
} as ComponentMeta<typeof PillBadge>;

const All: React.FC = () => (
  <div className="space-y-6">
    <PillBadge type="info">info</PillBadge>
    <PillBadge type="blue">blue</PillBadge>
    <PillBadge type="ok">ok</PillBadge>
    <PillBadge type="green">green standard</PillBadge>
    <PillBadge type="green" small>
      green small
    </PillBadge>
    <PillBadge type="warning">warning standard</PillBadge>
    <PillBadge type="warning" small>
      warning small
    </PillBadge>
    <PillBadge type="yellow">yellow</PillBadge>
    <PillBadge type="error">error</PillBadge>
    <PillBadge type="red">red</PillBadge>
  </div>
);

const Template: ComponentStory<typeof PillBadge> = () => <All />;

export const List = Template.bind({});