import { ActivitySummaries } from '@dash/components';
import type { StoryObj, Meta } from '@storybook/react';
import { withStatefulChrome } from '../../../decorators/StatefulChrome';
import { props, time } from '../../../story-helpers';

const meta = {
  title: 'Dashboard/Users/Activity/ActivitySummaries', // eslint-disable-line
  component: ActivitySummaries,
  parameters: { layout: `fullscreen` },
  decorators: [withStatefulChrome],
} satisfies Meta<typeof ActivitySummaries>;

type Story = StoryObj<typeof meta>;

// @screenshot: xs,md
export const Default: Story = props({
  userName: `Huck`,
  days: [
    { date: new Date(time.stable()), numItems: 330, numCompleted: 0 },
    { date: new Date(time.stable()), numItems: 117, numCompleted: 64 },
    { date: new Date(time.stable()), numItems: 89, numCompleted: 89 },
  ],
});

export const Empty: Story = props({
  ...Default.args,
  days: [],
});

export const AllUsers: Story = props({
  ...Default.args,
  userName: undefined,
});

export default meta;
