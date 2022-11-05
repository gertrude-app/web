import { ErrorMessage } from '@dash/components';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: `Dashboard/Core/ErrorMessage`,
  component: ErrorMessage,
} as ComponentMeta<typeof ErrorMessage>;

const Template: ComponentStory<typeof ErrorMessage> = (args) => (
  <ErrorMessage {...args} />
);

export const Default = Template.bind({});
Default.args = { children: `Something went wrong!` };

export const LongMessage = Template.bind({});
LongMessage.args = {
  children: `EADDRINUSE: Really sorry about this, but it seems like something (or several things) went wrong! Maybe you should check the specs on the rotary girder!`,
};
