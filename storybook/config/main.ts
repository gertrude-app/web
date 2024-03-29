import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: [`../stories/**/*.stories.tsx`],
  addons: [`@storybook/addon-essentials`],
  framework: `@storybook/nextjs`,
  typescript: { reactDocgen: false },
  staticDirs: [`../../dash/app/public`],
};
export default config;
