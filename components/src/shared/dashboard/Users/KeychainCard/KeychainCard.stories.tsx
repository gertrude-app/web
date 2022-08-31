import { ComponentStory, ComponentMeta } from '@storybook/react';
import KeychainCard from './KeychainCard';

export default {
  title: `Dashboard/Users/KeychainCard`,
  component: KeychainCard,
} as ComponentMeta<typeof KeychainCard>;

const Template: ComponentStory<typeof KeychainCard> = (args) => (
  <KeychainCard {...args} />
);

export const Shared = Template.bind({});
Shared.args = {
  name: `HTC`,
  keys: 43,
  isPublic: true,
  description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum laboriosam aperiam quasi blanditiis.`,
  onRemove: () => {},
};

export const Private = Template.bind({});
Private.args = {
  ...Shared.args,
  isPublic: false,
};

export const Editable = Template.bind({});
Editable.args = {
  ...Shared.args,
  isPublic: false,
  editable: true,
};