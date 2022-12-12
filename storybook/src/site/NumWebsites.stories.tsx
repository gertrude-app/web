import { NumWebsites } from '@site/components';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Site/NumWebsites', // eslint-disable-line
  component: NumWebsites,
  parameters: { layout: `fullscreen` },
} as ComponentMeta<typeof NumWebsites>;

const Template: ComponentStory<typeof NumWebsites> = (args) => <NumWebsites {...args} />;

export const Default = Template.bind({});
Default.args = {};
