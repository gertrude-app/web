import { AllUsersActivityReviewDay } from '@dash/components';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import type { ActivityItem } from '@dash/components';
import { withStatefulChrome } from '../../../decorators/StatefulChrome';
import { testImgUrl, time } from '../../../story-helpers';

export default {
  title: 'Dashboard/Users/Activity/AllUsersActivityReviewDay', // eslint-disable-line
  component: AllUsersActivityReviewDay,
  parameters: { layout: `fullscreen` },
  decorators: [withStatefulChrome],
} as ComponentMeta<typeof AllUsersActivityReviewDay>;

const Template: ComponentStory<typeof AllUsersActivityReviewDay> = (args) => (
  <AllUsersActivityReviewDay {...args} />
);

// @screenshot: xs,md
export const Default = Template.bind({});
Default.args = {
  date: new Date(time.stable()),
  chunkSize: 3,
  activity: {
    'Little Jimmy': [
      keystrokeLine(
        `Xcode`,
        `importFoundationhereisareallylonglinethatwillcauseproblemspotentiallyblahblahblahlorem`,
      ),
      screenshot(400, 600, true),
      keystrokeLine(`Brave`, `Hello world`),
      keystrokeLine(`Xcode`, `import Foundation`),
      screenshot(),
    ],
    Henry: [
      keystrokeLine(
        `Xcode`,
        `importFoundationhereisareallylonglinethatwillcauseproblemspotentiallyblahblahblahlorem`,
      ),
      screenshot(400, 600, true),
      keystrokeLine(`Brave`, `Hello world`),
      keystrokeLine(`Xcode`, `import Foundation`),
      screenshot(),
      screenshot(),
      keystrokeLine(`Messages`, `Sounds good, thanks`),
      screenshot(),
    ],
    Sally: [
      keystrokeLine(
        `Xcode`,
        `importFoundationhereisareallylonglinethatwillcauseproblemspotentiallyblahblahblahlorem`,
      ),
      screenshot(400, 600, true),
      keystrokeLine(`Brave`, `Hello world`),
    ],
  },

  numDeleted: 0,
  deleteItems: () => {},
};

export const Empty = Template.bind({});
Empty.args = { ...Default.args, activity: {} };

// helpers

function common(): { id: string; ids: string[]; date: string } {
  const current = `item-${Math.random()}`;
  return {
    id: `${current}`,
    ids: [`${current}`],
    date: time.stable(),
  };
}

function keystrokeLine(appName: string, line: string, deleted?: boolean): ActivityItem {
  return {
    ...common(),
    type: `KeystrokeLine`,
    appName,
    line,
    deleted,
  };
}

function screenshot(width = 800, height = 600, deleted?: boolean): ActivityItem {
  return {
    ...common(),
    type: `Screenshot`,
    url: testImgUrl(width, height),
    width,
    height,
    deleted,
  };
}
