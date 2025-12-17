// auto-generated, do not edit
import type { UUID } from '../../types';

export namespace Signup {
  export interface Input {
    email: string;
    password: string;
    gclid?: string;
    abTestVariant?: string;
    turnstileToken?: string;
  }

  export interface Output {
    admin?: {
      adminId: UUID;
      token: UUID;
    };
  }
}
