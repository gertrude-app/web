import type { StoryObj, Meta } from '@storybook/react';
import MainFooter from '../../../site/components/MainFooter';

const meta = {
  title: 'Site/MainFooter', // eslint-disable-line
  component: MainFooter,
  parameters: {
    layout: `fullscreen`,
  },
} satisfies Meta<typeof MainFooter>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;
