import type { ActionOf } from '../lib/store';
import { Store } from '../lib/store';

export type RequestState<T = void, E = string> =
  | { case: 'idle' }
  | { case: 'ongoing' }
  | { case: 'failed'; error?: E }
  | { case: 'succeeded'; payload: T };

// begin codegen
export type OnboardingStep =
  | 'welcome'
  | 'wrongInstallDir'
  | 'confirmGertrudeAccount'
  | 'noGertrudeAccount'
  | 'macosUserAccountType'
  | 'getChildConnectionCode'
  | 'connectChild'
  | 'howToUseGifs'
  | 'allowNotifications_start'
  | 'allowNotifications_grant'
  | 'allowNotifications_failed'
  | 'allowScreenshots_required'
  | 'allowScreenshots_grantAndRestart'
  | 'allowScreenshots_failed'
  | 'allowScreenshots_success'
  | 'screenshotsPrivacyWarning'
  | 'allowKeylogging_required'
  | 'allowKeylogging_grant'
  | 'allowKeylogging_failed'
  | 'installSysExt_explain'
  | 'installSysExt_trick'
  | 'installSysExt_allow'
  | 'installSysExt_failed'
  | 'installSysExt_success'
  | 'exemptUsers'
  | 'locateMenuBarIcon'
  | 'viewHealthCheck'
  | 'howToUseGertrude'
  | 'finish';

export interface MacOSVersion {
  name: 'catalina' | 'bigSur' | 'monterey' | 'ventura' | 'sonoma' | 'sequoia';
  major: number;
}

export type UserRemediationStep = 'create' | 'switch' | 'demote' | 'choose';

export interface MacOSUser {
  id: number;
  name: string;
  isAdmin: boolean;
}

export interface AppState {
  osVersion: {
    name: 'catalina' | 'bigSur' | 'monterey' | 'ventura' | 'sonoma' | 'sequoia';
    major: number;
  };
  windowOpen: boolean;
  step: OnboardingStep;
  userRemediationStep?: UserRemediationStep;
  currentUser?: MacOSUser;
  connectChildRequest: RequestState<string>;
  users: MacOSUser[];
  exemptableUserIds: number[];
  exemptUserIds: number[];
}

export type AppEvent =
  | { case: 'connectChildSubmitted'; code: number }
  | { case: 'infoModalOpened'; step: OnboardingStep; detail?: string }
  | { case: 'setUserExemption'; userId: number; enabled: boolean }
  | { case: 'closeWindow' }
  | { case: 'primaryBtnClicked' }
  | { case: 'secondaryBtnClicked' }
  | { case: 'chooseSwitchToNonAdminUserClicked' }
  | { case: 'chooseCreateNonAdminClicked' }
  | { case: 'chooseDemoteAdminClicked' };
// end codegen

export type ViewState = {
  connectionCode: string;
  receivedAppState: boolean;
  didResume: boolean;
};
export type ViewAction = { type: 'connectionCodeUpdated'; code: string };

export type Action = ActionOf<AppState, AppEvent, ViewAction>;
export type State = AppState & ViewState;

export class OnboardingStore extends Store<AppState, AppEvent, ViewState, ViewAction> {
  initializer(): AppState & ViewState {
    return {
      windowOpen: false,
      osVersion: { name: `sequoia`, major: 15 },
      step: `welcome`,
      connectChildRequest: { case: `idle` },
      currentUser: { id: 502, name: ``, isAdmin: false },
      users: [],
      exemptableUserIds: [],
      exemptUserIds: [],
      connectionCode: ``,
      receivedAppState: false,
      didResume: false,
    };
  }

  reducer(
    state: AppState & ViewState,
    action: ActionOf<AppState, AppEvent, ViewAction>,
  ): AppState & ViewState {
    switch (action.type) {
      case `connectionCodeUpdated`:
        return { ...state, connectionCode: action.code };
      case `receivedUpdatedAppState`:
        return {
          ...state,
          ...action.appState,
          didResume:
            state.receivedAppState === false && action.appState.step !== `welcome`,
          receivedAppState: true,
        };
      case `appEventEmitted`:
        switch (action.event.case) {
          case `connectChildSubmitted`:
            return { ...state, connectionCode: `` };
          default:
            return state;
        }
      default:
        return state;
    }
  }
}

export default new OnboardingStore();
