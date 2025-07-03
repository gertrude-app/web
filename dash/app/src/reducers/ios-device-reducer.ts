import { produce } from 'immer';
import type { GetIOSDevice } from '@dash/types';

export type WebPolicy =
  | `allowAll`
  | `blockAdult`
  | `blockAdultAnd`
  | `blockAllExcept`
  | `blockAll`;

export type State = {
  enabledBlockGroups: UUID[];
  webPolicyDomains: string[];
  webPolicy: string; // need type safety here
  newDomain: string;
};

export type Action =
  | { type: `toggleBlockGroup`; id: UUID }
  | { type: `setWebPolicy`; policy: WebPolicy }
  | { type: `setNewDomain`; value: string }
  | { type: `addDomain` }
  | { type: `removeDomain`; domain: string }
  | { type: `receiveData`; data: GetIOSDevice.Output };

function reducer(state: State, action: Action): void {
  switch (action.type) {
    case `toggleBlockGroup`: {
      const idx = state.enabledBlockGroups.indexOf(action.id);
      if (idx === -1) {
        state.enabledBlockGroups.push(action.id);
      } else {
        state.enabledBlockGroups.splice(idx, 1);
      }
      return;
    }
    case `setWebPolicy`:
      state.webPolicy = action.policy;
      return;
    case `setNewDomain`:
      state.newDomain = action.value;
      return;
    case `addDomain`: {
      const domain = state.newDomain.trim();
      if (domain && !state.webPolicyDomains.includes(domain)) {
        state.webPolicyDomains.push(domain);
        state.newDomain = ``;
      }
      return;
    }
    case `removeDomain`:
      state.webPolicyDomains = state.webPolicyDomains.filter((d) => d !== action.domain);
      return;
    case `receiveData`:
      state.enabledBlockGroups = action.data.enabledBlockGroups;
      state.webPolicy = action.data.webPolicy;
      state.webPolicyDomains = action.data.webPolicyDomains;
      return;
  }
}

export default produce(reducer);
