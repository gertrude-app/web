import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SelectMenu } from '@dash/components';

export default {
  title: `Dashboard/Forms/SelectMenu`,
  component: SelectMenu,
} as ComponentMeta<typeof SelectMenu>;

const Template: ComponentStory<typeof SelectMenu> = (args) => <SelectMenu {...args} />;

export const Default = Template.bind({});
Default.args = {
  options: [
    { value: `1`, display: `Do this` },
    { value: `2`, display: `Do that` },
    { value: `3`, display: `Do the other thing` },
  ],
  selectedOption: `Do this`,
};

export const Deemphasized = Template.bind({});
Deemphasized.args = {
  ...Default.args,
  deemphasized: true,
};