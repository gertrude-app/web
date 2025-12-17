// auto-generated, do not edit
import type { ISODateString } from '../../types';

export namespace MacOverview {
  export type Input = void;

  export interface Output {
    annualRevenue: number;
    payingParents: number;
    activeParents: number;
    childrenOfActiveParents: number;
    allTimeSignups: number;
    allTimeChildren: number;
    allTimeAppInstallations: number;
    recentSignups: Array<{
      date: ISODateString;
      status: string;
      email: string;
    }>;
  }
}
