// TODO: do something about this guy

export type SidebarItem =
  | { type: 'link'; href: string; text: string; icon?: string }
  | { type: 'dropdown'; text: string; icon?: string; items: SidebarItem[] };

// temp:
export type Overview = {
  annualRevenue: number;
  payingParents: number;
  activeParents: number;
  childrenOfActiveParents: number; // or activelyProtectedChildren
  allTimeSignups: number;
  allTimeChildren: number;
  allTimeAppInstallations: number;
};

export type RecentSignupsGraph = Array<{
  email: string;
  date: Date;
  status: 'no_action' | 'onboarded' | 'active';
}>;
