import { createAction, nanoid } from '@reduxjs/toolkit';
import {
  useMutation as libUseMutation,
  useQueryClient,
  useQuery as libUseQuery,
} from '@tanstack/react-query';
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import type PairQLResult from '@dash/types/src/pairql/Result';
import type { PqlError, Result } from '@dash/types';
import type { UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import { useDispatch } from '../redux/hooks';
import { ensurePqlError } from '../pairql/query';

export function useQuery<T>(
  key: QueryKey,
  fn: () => Promise<Result<T, PqlError>>,
  options: {
    dispatch?: ActionCreatorWithPayload<T, string>;
    enabled?: boolean;
  } = {},
): UseQueryResult<T, PqlError> {
  const dispatch = useDispatch();
  const requestId = nanoid();
  return libUseQuery({
    queryKey: key.segments,
    queryFn: async () => {
      try {
        dispatch(queryStarted(key, requestId));
        const value = (await fn()).valueOrThrow();
        dispatch(querySucceeded(key, requestId));
        if (options.dispatch) {
          dispatch(options.dispatch(value));
        }
        return value;
      } catch (error) {
        dispatch(queryFailed(key, ensurePqlError(error), requestId));
        throw error;
      }
    },
    enabled: options.enabled,
  });
}

function useMutation<T, V>(
  key: QueryKey,
  fn: (arg: V) => Promise<PairQLResult<T>>,
  type: MutationType,
): UseMutationResult<T, PqlError, V> {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const requestId = nanoid();
  return libUseMutation({
    mutationKey: key.segments,
    mutationFn: (arg) => fn(arg).then((result) => result.valueOrThrow()),
    onMutate() {
      dispatch(mutationStarted(key, type, requestId));
    },
    onError(error) {
      queryClient.invalidateQueries(key.segments);
      dispatch(mutationFailed(key, type, error, requestId));
    },
    onSuccess() {
      queryClient.invalidateQueries(key.segments);
      dispatch(mutationSucceeded(key, type, requestId));
    },
  });
}

export function useUpdate<T, V>(
  key: QueryKey,
  fn: (arg: V) => Promise<PairQLResult<T>>,
): UseMutationResult<T, PqlError, V> {
  return useMutation(key, fn, `update`);
}

export function useUpsert<T, V>(
  key: QueryKey,
  fn: (arg: V) => Promise<PairQLResult<T>>,
): UseMutationResult<T, PqlError, V> {
  return useMutation(key, fn, `upsert`);
}

export function useCreate<T, V>(
  key: QueryKey,
  fn: (arg: V) => Promise<PairQLResult<T>>,
): UseMutationResult<T, PqlError, V> {
  return useMutation(key, fn, `create`);
}

export function useDelete<T, V>(
  key: QueryKey,
  fn: (arg: V) => Promise<PairQLResult<T>>,
): UseMutationResult<T, PqlError, V> {
  return useMutation(key, fn, `delete`);
}

// actions

export const queryStarted = createAction(
  `query:started`,
  (key: QueryKey, requestId: string) => ({
    payload: key,
    meta: { requestId },
  }),
);

export const queryFailed = createAction(
  `query:failed`,
  (key: QueryKey, error: PqlError | undefined, requestId: string) => ({
    payload: key,
    error,
    meta: { requestId },
  }),
);

export const querySucceeded = createAction(
  `query:succeeded`,
  (key: QueryKey, requestId: string) => ({
    payload: key,
    meta: { requestId },
  }),
);

export const mutationStarted = createAction(
  `mutation:started`,
  (key: QueryKey, type: MutationType, requestId: string) => ({
    payload: undefined,
    meta: { key, type, requestId },
  }),
);

export const mutationFailed = createAction(
  `mutation:failed`,
  (key: QueryKey, type: MutationType, error: PqlError, requestId: string) => ({
    payload: undefined,
    error,
    meta: { key, type, requestId },
  }),
);

export const mutationSucceeded = createAction(
  `mutation:succeeded`,
  (key: QueryKey, type: MutationType, requestId: string) => ({
    payload: undefined,
    meta: { key, type, requestId },
  }),
);

// keys

export class Key {
  static user(id: UUID): QueryKey {
    return key(`users/:id`, [`users`, id], id, `user`);
  }

  static get selectableKeychains(): QueryKey {
    return key(`selectable-keychains`, [`selectable-keychains`]);
  }

  static get dashboard(): QueryKey {
    return key(`dashboard`, [`dashboard`]);
  }
}

export type MutationResult<T, V> = UseMutationResult<T, PqlError, V>;
export type MutationType = 'create' | 'upsert' | 'update' | 'delete';
export type QueryResult<T> = UseQueryResult<T, PqlError>;

// implementation

type QueryKey = {
  readonly path: string;
  readonly id: UUID | undefined;
  readonly segments: unknown[];
  readonly toast?: string;
};

function key(path: string, segments: unknown[], id?: UUID, toast?: string): QueryKey {
  return { path, id, segments, toast };
}
