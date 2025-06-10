// auto-generated, do not edit

export namespace AnalyticsOverview {
  export type Input = void;

  export interface Output {
    overview: {
      annualRevenue: { rawValue: number };
      payingParents: number;
      activeParents: number;
      childrenOfActiveParents: number;
      allTimeSignups: number;
      allTimeChildren: number;
      allTimeAppInstallations: number;
    };
    recentSignups: Array<{
      date: ISODateString;
      status: 'noAction' | 'onboarded' | 'active';
      email: { rawValue: string };
    }>;
  }
}
