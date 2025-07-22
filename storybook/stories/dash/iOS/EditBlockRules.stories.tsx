import EditBlockRules from '@dash/components/src/iOS/EditBlockRules';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Dashboard/iOS/EditBlockRules', // eslint-disable-line
  component: EditBlockRules,
  parameters: { layout: `centered` },
} satisfies Meta<typeof EditBlockRules>;

type Story = StoryObj<typeof meta>;

const rules = [
  {
    type: `app`,
    primaryValue: `com.apple.Safari`,
    secondaryValue: ``,
    condition: `always`,
  },
  {
    type: `address`,
    primaryValue: `bad-site.com`,
    secondaryValue: ``,
    condition: `always`,
  },
  {
    type: `app`,
    primaryValue: `com.example.Game`,
    secondaryValue: `ads.com`,
    condition: `whenAddressContains`,
  },
  {
    type: `address`,
    primaryValue: `social.com`,
    secondaryValue: ``,
    condition: `whenIsBrowser`,
  },
  {
    type: `app`,
    primaryValue: `com.netflix.Netflix`,
    secondaryValue: `foo.com\nbar.com`,
    condition: `unlessAddressContains`,
  },
] as const;

export const Default: Story = {
  args: {
    rules: [...rules],
    onDelete: () => {},
    onEdit: () => {},
    onAdd: () => {},
  },
};

export const Empty: Story = {
  args: {
    rules: [],
    onDelete: () => {},
    onEdit: () => {},
    onAdd: () => {},
  },
};

export default meta;
