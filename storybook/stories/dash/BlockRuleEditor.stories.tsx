import { BlockRuleEditor } from '@dash/components';
import type { Meta, StoryObj } from '@storybook/react';
import { props } from '../story-helpers';

const meta = {
  title: 'Dashboard/Core/BlockRuleEditor', // eslint-disable-line
  component: BlockRuleEditor,
  parameters: { layout: `fullscreen` },
} satisfies Meta<typeof BlockRuleEditor>;

type Story = StoryObj<typeof meta>;

export const Default: Story = props({
  type: `app`,
  primaryValue: `com.apple.Safari`,
  secondaryValue: ``,
  condition: `always`,
  emit: () => {},
});

export default meta;
