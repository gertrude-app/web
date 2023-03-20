import { QuickActionsWidget } from '@dash/components';
import type { StoryFn, ComponentMeta } from '@storybook/react';

export default {
  title: 'Dashboard/Dashboard/Widgets/QuickActionsWidget', // eslint-disable-line
  component: QuickActionsWidget,
} as ComponentMeta<typeof QuickActionsWidget>;

const Template: StoryFn<typeof QuickActionsWidget> = (args) => (
  <QuickActionsWidget {...args} />
);

export const Default = Template.bind({});
