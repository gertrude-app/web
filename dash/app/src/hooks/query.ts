import toast from 'react-hot-toast';
import {
  useMutation as useLibMutation,
  useQuery as useLibQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { capitalize, pastTense } from '@shared/string';
import { useState } from 'react';
import { Result } from '@dash/types';
import type { DeleteEntity, PqlError, SuccessOutput } from '@dash/types';
import type PairQLResult from '@dash/types/src/pairql/Result';
import type { UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import type { QueryKey } from './key';
import Current from '../environment';
import { isEditable, isUUID } from '../redux/helpers';
import { Key } from './key';
import { useZip } from './zip';

export { Key, useZip };

type MutationId =
  | 'login'
  | 'request-magic-link'
  | 'signup'
  | 'verify-signup-email'
  | 'delete:user'
  | 'delete:device'
  | 'upsert:user'
  | 'delete:keychain'
  | 'upsert:keychain'
  | 'upsert:key'
  | 'delete:key'
  | 'delete:keychain'
  | 'upsert:notification'
  | 'delete:notification'
  | 'delete:notification-method'
  | 'create:billing-portal-session'
  | 'create:pending-app-connection'
  | 'create:pending-notification-method'
  | 'confirm:pending-notification-method'
  | 'accept:unlock-request'
  | 'deny:unlock-request'
  | 'delete:activity-items'
  | 'update:suspend-filter-request';

export function useQuery<T>(
  key: QueryKey<T>,
  fn: () => Promise<Result<T, PqlError>>,
  options: QueryOptions<T> = {},
): QueryResult<T> {
  return useLibQuery({
    queryKey: key.segments,
    queryFn: async () => {
      const value = (await fn()).valueOrThrow();
      if (options.onReceive) {
        options.onReceive(value);
      }
      return value;
    },
    enabled: options.enabled,
    ...(options.neverRefetch
      ? {
          retry: false,
          retryonMount: false,
          cacheTime: Infinity,
          retryDelay: Infinity,
          refetchOnMount: false,
          refetchOnWindowFocus: false,
          refetchInterval: false,
          refetchIntervalInBackground: false,
          refetchOnReconnect: false,
        }
      : {}),
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
  id: MutationId,
  fn: (arg: V) => Promise<PairQLResult<T>>,
  options?: MutationOptions<T>,
): MutationResult<T, V>;

export function useMutation<T, V>(
  options: MutationOptions<T> & {
    id: MutationId;
    fn: (arg: V) => Promise<PairQLResult<T>>;
  },
): MutationResult<T, V>;

export function useMutation<T, V>(
  param1:
    | (MutationOptions<T> & {
        id: MutationId;
        fn: (arg: V) => Promise<PairQLResult<T>>;
      })
    | MutationId,
  param2?: (arg: V) => Promise<PairQLResult<T>>,
  param3?: MutationOptions<T>,
): MutationResult<T, V> {
  let id: MutationId;
  let fn: (arg: V) => Promise<PairQLResult<T>>;
  let options: MutationOptions<T>;
  if (typeof param1 === `string`) {
    id = param1;
    fn = param2 ?? (() => Result.resolveUnexpected(`0a5c18fe`));
    options = param3 ?? {};
  } else {
    id = param1.id;
    fn = param1.fn;
    options = param1;
  }

  const [entityId, setEntityId] = useState<UUID | undefined>(undefined);
  const queryClient = useQueryClient();
  const toasting = getToast(id);
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
  return useMutation(
    mutationIdFromDeleteEntityType(type),
    (id: UUID) => Current.api.deleteEntity({ type, id }),
    options,
  );
}

type QueryOptions<T> = {
  enabled?: boolean;
  neverRefetch?: boolean;
  onReceive?: (data: T) => unknown;
};

export type MutationOptions<T> = {
  invalidating?: QueryKey<unknown>[];
  onSuccess?: (payload: T, entityId?: UUID) => unknown;
  onError?: (error: PqlError, entityId?: UUID) => unknown;
};

export type MutationResult<T, V> = UseMutationResult<T, PqlError, V>;
export type MutationType = 'create' | 'upsert' | 'update' | 'delete';
export type QueryResult<T> = UseQueryResult<T, PqlError>;

function getToast(mutationId: MutationId): { verb: string; entity: string } | undefined {
  const [verb = ``, entitySlug = ``] = mutationId.split(`:`);
  const entity = entitySlug.replace(/-/g, ` `);
  switch (mutationId) {
    case `delete:user`:
    case `delete:device`:
    case `delete:notification`:
    case `delete:keychain`:
    case `delete:notification-method`:
    case `delete:key`:
    case `update:suspend-filter-request`:
      return { verb, entity };

    case `upsert:user`:
    case `upsert:keychain`:
    case `upsert:key`:
    case `upsert:notification`:
      return { verb: `save`, entity };

    case `create:pending-notification-method`:
      return { verb: `send`, entity: `verification code` };
    case `confirm:pending-notification-method`:
      return { verb: `verify`, entity: `confirmation code` };
    case `delete:activity-items`:
      return { verb: `approve`, entity: `activity items` };
    default:
      return undefined;
  }
}

function mutationIdFromDeleteEntityType(type: DeleteEntity.Input['type']): MutationId {
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
