import type { StoryObj, Meta } from '@storybook/react';
import DefenseInDepthBlock from '../../../site/components/DefenseInDepthBlock';

const meta = {
  title: 'Site/DefenseInDepthBlock', // eslint-disable-line
  component: DefenseInDepthBlock,
  parameters: {
    layout: `fullscreen`,
  },
} satisfies Meta<typeof DefenseInDepthBlock>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;
