import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: [`../src/**/*.stories.@(js|jsx|mjs|ts|tsx)`],
  addons: [
    `@storybook/addon-links`,
    `@storybook/addon-essentials`,
    `@storybook/addon-interactions`,
  ],
  framework: `@storybook/nextjs`,
  typescript: { reactDocgen: false },
  staticDirs: [`../public`],
};
export default config;
