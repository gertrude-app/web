import React from 'react';
import cx from 'classnames';
import { Button, Loading, TextInput, Toggle } from '@shared/components';
import type { AppState, ViewState, AppEvent, ViewAction } from './blockedrequests-store';
import type { PropsOf } from '../lib/store';
import type { AccountStatus } from '../Administrate/HealthChecker';
import { containerize } from '../lib/store';
import ErrorBlock from '../ErrorBlock';
import WarningBanner from '../components/WarningBanner';
import InactiveAccountScreen from '../components/InactiveAccountBlock';
import BlockedRequest from './BlockedRequest';
import store from './blockedrequests-store';

type Props = PropsOf<AppState, ViewState, AppEvent, ViewAction>;

export const BlockedRequests: React.FC<Props> = ({
  requests,
  filterText,
  tcpOnly,
  emit,
  dispatch,
  unlockRequestExplanation,
  createUnlockRequests,
  selectedRequestIds,
}) => {
  // TODO: extract and test
  const filteredRequests = requests
    .filter((req) => {
      if (filterText.trim() === ``) return true;
      const query = filterText.toLowerCase();
      const textToSearch = req.searchableText.toLowerCase();
      if (!query.includes(` `)) {
        return textToSearch.includes(query);
      } else {
        for (const part in query.split(/\s+/g)) {
          if (textToSearch.includes(part)) return true;
        }
      }
      return false;
    })
    .filter((req) => (tcpOnly ? req.protocol === `tcp` : true))
    .sort((a, b) => (b.time > a.time ? 1 : -1));

  // @jaredh159 - change this to see the different states
  const accountStatus: AccountStatus = `needsAttention`;

  // @TODO ~ all these ts-ignores can be removed once the real state is hooked up
  // @ts-ignore
  if (accountStatus === `inactive`) {
    return <InactiveAccountScreen />;
  }

  return (
    <div className="bg-white dark:bg-slate-900 flex flex-col rounded-b-xl h-full appview:h-screen">
      {/* @ts-ignore */}
      {(accountStatus === `error` || accountStatus === `needsAttention`) && (
        <div className="border-b border-slate-200 dark:border-slate-800 p-4 dark:bg-slate-900 bg-white">
          <WarningBanner
            // @ts-ignore
            severity={accountStatus === `needsAttention` ? `warning` : `error`}
          >
            {/* @ts-ignore */}
            {accountStatus === `needsAttention`
              ? `Your Gertrude account payment is past due! Login to the web admin dashboard before app loses functionality.`
              : `We've encountered an unknown account error. Please try restarting the app.`}
          </WarningBanner>
        </div>
      )}
      <header className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center">
          <input
            className="bg-slate-50 dark:bg-slate-800/50 dark:focus:bg-slate-800 rounded-xl px-4 py-2 w-80 transition duration-100 focus:bg-slate-50 focus:shadow-md outline-none border-[0.5px] dark:border-slate-700 placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500"
            placeholder="Filter..."
            value={filterText}
            onChange={(e) => emit({ case: `filterTextUpdated`, text: e.target.value })}
          />
          <button
            className={cx(
              `border border-slate-200 dark:border-slate-700 w-7 h-7 rounded-full mx-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition duration-100 flex justify-center items-center`,
              filterText
                ? `opacity-100 translate-y-0 cursor-pointer`
                : `opacity-0 translate-y-1 cursor-default`,
            )}
            onClick={() => emit({ case: `filterTextUpdated`, text: `` })}
          >
            <i className="fa-solid fa-times text-slate-500 text-sm" />
          </button>
        </div>
        <div className="flex items-center space-x-6 grow">
          <div className="flex items-center space-x-2">
            <Toggle
              enabled={tcpOnly}
              setEnabled={() => emit({ case: `tcpOnlyToggled` })}
              small
            />
            <span className="text-slate-700 dark:text-slate-300 font-medium">
              TCP only
            </span>
          </div>
        </div>
        <Button
          color="tertiary"
          size="small"
          type="button"
          onClick={() => emit({ case: `clearRequestsClicked` })}
        >
          <i className="fa-solid fa-ban mr-2 text-red-400" />
          Clear requests
        </Button>
      </header>
      <div className="flex flex-col p-4 flex-grow overflow-y-scroll">
        {requests.length === 0 && (
          <div className="h-full flex justify-center items-center">
            <div className="flex flex-col items-center">
              <Loading />
              <h3 className="text-xl font-medium text-slate-400 dark:text-slate-500 mt-8">
                Waiting for requests...
              </h3>
            </div>
          </div>
        )}
        {requests.length > 0 && filteredRequests.length === 0 && (
          <div className="h-full flex flex-col justify-center items-center border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-black/20">
            <i className="fa-solid fa-cow text-6xl text-slate-300 dark:text-slate-700" />
            <h3 className="text-2xl font-bold mt-6 dark:text-white/80">
              No matching requests
            </h3>
            <p className="max-w-sm text-center mt-2 text-slate-500 dark:text-slate-400">
              Try changing the filter query or toggling TCP only
            </p>
          </div>
        )}
        {filteredRequests.length > 0 &&
          filteredRequests.map((req) => (
            <BlockedRequest
              key={req.id}
              time={req.time}
              protocol={req.protocol}
              target={req.target}
              app={req.app}
              selected={selectedRequestIds.includes(req.id)}
              onSelectToggle={() => emit({ case: `toggleRequestSelected`, id: req.id })}
            />
          ))}
      </div>
      <BottomPanel
        emit={emit}
        dispatch={dispatch}
        unlockRequestExplanation={unlockRequestExplanation}
        selectedRequestIds={selectedRequestIds}
        createUnlockRequests={createUnlockRequests}
      />
    </div>
  );
};

type PanelProps = Omit<Props, 'requests' | 'filterText' | 'tcpOnly' | 'windowOpen'>;

const BottomPanel: React.FC<PanelProps> = ({
  unlockRequestExplanation,
  dispatch,
  selectedRequestIds,
  createUnlockRequests,
  emit,
}) => {
  if (selectedRequestIds.length === 0 && createUnlockRequests.case === `idle`) {
    return null;
  }
  if (createUnlockRequests.case === `ongoing`) {
    return (
      <BottomPanelWrap className="flex flex-col justify-center items-center h-32">
        <Loading className="scale-50" />
        <span className="text-slate-400 dark:text-slate-500 text-sm">Submitting...</span>
      </BottomPanelWrap>
    );
  }
  if (createUnlockRequests.case === `succeeded`) {
    return (
      <BottomPanelWrap className="flex justify-between items-center h-20">
        <span className="text-lg text-slate-500 dark:text-slate-400 font-medium ml-2 flex items-center">
          <i className="fa-solid fa-check mr-3 text-green-500" />
          Unlock request sent!
        </span>
        <Button type="button" onClick={() => {}} color="secondary" size="medium">
          Close window
        </Button>
      </BottomPanelWrap>
    );
  }
  if (createUnlockRequests.case === `failed`) {
    return (
      <BottomPanelWrap className="flex h-44">
        <ErrorBlock
          title="Failed to send unlock request:"
          message={createUnlockRequests.error}
          buttonText="Try Again"
          buttonIcon="fa-redo"
          buttonAction={() => emit({ case: `requestFailedTryAgainClicked` })}
        />
      </BottomPanelWrap>
    );
  }
  return (
    <BottomPanelWrap className="justify-between h-32">
      <TextInput
        type="textarea"
        value={unlockRequestExplanation}
        setValue={(value) => dispatch({ type: `explanationUpdated`, text: value })}
        rows={3}
        className="w-96"
        placeholder="Explanation..."
        noResize
      />
      <div className="flex flex-col justify-end items-end">
        <span className="text-slate-600 dark:text-slate-400 font-medium mb-3">
          {selectedRequestIds.length} addresses selected
        </span>
        <Button
          color="secondary"
          type="button"
          onClick={() =>
            emit({
              case: `unlockRequestSubmitted`,
              comment:
                unlockRequestExplanation.trim() === ``
                  ? undefined
                  : unlockRequestExplanation,
            })
          }
        >
          Send unlock request
          <i className="fa-solid fa-arrow-right ml-2" />
        </Button>
      </div>
    </BottomPanelWrap>
  );
};

const BottomPanelWrap: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children,
}) => (
  <div className="border-b border-slate-200 dark:border-slate-800 shadow-lg shadow-black/5 dark:shadow-black/50 rotate-180 [transition:200ms]">
    <div className={cx(`rotate-180 p-4 flex`, className)}>{children}</div>
  </div>
);

export default containerize<AppState, AppEvent, ViewState, ViewAction>(
  store,
  BlockedRequests,
);