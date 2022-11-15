import { ScreenshotViewer } from '@dash/components';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Dashboard/Users/Activity/ScreenshotViewer', // eslint-disable-line
  component: ScreenshotViewer,
} as ComponentMeta<typeof ScreenshotViewer>;

const Template: ComponentStory<typeof ScreenshotViewer> = (args) => (
  <ScreenshotViewer {...args} />
);

export const Default = Template.bind({});
Default.args = {
  url: `https://placekitten.com/800/600`,
  width: 800,
  height: 600,
  date: new Date(),
};

export const Tall = Template.bind({});
Tall.args = {
  url: `https://placekitten.com/800/900`,
  width: 800,
  height: 900,
  date: new Date(),
};

export const Wide = Template.bind({});
Wide.args = {
  url: `https://placekitten.com/1200/400`,
  width: 1200,
  height: 400,
  date: new Date(),
};
