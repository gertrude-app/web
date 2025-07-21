import BlockRuleSummary from '@dash/components/src/iOS/BlockRuleSummary';
import type { Meta, StoryObj } from '@storybook/react';
import { props } from '../story-helpers';

const meta = {
  title: 'Dashboard/Core/BlockRuleSummary', // eslint-disable-line
  component: BlockRuleSummary,
  parameters: { layout: `centered` },
} satisfies Meta<typeof BlockRuleSummary>;

type Story = StoryObj<typeof meta>;

export const AppAlways: Story = props({
  type: `app`,
  primaryValue: `com.apple.Safari`,
  secondaryValue: ``,
  condition: `always`,
});

export const AppWhenAddressContains: Story = props({
  type: `app`,
  primaryValue: `com.apple.Safari`,
  secondaryValue: `bad-site.com`,
  condition: `whenAddressContains`,
});

export const AppWhenIsBrowser: Story = props({
  type: `app`,
  primaryValue: `com.apple.Safari`,
  secondaryValue: ``,
  condition: `whenIsBrowser`,
});

export const AppUnlessAddressContains: Story = props({
  type: `app`,
  primaryValue: `com.apple.Safari`,
  secondaryValue: `foo.com\nbar.com`,
  condition: `unlessAddressContains`,
});

export const AddressAlways: Story = props({
  type: `address`,
  primaryValue: `example.com`,
  secondaryValue: ``,
  condition: `always`,
});

export const AddressWhenIsBrowser: Story = props({
  type: `address`,
  primaryValue: `example.com`,
  secondaryValue: ``,
  condition: `whenIsBrowser`,
});

export default meta;
