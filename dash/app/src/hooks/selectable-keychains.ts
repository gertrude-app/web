import type { KeychainSummary } from '@dash/types';
import type { QueryResult } from './query';
import Current from '../environment';
import { useQuery, Key } from './query';

// moveme
export function useSelectableKeychains(): QueryResult<{
  own: KeychainSummary[];
  public: KeychainSummary[];
}> {
  return useQuery(Key.selectableKeychains, Current.api.getSelectableKeychains);
}
