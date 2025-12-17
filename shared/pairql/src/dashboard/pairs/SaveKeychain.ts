// auto-generated, do not edit
import type { UUID } from '../../types';
import type { SuccessOutput } from '../shared';

export namespace SaveKeychain {
  export interface Input {
    isNew: boolean;
    id: UUID;
    name: string;
    description?: string;
  }

  export type Output = SuccessOutput;
}
