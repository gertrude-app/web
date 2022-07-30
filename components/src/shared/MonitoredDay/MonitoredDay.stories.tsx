import { ComponentStory, ComponentMeta } from '@storybook/react';

import MonitoredDay from './MonitoredDay';

export default {
  title: 'MonitoredDay',
  component: MonitoredDay,
} as ComponentMeta<typeof MonitoredDay>;

const Template: ComponentStory<typeof MonitoredDay> = (args) => <MonitoredDay {...args} />;

export const Default = Template.bind({});
