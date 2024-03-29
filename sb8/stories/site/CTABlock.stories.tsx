import type { StoryObj, Meta } from '@storybook/react';
import CTABlock from '../../../site/components/CTABlock';

const meta = {
  title: 'Site/CTABlock', // eslint-disable-line
  component: CTABlock,
  parameters: {
    layout: `fullscreen`,
  },
} satisfies Meta<typeof CTABlock>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;
