import { env } from '@shared/components';
import type { RequestState, PqlError } from '@dash/types';
import type { JSXElementConstructor } from 'react';
import type { QueriedProps } from './store';

export class Query {
  static resolve<T extends JSXElementConstructor<any>>(
    props: React.ComponentProps<T>,
  ): QueriedProps<T> {
    return { state: `resolved`, props };
  }

  static props<T extends JSXElementConstructor<any>>(
    query: QueriedProps<T>,
  ): React.ComponentProps<T> | undefined {
    if (query.state === `resolved`) {
      return query.props;
    }
    return undefined;
  }

  public static unexpectedError(id: string, message: string): QueriedProps<never> {
    return {
      state: `failed`,
      error: {
        id,
        type: `clientError`,
        debugMessage: `Query.unexpectedError: ${message}`,
      },
    };
  }

  public static redirectDeleted(redirectUrl: string): QueriedProps<never> {
    return { state: `entityDeleted`, redirectUrl };
  }
}

export class Req {
  static succeed<T>(payload: T): RequestState<T> {
    return { state: `succeeded`, payload };
  }

  static toUnresolvedQuery<E extends PqlError>(
    req?: RequestState<never, E>,
  ): QueriedProps<never> {
    switch (req?.state) {
      case undefined: /* fallthrough */
      case `idle`:
        return { state: `shouldFetch` };
      case `ongoing`:
        return { state: `ongoing` };
      case `failed`:
        return {
          state: `failed`,
          error: req.error ?? {
            id: `651ebe47`,
            type: `clientError`,
            debugMessage: `Req.toUnresolvedQuery: failed request with no error`,
          },
        };
      case `succeeded`:
        throw new Error(`unreachable`);
    }
  }

  static fail(error: PqlError | undefined = undefined): RequestState<never> {
    return { state: `failed`, error };
  }

  static ongoing<T, E>(): RequestState<T, E> {
    return { state: `ongoing` };
  }

  static idle<T, E>(): RequestState<T, E> {
    return { state: `idle` };
  }

  static map<T, E, NewT>(
    req: RequestState<T, E>,
    transform: (payload: T) => NewT,
  ): RequestState<NewT, E> {
    if (req.state === `succeeded`) {
      return {
        state: `succeeded`,
        payload: transform(req.payload),
      };
    }
    return req;
  }

  static payload<T, E>(req: RequestState<T, E> | undefined): T | undefined {
    if (req && req.state === `succeeded`) {
      return req.payload;
    }
    return undefined;
  }

  static withPayload<T, E>(
    req: RequestState<T, E> | undefined,
    handler: (payload: T) => unknown,
  ): void {
    if (req && req.state === `succeeded`) {
      handler(req.payload);
    }
  }

  static error<E>(req: RequestState<never, E> | undefined): E | undefined {
    if (req && req.state === `failed`) {
      return req.error;
    }
    return undefined;
  }
}

export function toMap<T extends { id: string }>(array: T[]): Record<string, T> {
  return array.reduce<Record<string, T>>((map, item) => {
    map[item.id] = item;
    return map;
  }, {});
}

export function toEditableMap<T extends { id: string }>(
  array: T[],
): Record<string, Editable<T>> {
  return array.reduce<Record<string, Editable<T>>>((map, item) => {
    map[item.id] = editable(item);
    return map;
  }, {});
}

export function revert<T extends { id: UUID }>({ original }: Editable<T>): Editable<T> {
  return editable(original);
}

export function commit<T extends { id: UUID }>({ draft }: Editable<T>): Editable<T> {
  return { ...editable(draft), isNew: false };
}

export function isEditable<T extends { id: UUID }>(input: unknown): input is Editable<T> {
  if (typeof input !== `object` || input === null) {
    return false;
  } else if (!(`original` in input) || !(`draft` in input)) {
    return false;
  }
  const entity = (input as any).original;
  return typeof entity === `object` && entity !== null && isUUID(entity.id);
}

export function isUUID(input: unknown): input is UUID {
  return (
    typeof input === `string` &&
    input.length === 36 &&
    input.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i) !==
      null
  );
}

// match a v4 uuid with regex
// https://stackoverflow.com/a/13653180/3406963

export function editable<T extends { id: UUID }>(
  original: T,
  isNew?: boolean,
): Editable<T> {
  return { original, draft: JSON.parse(JSON.stringify(original)), isNew };
}

export function original<T extends { id: UUID }>(editable: Editable<T>): T {
  return editable.original;
}

export function draft<T extends { id: UUID }>(editable: Editable<T>): T {
  return editable.draft;
}

export function isDirty<T extends { id: UUID }>(
  editable: Editable<T>,
  prop?: keyof T,
): boolean {
  const draft = prop ? editable.draft[prop] : editable.draft;
  const original = prop ? editable.original[prop] : editable.original;
  return JSON.stringify(original) !== JSON.stringify(draft);
}

export async function spinnerMin<T>(
  promise: Promise<T>,
  delayMs = env.isCypress() ? 0 : 400,
): Promise<T> {
  const start = Date.now();
  const result = await promise;
  const elapsed = Date.now() - start;
  if (elapsed >= delayMs) {
    return result;
  }
  return new Promise((res) => setTimeout(() => res(result), delayMs - elapsed));
}

export function sortActivityDays<T extends { date: string; totalItems: number }>(
  days: Array<T>,
): Array<T> {
  return days
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .filter((day) => day.totalItems > 0);
}
