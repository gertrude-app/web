// auto-generated, do not edit

import dotenv from 'dotenv';
import type { ParentOverviews } from './types/pairs/ParentOverviews';
import type { AnalyticsOverview } from './types/pairs/AnalyticsOverview';
import { fetcher } from './fetcher';

dotenv.config();

const endpoint = process.env.API_ENDPOINT;

export const liveClient = {
  parentOverviews(): Promise<Result<ParentOverviews.Output, string>> {
    return fetcher.request<ParentOverviews.Output>(
      endpoint + `/pairql/super-admin/ParentOverviews`,
    );
  },

  analyticsOverview(): Promise<Result<AnalyticsOverview.Output, string>> {
    return fetcher.request<AnalyticsOverview.Output>(
      endpoint + `/pairql/super-admin/AnalyticsOverview`,
    );
  },
};
