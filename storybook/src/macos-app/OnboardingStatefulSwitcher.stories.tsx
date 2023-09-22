import type { StoryObj, Meta } from '@storybook/react';
import { props, appWindow } from '../story-helpers';
import OnboardingStatefulSwitcher from './OnboardingStatefulSwitcher';

const meta = {
  title: 'MacOS App/Onboarding/Transitions', // eslint-disable-line
  component: OnboardingStatefulSwitcher,
  parameters: appWindow(900, 700),
} satisfies Meta<typeof OnboardingStatefulSwitcher>;

type Story = StoryObj<typeof meta>;

export const StatefulSwitcher: Story = props({});
export default meta;
