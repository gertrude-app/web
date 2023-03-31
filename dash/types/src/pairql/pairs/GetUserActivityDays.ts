// auto-generated, do not edit

export namespace GetUserActivityDays {
  export interface Input {
    dateRanges: Array<{
      start: string;
      end: string;
    }>;
  }

  export interface Output {
    userName: string;
    days: Array<{
      date: ISODateString;
      numApproved: number;
      totalItems: number;
    }>;
  }
}
