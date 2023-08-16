import React from 'react';
import cx from 'classnames';
import type { AppEvent, AppState, ViewState, ViewAction } from './administrate-store';
import type { PropsOf } from '../lib/store';
import { valueOf } from '../lib/failable';
import { containerize } from '../lib/store';
import InactiveAccountScreen from '../components/InactiveAccountBlock';
import AccountPastDueBanner from '../components/AccountPastDueBanner';
import SidebarNav from './subcomponents/SidebarNav';
import ActionsScreen from './screens/ActionsScreen';
import HealthCheckScreen from './screens/HealthCheckScreen';
import ExemptUsersScreen from './screens/ExemptUsersScreen';
import HiddenAdvancedScreen from './screens/HiddenAdvancedScreen';
import HealthChecker from './HealthChecker';
import store from './administrate-store';

type Props = PropsOf<AppState, ViewState, AppEvent, ViewAction>;

export const Administrate: React.FC<Props> = ({
  healthCheck,
  filterState,
  userName,
  screenshotMonitoringEnabled,
  keystrokeMonitoringEnabled,
  installedAppVersion,
  releaseChannel,
  exemptableUsers,
  emit,
  screen,
  advanced,
  quitting,
}) => {
  const health = new HealthChecker(
    healthCheck,
    installedAppVersion,
    screenshotMonitoringEnabled,
    keystrokeMonitoringEnabled,
  );

  let pageElement: JSX.Element;

  switch (screen) {
    case `healthCheck`:
      pageElement = (
        <HealthCheckScreen
          {...healthCheck}
          installedAppVersion={installedAppVersion}
          screenshotMonitoringEnabled={keystrokeMonitoringEnabled}
          keystrokeMonitoringEnabled={screenshotMonitoringEnabled}
          emit={(action) => emit({ case: `healthCheck`, action })}
        />
      );
      break;
    case `actions`:
      pageElement = (
        <ActionsScreen
          releaseChannel={releaseChannel}
          emit={emit}
          filterState={filterState}
          installedAppVersion={installedAppVersion}
          newestAvailableVersion={{ version: `2.0.1`, required: false }} // TODO
          userName={userName}
          keystrokeMonitoringEnabled={keystrokeMonitoringEnabled}
          screenshotMonitoringEnabled={screenshotMonitoringEnabled}
          quitting={quitting}
        />
      );
      break;
    case `exemptUsers`:
      pageElement = <ExemptUsersScreen emit={emit} users={exemptableUsers} />;
      break;

    case `advanced`:
      pageElement = advanced ? (
        <HiddenAdvancedScreen
          {...advanced}
          emit={(action) => emit({ case: `advanced`, action })}
        />
      ) : (
        <>Loading...</>
      );
      break;
  }

  if (valueOf(healthCheck.accountStatus) === `inactive`) {
    return (
      <InactiveAccountScreen
        onRecheck={() => emit({ case: `inactiveAccountRecheckClicked` })}
        onDisconnect={() => emit({ case: `inactiveAccountDisconnectAppClicked` })}
      />
    );
  }

  return (
    <div className="flex flex-col h-screen">
      {valueOf(healthCheck.accountStatus) === `needsAttention` && (
        <AccountPastDueBanner className="fixed top-0 w-screen z-20" />
      )}
      <div
        className={cx(
          'flex flex-grow relative',
          valueOf(healthCheck.accountStatus) === `needsAttention` && `mt-[79px]`,
        )}
      >
        <SidebarNav
          accountPastDue={valueOf(healthCheck.accountStatus) === `needsAttention`}
          screen={screen}
          setScreen={(screen) => emit({ case: `gotoScreenClicked`, screen })}
        />
        <main className="flex-grow bg-white dark:bg-slate-900 ml-16 height-[calc(100vh-80px)]">
          {pageElement}
        </main>
      </div>
    </div>
  );
};

export default containerize<AppState, AppEvent, ViewState, ViewAction>(
  store,
  Administrate,
);
