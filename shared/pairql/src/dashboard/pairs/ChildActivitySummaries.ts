// auto-generated, do not edit
import type { ISODateString, UUID } from '../../types';

export namespace ChildActivitySummaries {
  export interface Input {
    childId: UUID;
    jsTimezoneOffsetMinutes: number;
  }

  export interface Output {
    childName: string;
    days: Array<{
      date: ISODateString;
      numApproved: number;
      numFlagged: number;
      numTotal: number;
    }>;
  }
}
