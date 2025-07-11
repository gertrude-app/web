import React from 'react';
import type { AppEvent, AppState, ViewAction, ViewState } from './onboarding-store';
import type { PropsOf } from '../lib/store';
import { containerize } from '../lib/store';
import OnboardingContext from './OnboardingContext';
import StepSwitcher, { OnboardingPage } from './StepSwitcher';
import * as Step from './Steps';
import store from './onboarding-store';

type Props = PropsOf<AppState, ViewState, AppEvent, ViewAction>;

export const Onboarding: React.FC<Props> = ({
  emit,
  dispatch,
  windowOpen,
  connectionCode,
  step,
  connectChildRequest,
  currentUser,
  userRemediationStep,
  users,
  receivedAppState,
  didResume,
  exemptableUserIds,
  exemptUserIds,
  osVersion,
  isUpgrade,
}) => {
  // during testing, i was able to hear videos playing after
  // window was closed, showing that the dom was still in memory
  // somewhere after close, so explicitly return null if window is not
  // open, to ensure all memory is cleaned up and we're not re-rendering
  if (!windowOpen) return null;
  return (
    <OnboardingContext.Provider
      value={{
        osVersion,
        currentStep: step,
        systemSettingsName:
          osVersion.major < 13 ? `System Preferences` : `System Settings`,
        isUpgrade,
        emit,
        dispatch,
        otherUsers: users.filter((user) => user.id !== currentUser?.id),
      }}
    >
      <StepSwitcher ready={receivedAppState}>
        <OnboardingPage step="welcome" component={<Step.Welcome />} />
        <OnboardingPage
          step="wrongInstallDir"
          component={<Step.AppNotInApplicationsDir />}
        />
        <OnboardingPage
          step="confirmGertrudeAccount"
          component={<Step.ConfirmGertrudeAccount />}
        />
        <OnboardingPage step="noGertrudeAccount" component={<Step.NoGertrudeAccount />} />
        <OnboardingPage
          step="macosUserAccountType"
          component={
            <Step.MacosUserAccountType
              current={currentUser}
              users={users}
              remediationStep={userRemediationStep}
            />
          }
          confetti={didResume && currentUser?.isAdmin === false}
        />
        <OnboardingPage
          step="getChildConnectionCode"
          component={<Step.GetConnectionCode />}
        />
        <OnboardingPage
          step="connectChild"
          component={
            <Step.ConnectChild
              connectionCode={connectionCode}
              request={connectChildRequest}
            />
          }
          confetti={connectChildRequest.case === `succeeded`}
          confettiDeps={[connectChildRequest.case]}
        />
        <OnboardingPage step="howToUseGifs" component={<Step.HowToUseGifs />} />
        <OnboardingPage
          step="allowNotifications_start"
          component={<Step.AllowNotifications step="allowNotifications_start" />}
        />
        <OnboardingPage
          step="allowNotifications_grant"
          component={<Step.AllowNotifications step="allowNotifications_grant" />}
        />
        <OnboardingPage
          step="allowNotifications_failed"
          component={<Step.AllowNotifications step="allowNotifications_failed" />}
        />
        <OnboardingPage
          step="allowFullDiskAccess_grantAndRestart"
          component={
            <Step.AllowFullDiskAccess step="allowFullDiskAccess_grantAndRestart" />
          }
        />
        <OnboardingPage
          step="allowFullDiskAccess_success"
          component={<Step.AllowFullDiskAccess step="allowFullDiskAccess_success" />}
          confetti
        />
        <OnboardingPage
          step="allowFullDiskAccess_failed"
          component={<Step.AllowFullDiskAccess step="allowFullDiskAccess_failed" />}
        />
        <OnboardingPage
          step="allowScreenshots_required"
          component={<Step.AllowScreenshots step="allowScreenshots_required" />}
        />
        <OnboardingPage
          step="allowScreenshots_grantAndRestart"
          component={<Step.AllowScreenshots step="allowScreenshots_grantAndRestart" />}
        />
        <OnboardingPage
          step="allowScreenshots_success"
          component={<Step.AllowScreenshots step="allowScreenshots_success" />}
          confetti
        />
        <OnboardingPage
          step="allowScreenshots_failed"
          component={<Step.AllowScreenshots step="allowScreenshots_failed" />}
        />
        <OnboardingPage
          step="allowKeylogging_required"
          component={<Step.AllowKeylogging step="allowKeylogging_required" />}
        />
        <OnboardingPage
          step="allowKeylogging_grant"
          component={<Step.AllowKeylogging step="allowKeylogging_grant" />}
        />
        <OnboardingPage
          step="allowKeylogging_failed"
          component={<Step.AllowKeylogging step="allowKeylogging_failed" />}
        />
        <OnboardingPage
          step="installSysExt_explain"
          component={<Step.InstallSysExt step="installSysExt_explain" />}
        />
        <OnboardingPage
          step="installSysExt_trick"
          component={<Step.InstallSysExt step="installSysExt_trick" />}
        />
        <OnboardingPage
          step="installSysExt_allow"
          component={<Step.InstallSysExt step="installSysExt_allow" />}
        />
        <OnboardingPage
          step="installSysExt_failed"
          component={<Step.InstallSysExt step="installSysExt_failed" />}
        />
        <OnboardingPage
          step="installSysExt_success"
          component={<Step.InstallSysExt step="installSysExt_success" />}
          confetti
        />
        <OnboardingPage
          step="exemptUsers"
          component={
            <Step.ExemptUsers
              exemptableUserIds={exemptableUserIds}
              exemptUserIds={exemptUserIds}
            />
          }
        />
        <OnboardingPage step="locateMenuBarIcon" component={<Step.LocateMenuBarIcon />} />
        <OnboardingPage step="viewHealthCheck" component={<Step.ViewHealthCheck />} />
        <OnboardingPage
          step="encourageFilterSuspensions"
          component={<Step.EncourageFilterSuspensions />}
        />
        <OnboardingPage step="howToUseGertrude" component={<Step.HowToUseGertrude />} />
        <OnboardingPage step="finish" component={<Step.Finish />} />
      </StepSwitcher>
    </OnboardingContext.Provider>
  );
};

export default containerize<AppState, AppEvent, ViewState, ViewAction>(store, Onboarding);
