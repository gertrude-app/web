import type { GetIdentifiedApps } from '@dash/types';
import type { QueryResult } from './query';
import Current from '../environment';
import { useQuery, Key } from './query';

export function useApps(): QueryResult<GetIdentifiedApps.Output> {
  return useQuery(Key.apps, Current.api.getIdentifiedApps);
}
