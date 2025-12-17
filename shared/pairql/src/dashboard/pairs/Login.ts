// auto-generated, do not edit
import type { UUID } from '../../types';

export namespace Login {
  export interface Input {
    email: string;
    password: string;
  }

  export interface Output {
    adminId: UUID;
    token: UUID;
  }
}
