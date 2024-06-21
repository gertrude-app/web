export function isCypress(): boolean {
  return typeof window !== `undefined` && `Cypress` in window;
}

export function isScreenshotTest(): boolean {
  // @ts-ignore
  if (import.meta.env?.STORYBOOK_SCREENSHOT_TESTING !== undefined) {
    return true;
    // @ts-ignore
  } else if (import.meta.env?.CI !== undefined) {
    return true;
  }
  if (typeof globalThis === `undefined` || `process` in globalThis === false) {
    return false;
  }
  // @ts-ignore
  if (process?.env?.STORYBOOK_SCREENSHOT_TESTING !== undefined) {
    return true;
    // @ts-ignore
  } else if (process?.env?.CI !== undefined) {
    return true;
  }
  return false;
}
