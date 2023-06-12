import toast from 'react-hot-toast';
import { createAction, nanoid } from '@reduxjs/toolkit';
import {
  useMutation as useLibMutation,
  useQuery as useLibQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { capitalize, pastTense } from '@shared/string';
import { useState } from 'react';
import { Result } from '@dash/types';
import type { DeleteEntity, PqlError, SuccessOutput } from '@dash/types';
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import type PairQLResult from '@dash/types/src/pairql/Result';
import type { UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import type { QueryKey, QueryKeyData } from './key';
import { useDispatch } from '../redux/hooks';
import { ensurePqlError } from '../pairql/query';
import Current from '../environment';
import { isEditable, isUUID } from '../redux/helpers';
import { Key } from './key';
import { useZip } from './zip';

export { Key, useZip };

type MutationId =
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
  const dispatch = useDispatch();
  const requestId = nanoid();
  return useLibQuery({
    queryKey: key.segments,
    queryFn: async () => {
      try {
        dispatch(queryStarted(key.data, requestId));
        const value = (await fn()).valueOrThrow();
        dispatch(querySucceeded(key.data, requestId));
        if (options.payloadAction) {
          dispatch(options.payloadAction(value));
        }
        if (options.onReceive) {
          options.onReceive(value);
        }
        return value;
      } catch (error) {
        dispatch(queryFailed(key.data, ensurePqlError(error), requestId));
        throw error;
      }
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

  const [arg, setArg] = useState<V | undefined>(undefined);
  const [entityId, setEntityId] = useState<UUID | undefined>(undefined);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const requestId = nanoid();
  const toasting = getToast(id);
  return useLibMutation({
    mutationFn: (arg) => fn(arg).then((result) => result.valueOrThrow()),
    onMutate(arg) {
      setArg(arg);
      let entityId: UUID | undefined = undefined;
      if (isUUID(arg)) {
        entityId = arg;
        setEntityId(arg);
      } else if (isEditable(arg)) {
        entityId = arg.original.id;
        setEntityId(arg.original.id);
      }
      if (entityId) {
        dispatch(entityMutationStarted(id)(entityId, requestId));
      } else {
        dispatch(mutationStarted(id)(arg, requestId));
      }
      if (toasting) {
        toast.dismiss();
        const { verb, entity } = toasting;
        toast.loading(`${capitalize(verb).replace(/e$/, ``)}ing ${entity}...`);
      }
    },
    onError(error) {
      if (entityId) {
        dispatch(entityMutationFailed(id)(error, entityId, requestId));
      } else {
        dispatch(mutationFailed(id)(error, arg, requestId));
      }
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
      if (entityId) {
        dispatch(entityMutationSucceeded(id)(entityId, requestId));
      } else {
        dispatch(mutationSucceeded(id)(arg, requestId));
      }
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

// actions

export const queryStarted = createAction(
  `query:started`,
  (key: QueryKeyData, requestId: string) => ({
    payload: key,
    meta: { requestId },
  }),
);

export const queryFailed = createAction(
  `query:failed`,
  (key: QueryKeyData, error: PqlError | undefined, requestId: string) => ({
    payload: key,
    error,
    meta: { requestId },
  }),
);

export const querySucceeded = createAction(
  `query:succeeded`,
  (key: QueryKeyData, requestId: string) => ({
    payload: key,
    meta: { requestId },
  }),
);

// eslint-disable-next-line
export const mutationStarted = (mutationId: MutationId) =>
  createAction(`mutation:${mutationId}:started`, (arg: unknown, requestId: string) => ({
    payload: undefined,
    meta: { mutationId, arg, requestId },
  }));

// eslint-disable-next-line
export const entityMutationStarted = (mutationId: MutationId) =>
  createAction(`mutation:${mutationId}:started`, (entityId: UUID, requestId: string) => ({
    payload: undefined,
    meta: { mutationId, entityId, requestId },
  }));

// eslint-disable-next-line
export const mutationFailed = (mutationId: MutationId) =>
  createAction(
    `mutation:${mutationId}:failed`,
    (error: PqlError, arg: unknown, requestId: string) => ({
      payload: undefined,
      error,
      meta: { mutationId, arg, requestId },
    }),
  );

// eslint-disable-next-line
export const entityMutationFailed = (mutationId: MutationId) =>
  createAction(
    `mutation:${mutationId}:failed`,
    (error: PqlError, entityId: UUID, requestId: string) => ({
      payload: undefined,
      error,
      meta: { mutationId, entityId, requestId },
    }),
  );

// eslint-disable-next-line
export const mutationSucceeded = (mutationId: MutationId) =>
  createAction(`mutation:${mutationId}:succeeded`, (arg: unknown, requestId: string) => ({
    payload: undefined,
    meta: { mutationId, arg, requestId },
  }));

// eslint-disable-next-line
export const entityMutationSucceeded = (mutationId: MutationId) =>
  createAction(
    `mutation:${mutationId}:succeeded`,
    (entityId: UUID, requestId: string) => ({
      payload: undefined,
      meta: { mutationId, entityId, requestId },
    }),
  );

type QueryOptions<T> = {
  enabled?: boolean;
  payloadAction?: ActionCreatorWithPayload<T, string>;
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
