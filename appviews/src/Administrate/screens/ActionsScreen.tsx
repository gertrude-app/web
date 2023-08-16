import React, { version } from 'react';
import { Button } from '@shared/components';
import type { AppEvent, Screen } from '../administrate-store';
import type { FilterState } from '../../lib/shared-types';
import cx from 'classnames';
import { PillBadge } from '../../../../dash/components/src';

interface Props {
  filterState: FilterState;
  installedAppVersion: string;
  newestAvailableVersion: {
    version: string;
    required: boolean;
  };
  userName: string;
  releaseChannel: 'stable' | 'beta' | 'canary';
  keystrokeMonitoringEnabled: boolean;
  screenshotMonitoringEnabled: boolean;
  quitting: boolean;
  emit(event: AppEvent): unknown;
}

const ActionsScreen: React.FC<Props> = ({
  filterState,
  installedAppVersion,
  newestAvailableVersion,
  userName,
  keystrokeMonitoringEnabled,
  screenshotMonitoringEnabled,
  emit,
  quitting,
  releaseChannel,
}) => {
  let versionMessage = ``;
  let badgeColor: 'green' | 'yellow' | 'red' = `green`;
  let badgeText = ``;
  if (installedAppVersion === newestAvailableVersion.version) {
    versionMessage = `You're up to date! We'll let you know when the next update is available.`;
    badgeText = `Up to date`;
    badgeColor = `green`;
  } else if (newestAvailableVersion.required) {
    versionMessage = `Please update to Gertrude v${newestAvailableVersion.version} to continue using the app. This is a requred update that contains new fixes and features necessary for your child's safety.`;
    badgeText = `Update required`;
    badgeColor = `red`;
  } else {
    versionMessage = `Gertrude v${newestAvailableVersion.version} is available for download.`;
    badgeText = `Update available`;
    badgeColor = `yellow`;
  }

  return (
    <div className="p-4 h-full flex flex-col justify-between gap-4">
      <div className="flex flex-col gap-4 flex-grow">
        <div className="border border-slate-200 dark:border-slate-800 rounded-2xl shrink-0 flex-grow">
          <div className="p-4">
            <h1 className="font-bold text-xl text-slate-800 dark:text-slate-300">
              Connected to user{' '}
              <span className="text-slate-900 dark:text-white font-extrabold">
                {userName}
              </span>
            </h1>
            <div className="mt-4 mb-2 flex flex-col gap-2 ml-2">
              <div className="flex items-center gap-2">
                <div
                  className={cx(
                    'w-6 h-6 rounded-full flex justify-center items-center',
                    screenshotMonitoringEnabled
                      ? `bg-indigo-100 dark:bg-indigo-500/30 text-indigo-500 dark:text-indigo-400`
                      : `bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600`,
                  )}
                >
                  <i className="fa-solid fas fa-binoculars text-xs" />
                </div>
                <span className="text-sm text-slate-500">
                  Screenshot monitoring{' '}
                  <span
                    className={cx(
                      screenshotMonitoringEnabled
                        ? `text-indigo-500 dark:text-indigo-400`
                        : `text-slate-500 dark:text-slate-400`,
                      `font-bold`,
                    )}
                  >
                    {screenshotMonitoringEnabled ? `enabled` : `disabled`}
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={cx(
                    'w-6 h-6 rounded-full flex justify-center items-center',
                    keystrokeMonitoringEnabled
                      ? `bg-indigo-100 dark:bg-indigo-500/30 text-indigo-500 dark:text-indigo-400`
                      : `bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600`,
                  )}
                >
                  <i className="fa-solid fas fa-keyboard text-xs" />
                </div>
                <span className="text-sm text-slate-500">
                  Keystroke monitoring{' '}
                  <span
                    className={cx(
                      keystrokeMonitoringEnabled
                        ? `text-indigo-500 dark:text-indigo-400`
                        : `text-slate-500 dark:text-slate-400`,
                      `font-bold`,
                    )}
                  >
                    {keystrokeMonitoringEnabled ? `enabled` : `disabled`}
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-end p-4 bg-slate-50 dark:bg-slate-800/50 rounded-b-2xl">
            <Button
              type="button"
              size="small"
              onClick={() => emit({ case: `reconnectUserClicked` })}
              color="tertiary"
            >
              Connect to a different user
            </Button>
          </div>
        </div>
        <div className="border border-slate-200 dark:border-slate-800 rounded-2xl flex-grow relative flex flex-col justify-between">
          <div className="p-4">
            <PillBadge type={badgeColor} className="absolute right-2 top-2">
              {badgeText}
            </PillBadge>
            <h2 className="text-lg font-semibold text-slate-600 dark:text-slate-300">
              Currently running Gertrude{' '}
              <span className="font-bold text-slate-900 dark:text-white">
                v{installedAppVersion}
              </span>{' '}
              and updating to{' '}
              <span className="font-bold text-slate-900 dark:text-white">beta</span>{' '}
              releases.
            </h2>
            <p className="text-slate-500 mt-2">{versionMessage}</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-b-2xl flex justify-end">
            <Button
              type="button"
              size="small"
              onClick={() => emit({ case: `checkForAppUpdatesClicked` })}
              color="tertiary"
            >
              Check for updates
            </Button>
          </div>
        </div>
      </div>
      <div className="border border-red-200/70 dark:border-red-500/20 rounded-2xl bg-red-50/20 dark:bg-red-500/5">
        <div className="p-4">
          <h2 className="text-xl font-bold text-red-700 dark:text-red-400">
            Danger zone
          </h2>
          <p className="text-sm mt-2 text-red-700/80 dark:text-red-500/70">
            Actions in this zone either stop all internet filtering or all screenshot and
            keystroke monitoring, and should only be done for troubleshooting purposes.
          </p>
        </div>
        <div className="flex justify-end gap-4 bg-red-50/30 dark:bg-red-500/5 rounded-b-2xl p-4">
          {filterState.case !== `off` && (
            <Button
              type="button"
              onClick={() => emit({ case: `stopFilterClicked` })}
              color="warning"
            >
              Stop filter
            </Button>
          )}
          <Button
            type="button"
            onClick={() => emit({ case: `quitAppClicked` })}
            color="warning"
          >
            Quit app
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActionsScreen;
