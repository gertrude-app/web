import type { StoryObj, Meta } from '@storybook/react';
import PeaceOfMindForParentsBlock from '../../../site/components/PeaceOfMindForParentsBlock';

const meta = {
  title: 'Site/PeaceOfMindForParentsBlock', // eslint-disable-line
  component: PeaceOfMindForParentsBlock,
  parameters: {
    layout: `fullscreen`,
  },
} satisfies Meta<typeof PeaceOfMindForParentsBlock>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;
