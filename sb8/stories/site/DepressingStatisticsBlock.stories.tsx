import type { StoryObj, Meta } from '@storybook/react';
import DepressingStatisticsBlock from '../../../site/components/DepressingStatisticsBlock';

const meta = {
  title: 'Site/DepressingStatisticsBlock', // eslint-disable-line
  component: DepressingStatisticsBlock,
  parameters: {
    layout: `fullscreen`,
  },
} satisfies Meta<typeof DepressingStatisticsBlock>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;
