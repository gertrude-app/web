import { v4 as uuid } from 'uuid';
import toast from 'react-hot-toast';
import {
  useMutation as useLibMutation,
  useQuery as useLibQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { capitalize, pastTense } from '@shared/string';
import { useState } from 'react';
import type { Result } from '@dash/types';
import type { DeleteEntity, PqlError, SuccessOutput } from '@dash/types';
import type PairQLResult from '@dash/types/src/pairql/Result';
import type {
  UseMutationResult,
  UseQueryResult,
  UseQueryOptions,
} from '@tanstack/react-query';
import type { QueryKey } from './key';
import Current from '../environment';
import { isEditable, isUUID } from '../redux/helpers';
import { Key } from './key';
import { useZip } from './zip';

export { Key, useZip };

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

export function useMutation<T, V>(
  fn: (arg: V) => Promise<PairQLResult<T>>,
  options: MutationOptions<T> = {},
): MutationResult<T, V> {
  const [entityId, setEntityId] = useState<UUID | undefined>(undefined);
  const queryClient = useQueryClient();
  const toasting = getToast(options.toast);
  return useLibMutation({
    mutationFn: (arg) => fn(arg).then((result) => result.valueOrThrow()),
    onMutate(arg) {
      if (isUUID(arg)) {
        setEntityId(arg);
      } else if (isEditable(arg)) {
        setEntityId(arg.original.id);
      }
      if (toasting) {
        toast.dismiss();
        const { verb, entity } = toasting;
        toast.loading(`${capitalize(verb).replace(/e$/, ``)}ing ${entity}...`);
      }
    },
    onError(error) {
      if (options.onError) {
        options.onError(error, entityId);
      }
      if (toasting) {
        toast.dismiss();
        const { verb, entity } = toasting;
        toast.error(`Failed to ${verb} ${entity}`, { duration: 6000 });
      }
    },
    onSuccess(payload) {
      if (options.onSuccess) {
        options.onSuccess(payload, entityId);
      }
      if (toasting) {
        toast.dismiss();
        const { verb, entity } = toasting;
        toast.success(`${capitalize(entity)} ${pastTense(verb)}!`);
      }
    },
    onSettled() {
      if (options.invalidating) {
        options.invalidating.forEach((key) =>
          queryClient.invalidateQueries(key.segments),
        );
      }
    },
  });
}

export function useDeleteEntity(
  type: DeleteEntity.Input['type'],
  options: MutationOptions<SuccessOutput> = {},
): MutationResult<SuccessOutput, UUID> {
  return useMutation((id: UUID) => Current.api.deleteEntity({ type, id }), {
    toast: toastIdFromDeleteEntityType(type),
    ...options,
  });
}

type FireAndForgetOptions<T> = {
  when?: boolean;
  onReceive?: (data: T) => unknown;
};

type QueryOptions<T> = {
  enabled?: boolean;
  onReceive?: (data: T) => unknown;
};

export type MutationOptions<T> = {
  toast?: ToastId;
  invalidating?: QueryKey<unknown>[];
  onSuccess?: (payload: T, entityId?: UUID) => unknown;
  onError?: (error: PqlError, entityId?: UUID) => unknown;
};

export type MutationResult<T, V> = UseMutationResult<T, PqlError, V>;
export type MutationType = 'create' | 'upsert' | 'update' | 'delete';
export type QueryResult<T> = UseQueryResult<T, PqlError>;

type ToastId =
  | 'delete:user'
  | 'delete:device'
  | 'delete:notification'
  | 'delete:notification-method'
  | 'delete:keychain'
  | 'delete:key'
  | 'delete:activity-items'
  | 'update:suspend-filter-request'
  | 'create:pending-notification-method'
  | 'confirm:pending-notification-method'
  | 'save:user'
  | 'save:keychain'
  | 'save:key'
  | 'save:notification';

function getToast(toastId?: ToastId): { verb: string; entity: string } | undefined {
  if (!toastId) {
    return undefined;
  }
  const [verb = ``, entitySlug = ``] = toastId.split(`:`);
  const entity = entitySlug.replace(/-/g, ` `);
  switch (toastId) {
    case `delete:user`:
    case `delete:device`:
    case `delete:notification`:
    case `delete:keychain`:
    case `delete:notification-method`:
    case `delete:key`:
    case `update:suspend-filter-request`:
    case `save:user`:
    case `save:keychain`:
    case `save:key`:
    case `save:notification`:
      return { verb, entity };

    case `create:pending-notification-method`:
      return { verb: `send`, entity: `verification code` };
    case `confirm:pending-notification-method`:
      return { verb: `verify`, entity: `confirmation code` };
    case `delete:activity-items`:
      return { verb: `approve`, entity: `activity items` };
  }
}

function toastIdFromDeleteEntityType(type: DeleteEntity.Input['type']): ToastId {
  switch (type) {
    case `AdminNotification`:
      return `delete:notification`;
    case `AdminVerifiedNotificationMethod`:
      return `delete:notification-method`;
    case `Device`:
      return `delete:device`;
    case `Key`:
      return `delete:key`;
    case `Keychain`:
      return `delete:keychain`;
    case `User`:
      return `delete:user`;
  }
}
