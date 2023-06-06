import { useState } from 'react';
import type { ConfirmableEntityAction, DeleteEntity } from '@dash/types';
import { useDeleteEntity } from './query';

export function useConfirmableDelete(
  entityType: DeleteEntity.Input['type'],
  entityId?: UUID,
): ConfirmableEntityAction<UUID | void> & {
  state: 'idle' | 'loading' | 'error' | 'success';
} {
  const [stateId, setStateId] = useState<UUID | undefined>();
  const mutation = useDeleteEntity(entityType);

  return {
    id: stateId,
    start: (argId?: UUID) => setStateId(argId ?? entityId ?? ``),
    confirm: () => {
      mutation.mutate(stateId ?? ``);
      setStateId(undefined);
    },
    cancel: () => setStateId(undefined),
    state: mutation.status,
  };
}
