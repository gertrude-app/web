import type { StoryObj, Meta } from '@storybook/react';
import SuperScrollerBlock from '../../../site/components/SuperScrollerBlock';

const meta = {
  title: 'Site/SuperScrollerBlock', // eslint-disable-line
  component: SuperScrollerBlock,
  parameters: {
    layout: `fullscreen`,
  },
} satisfies Meta<typeof SuperScrollerBlock>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;
