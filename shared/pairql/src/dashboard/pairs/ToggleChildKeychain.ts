// auto-generated, do not edit
import type { UUID } from '../../types';
import type { SuccessOutput } from '../shared';

export namespace ToggleChildKeychain {
  export interface Input {
    keychainId: UUID;
    childId: UUID;
  }

  export type Output = SuccessOutput;
}
