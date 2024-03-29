import type { StoryObj, Meta } from '@storybook/react';
import HeroBlock from '../../../site/components/HeroBlock';

const meta = {
  title: 'Site/HeroBlock', // eslint-disable-line
  component: HeroBlock,
  parameters: {
    layout: `fullscreen`,
  },
} satisfies Meta<typeof HeroBlock>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;
