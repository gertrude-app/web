import { Client, type PqlError } from '@shared/pairql';
import type { Result} from '@shared/pairql';

type Env = `dev` | `staging` | `prod`;

function inferEnv(href: string): Env {
  if (
    href.includes(`vercel.app`) ||
    href.startsWith(`https://deploy-preview-`) ||
    (href.startsWith(`https://`) && href.includes(`--staging`))
  ) {
    return `staging`;
  } else if (href.startsWith(`http://`)) {
    return `dev`;
  } else {
    return `prod`;
  }
}

function getEndpoint(env: Env): string {
  switch (env) {
    case `dev`:
      return `http://127.0.0.1:8080`;
    case `staging`:
      return `https://api--staging.gertrude.app`;
    case `prod`:
      return `https://api.gertrude.app`;
  }
}

class AdminClient extends Client {
  constructor(env: Env, getToken: () => string | undefined) {
    super({
      getEndpoint: () => getEndpoint(env),
      domain: `admin`,
      getToken,
      authHeader: `X-AdminToken`,
      logErrors: env !== `prod`,
    });
  }

  static web(href: string, getToken: () => string | undefined): AdminClient {
    const env = inferEnv(href);
    if (env !== `prod`) {
      console.log(`[,] Gertrude Admin client configured for env: ${env.toUpperCase()}`);
    }
    return new AdminClient(env, getToken);
  }

  async requestMagicLink(input: { email: string }): Promise<Result<{ success: boolean }>> {
    return this.query<{ success: boolean }>(input, `RequestAdminMagicLink`);
  }

  async verifyMagicLink(input: { token: string }): Promise<Result<{ token: string }>> {
    return this.query<{ token: string }>(input, `VerifyAdminMagicLink`);
  }

  async macOverview(): Promise<Result<MacOverviewOutput>> {
    return this.query<MacOverviewOutput>(undefined, `MacOverview`);
  }

  async iOSOverview(): Promise<Result<IOSOverviewOutput>> {
    return this.query<IOSOverviewOutput>(undefined, `IOSOverview`);
  }

  async podcastOverview(): Promise<Result<PodcastOverviewOutput>> {
    return this.query<PodcastOverviewOutput>(undefined, `PodcastOverview`);
  }

  async parentsList(input: { page: number; pageSize?: number }): Promise<Result<ParentsListOutput>> {
    return this.query<ParentsListOutput>(input, `ParentsList`);
  }

  async parentDetail(input: { id: string }): Promise<Result<ParentDetailOutput>> {
    return this.query<ParentDetailOutput>(input, `ParentDetail`);
  }
}

export interface MacOverviewOutput {
  annualRevenue: number;
  payingParents: number;
  activeParents: number;
  childrenOfActiveParents: number;
  allTimeSignups: number;
  allTimeChildren: number;
  allTimeAppInstallations: number;
  recentSignups: Array<{
    date: string;
    status: string;
    email: string;
  }>;
}

export interface IOSOverviewOutput {
  firstLaunches: number;
  authorizationSuccesses: number;
  filterInstallSuccesses: number;
  conversionRate: number;
}

export interface PodcastOverviewOutput {
  totalInstalls: number;
  successfulSubscriptions: number;
}

export interface ParentsListOutput {
  parents: Array<{
    id: string;
    email: string;
    createdAt: string;
    subscriptionStatus: string;
    numChildren: number;
    numKeychains: number;
    numNotifications: number;
    status: string;
  }>;
  totalCount: number;
  page: number;
  totalPages: number;
}

export interface ParentDetailOutput {
  id: string;
  email: string;
  subscriptionStatus: string;
  subscriptionId?: string;
  monthlyPriceInCents: number;
  createdAt: string;
  children: Array<{
    id: string;
    name: string;
    keyloggingEnabled: boolean;
    screenshotsEnabled: boolean;
    createdAt: string;
    installations: Array<{
      id: string;
      appVersion: string;
      filterVersion?: string;
      osVersion?: string;
      modelIdentifier?: string;
      createdAt: string;
    }>;
  }>;
  keychains: Array<{
    id: string;
    name: string;
    numKeys: number;
    isPublic: boolean;
  }>;
  notifications: Array<{
    id: string;
    trigger: string;
  }>;
}

const client = AdminClient.web(
  typeof window !== `undefined` ? window.location.href : `http://localhost:4243`,
  () => localStorage.getItem(`admin_token`) ?? undefined,
);

export default client;
export type { PqlError };
