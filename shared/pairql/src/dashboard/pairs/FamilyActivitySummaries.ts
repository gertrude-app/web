// auto-generated, do not edit
import type { ISODateString } from '../../types';

export namespace FamilyActivitySummaries {
  export interface Input {
    jsTimezoneOffsetMinutes: number;
  }

  export type Output = Array<{
    date: ISODateString;
    numApproved: number;
    numFlagged: number;
    numTotal: number;
  }>;
}
