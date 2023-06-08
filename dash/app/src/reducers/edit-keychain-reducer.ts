import { v4 as uuid } from 'uuid';
import { produce } from 'immer';
import { convert, newKeyState } from '@dash/keys';
import type { EditKey } from '@dash/keys';
import type { AdminKeychain, Key, KeychainSummary } from '@dash/types';
import { editable } from '../redux/helpers';
import editKeyReducer from '../redux/edit-key-reducer';

type EditKeychainState = {
  // should this be a record?
  keychain?: Editable<KeychainSummary>;
  keys: Key[]; // maybe should put these back together in pairql output...
  editingKey?: EditKey.State;
};

type EditKeychainAction =
  | { type: 'receivedKeychain'; keychain: AdminKeychain }
  | { type: 'beginEditKey'; id: UUID }
  | { type: 'cancelEditKey' }
  | { type: 'createNewKey' }
  | { type: 'updateEditingKey'; event: EditKey.Event }
  | { type: 'updateName'; name: string }
  | { type: 'updateDesc'; description: string };

function reducer(
  state: EditKeychainState,
  action: EditKeychainAction,
): EditKeychainState | undefined {
  // console.log({ action, state: JSON.parse(JSON.stringify(state)) });
  if (!state.keychain) {
    if (action.type === `receivedKeychain`) {
      state.keychain = editable(action.keychain.summary);
      state.keys = action.keychain.keys;
    }
    return;
  }

  switch (action.type) {
    case `receivedKeychain`:
      state.keychain.original = action.keychain.summary;
      state.keys = action.keychain.keys;
      return;

    case `createNewKey`:
      state.editingKey = newKeyState(uuid(), state.keychain.draft.id);
      return;

    case `updateName`:
      state.keychain.draft.name = action.name;
      return;

    case `updateDesc`:
      state.keychain.draft.description = action.description;
      return;

    case `beginEditKey`: {
      const record = state.keys.find((k) => k.id === action.id);
      if (!record) return;
      state.editingKey = convert.toState(record);
      return;
    }

    case `updateEditingKey`:
      if (state.editingKey) {
        editKeyReducer(state.editingKey, action.event);
      }
      return;

    case `cancelEditKey`:
      delete state.editingKey;
      return;
  }
}

export default produce(reducer);
