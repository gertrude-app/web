import { NetworkTraffic } from '@macos/appviews';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import AppWindow from './AppWindow';

export default {
  title: 'MacOSApp/NetworkTraffic', // eslint-disable-line
  component: NetworkTraffic,
  parameters: {
    layout: `centered`,
  },
} as ComponentMeta<typeof NetworkTraffic>;

const LightTemplate: ComponentStory<typeof NetworkTraffic> = (args) => (
  <AppWindow width={900} height={530}>
    <NetworkTraffic {...args} />
  </AppWindow>
);
export const LightMode = LightTemplate.bind({});
LightMode.args = {};

const DarkTemplate: ComponentStory<typeof NetworkTraffic> = (args) => (
  <AppWindow width={900} height={530}>
    <NetworkTraffic {...args} />
  </AppWindow>
);
export const DarkMode = DarkTemplate.bind({});
DarkMode.args = {};