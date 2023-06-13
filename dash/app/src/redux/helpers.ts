import type { RequestState, PqlError } from '@dash/types';

export class Req {
  static succeed<T>(payload: T): RequestState<T> {
    return { state: `succeeded`, payload };
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

export function editable<T extends { id: UUID }>(
  original: T,
  isNew?: boolean,
): Editable<T> {
  return {
    id: original.id,
    original,
    draft: JSON.parse(JSON.stringify(original)),
    isNew,
  };
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
