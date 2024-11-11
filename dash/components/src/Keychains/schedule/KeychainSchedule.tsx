import React from 'react';
import cx from 'classnames';
import type { KeychainSchedule } from '@dash/types';
import SpecifyingActiveOrInactive from './SpecifyingActiveOrInactive';
import WhatDays from './WhatDays';
import WhatTime from './WhatTime';

interface Props {
  schedule: KeychainSchedule;
  setSchedule(schedule: KeychainSchedule): void;
}

const KeychainSchedule: React.FC<Props> = ({ schedule, setSchedule }) => (
  <div
    className={cx(
      `flex justify-center self-center py-1 px-2 items-center rounded-lg transition-colors duration-200 flex-wrap text-sm md:text-base`,
      isTouchDevice()
        ? `bg-transparent gap-1`
        : `bg-transparent gap-1 min-[672px]:gap-0 min-[672px]:bg-slate-200/50 min-[672px]:hover:bg-transparent`,
    )}
  >
    <SpecifyingActiveOrInactive
      schedule={schedule}
      setSchedule={setSchedule}
      isTouchDevice={isTouchDevice()}
    />
    <span className="text-slate-600 px-[3px]">on</span>
    <WhatDays
      schedule={schedule}
      setSchedule={setSchedule}
      isTouchDevice={isTouchDevice()}
    />
    {(schedule.window.start.hour !== 0 ||
      schedule.window.start.minute !== 0 ||
      schedule.window.end.hour !== 23 ||
      schedule.window.end.minute !== 59) && (
      <span className="text-slate-600 px-[3px]">from</span>
    )}
    <WhatTime
      schedule={schedule}
      setSchedule={setSchedule}
      isTouchDevice={isTouchDevice()}
    />
  </div>
);

export default KeychainSchedule;

function isTouchDevice(): boolean {
  return `ontouchstart` in window || navigator.maxTouchPoints > 0;
}
