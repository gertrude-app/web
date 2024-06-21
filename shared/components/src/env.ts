export function isCypress(): boolean {
  return typeof window !== `undefined` && `Cypress` in window;
}

export function isScreenshotTest(): boolean {
  if (isCypress()) {
    return false;
  }
  // @ts-ignore
  return import.meta.env?.STORYBOOK_SCREENSHOT_TESTING !== undefined;
}
