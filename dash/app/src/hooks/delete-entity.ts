import { useState } from 'react';
import type { ConfirmableEntityAction, DeleteEntity, SuccessOutput } from '@dash/types';
import type { MutationOptions } from './query';
import { useDeleteEntity } from './query';

export function useConfirmableDelete(
  entityType: DeleteEntity.Input['type'],
  options: MutationOptions<SuccessOutput> & { id?: UUID } = {},
): ConfirmableEntityAction<UUID | void> & {
  state: 'idle' | 'loading' | 'error' | 'success';
} {
  const [stateId, setStateId] = useState<UUID | undefined>();
  const mutation = useDeleteEntity(entityType, options);

  return {
    id: stateId,
    start: (argId?: UUID) => setStateId(argId ?? options.id ?? ``),
    confirm: () => {
      mutation.mutate(stateId ?? ``);
      setStateId(undefined);
    },
    cancel: () => setStateId(undefined),
    state: mutation.status,
  };
}
