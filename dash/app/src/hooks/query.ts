import { v4 as uuid } from 'uuid';
import { useQuery as useLibQuery, useQueryClient } from '@tanstack/react-query';
import type { Result } from '@dash/types';
import type { PqlError } from '@dash/types';
import type { UseQueryResult, UseQueryOptions } from '@tanstack/react-query';
import type { QueryKey } from './key';

export function useFireAndForget<T>(
  fn: () => Promise<Result<T, PqlError>>,
  options: FireAndForgetOptions<T> = {},
): QueryResult<T> {
  return useQueryResult([`fire-and-forget`, uuid()], fn, {
    ...options,
    enabled: options.when,
    retry: false,
    retryOnMount: false,
    cacheTime: Infinity,
    retryDelay: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnReconnect: false,
  });
}

export function useQuery<T>(
  key: QueryKey<T>,
  fn: () => Promise<Result<T, PqlError>>,
  options: QueryOptions<T> = {},
): QueryResult<T> {
  return useQueryResult(key.segments, fn, options);
}

function useQueryResult<T>(
  key: unknown[],
  fn: () => Promise<Result<T, PqlError>>,
  options: QueryOptions<T> & Partial<UseQueryOptions> = {},
): QueryResult<T> {
  return useLibQuery({
    queryKey: key,
    queryFn: async () => {
      const value = (await fn()).valueOrThrow();
      if (options.onReceive) {
        options.onReceive(value);
      }
      return value;
    },
    enabled: options.enabled,
  });
}

export function useOptimism(): {
  update<T>(queryKey: QueryKey<T>, to: T): void;
} {
  const queryClient = useQueryClient();
  return {
    update<T>(queryKey: QueryKey<T>, to: T) {
      // cancel already in-flight queries that would overwrite optimistic update
      queryClient.cancelQueries(queryKey.segments);
      // update the query data to the new value
      queryClient.setQueryData(queryKey.segments, to);
    },
  };
}

type QueryOptions<T> = {
  enabled?: boolean;
  onReceive?: (data: T) => unknown;
};

type FireAndForgetOptions<T> = {
  when?: boolean;
  onReceive?: (data: T) => unknown;
};

export type QueryResult<T> = UseQueryResult<T, PqlError>;
