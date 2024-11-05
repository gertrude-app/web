import type { PlainTimeWindow, KeychainSchedule } from './pairql/shared';

export function timeWindow(): PlainTimeWindow {
  return {
    start: { hour: 21, minute: 0 },
    end: { hour: 5, minute: 0 },
  };
}

export function keychainSchedule(): KeychainSchedule {
  return {
    mode: `active`,
    days: {
      sunday: true,
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
    },
    window: timeWindow(),
  };
}