import { State } from '../store';
import { initialState as authInitialState } from '../slice-auth';
import { initialState as usersInitialState } from '../slice-users';
import { initialState as menuInitialState } from '../slice-menu';
import { initialState as waitlistInitialState } from '../slice-waitlist';

export function makeState(mutator: (state: State) => unknown = () => {}): State {
  const state: State = {
    auth: authInitialState(),
    menu: menuInitialState(),
    waitlist: waitlistInitialState(),
    users: usersInitialState(),
  };
  mutator(state);
  return state;
}

export function makeGetState(mutator: (state: State) => unknown = () => {}): () => State {
  return () => makeState(mutator);
}