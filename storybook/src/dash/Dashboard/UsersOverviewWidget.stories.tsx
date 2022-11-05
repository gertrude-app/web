import { UsersOverviewWidget } from '@dash/components';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { withIds } from '../../story-helpers';

export default {
  title: `Dashboard/Dashboard/Widgets/UserOverview`,
  component: UsersOverviewWidget,
} as ComponentMeta<typeof UsersOverviewWidget>;

const Template: ComponentStory<typeof UsersOverviewWidget> = (args) => (
  <UsersOverviewWidget {...args} />
);

export const Default = Template.bind({});
Default.args = {
  users: withIds([
    { name: `Little Jimmy`, isOnline: true },
    { name: `Sally`, isOnline: true },
    { name: `Henry`, isOnline: false },
  ]),
};

export const NoUsers = Template.bind({});
NoUsers.args = {
  users: [],
};
