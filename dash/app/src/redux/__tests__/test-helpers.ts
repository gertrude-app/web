export function nextTick(): Promise<unknown> {
  return new Promise<unknown>(setImmediate);
}
