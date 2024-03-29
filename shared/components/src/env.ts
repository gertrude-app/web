export function isCypress(): boolean {
  return typeof window !== `undefined` && `Cypress` in window;
}

export function isScreenshotTest(): boolean {
  if (typeof globalThis.window === `undefined`) {
    return false;
  }
  // @ts-ignore
  return process?.env?.STORYBOOK_SCREENSHOT_TESTING !== undefined;
}
