import type { RequestState } from '@dash/types';
import type { MutationResult, QueryResult } from '../hooks/query';
import { ensurePqlError } from '../pairql/query';

export default class ReqState {
  static fromQuery<T>(query: QueryResult<T>): RequestState<T> {
    // disabled queries (waiting for enabled: true) are in this first state
    if (query.isLoading && !query.isFetching) {
      return { state: `idle` };
    } else if (query.isLoading) {
      return { state: `ongoing` };
    } else if (query.isError) {
      return { state: `failed`, error: ensurePqlError(query.error) };
    } else {
      return { state: `succeeded`, payload: query.data };
    }
  }

  static fromMutation<T, V>(mutation: MutationResult<T, V>): RequestState<T> {
    switch (mutation.status) {
      case `idle`:
        return { state: `idle` };
      case `loading`:
        return { state: `ongoing` };
      case `error`:
        return { state: `failed`, error: ensurePqlError(mutation.error) };
      case `success`:
        return { state: `succeeded`, payload: mutation.data };
    }
  }
}
