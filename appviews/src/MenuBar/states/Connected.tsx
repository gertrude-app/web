import React from 'react';
import cx from 'classnames';
import type { AppEvent } from '../menubar-store';
import type { FilterState } from '../../lib/shared-types';
import { MenuBarSized } from '../MenuBar';
interface Props {
  emit(event: AppEvent): unknown;
  filterState: FilterState;
  recordingScreen: boolean;
  recordingKeystrokes: boolean;
  adminAttentionRequired: boolean;
}

const Connected: React.FC<Props> = ({
  emit,
  filterState,
  recordingKeystrokes,
  recordingScreen,
  adminAttentionRequired,
}) => (
  <MenuBarSized className="p-3 select-none flex flex-col relative">
    <div
      className={cx(`w-[800px] h-80 absolute -left-[400px] -top-40`, {
        '[background:radial-gradient(#4ade8050_0%,transparent_70%)] dark:[background:radial-gradient(#22c55e40_0%,transparent_70%)]':
          filterState.case === `on`,
        '[background:radial-gradient(#f8717150_0%,transparent_70%)] dark:[background:radial-gradient(#ef444440_0%,transparent_70%)]':
          filterState.case === `off`,
        '[background:radial-gradient(#facc1550_0%,transparent_70%)] dark:[background:radial-gradient(#eab30840_0%,transparent_70%)]':
          filterState.case === `suspended`,
      })}
    />
    <div className="relative">
      <div className="flex justify-between items-center">
        <span
          className={cx(`px-2 py-1 rounded-lg font-medium`, {
            'bg-green-400/50 text-green-950 dark:text-green-50':
              filterState.case === `on`,
            'bg-red-400/50 text-red-950 dark:text-red-50': filterState.case === `off`,
            'bg-yellow-400/50 text-yellow-950 dark:text-yellow-50':
              filterState.case === `suspended`,
          })}
        >
          Filter {filterState.case}
        </span>
        {filterState.case === `off` && (
          <MenuBarButton onClick={() => emit({ case: `turnOnFilterClicked` })}>
            Turn on
          </MenuBarButton>
        )}
        {filterState.case === `suspended` && (
          <MenuBarButton onClick={() => emit({ case: `resumeFilterClicked` })}>
            Resume
          </MenuBarButton>
        )}
      </div>
      {filterState.case === `suspended` && (
        <p className="mt-1 text-sm text-black/60 dark:text-white/80">
          Resuming {filterState.resuming}
        </p>
      )}
    </div>
    <div className="flex mt-3 space-x-3 relative">
      <button
        onClick={() => emit({ case: `viewNetworkTrafficClicked` })}
        disabled={filterState.case === `off`}
        className={cx(
          `flex-grow px-4 py-3 space-x-5 w-1/2 flex justify-start items-center flex-row bg-gradient-to-b from-white dark:from-black/50 to-white/20 dark:to-black dark:border-t dark:border-white/40 rounded-xl shadow dark:shadow-black/50 text-black/80 cursor-default hover:scale-[102%] active:scale-[98%] active:shadow hover:shadow-md transition-[transform,box-shadow] duration-100`,
        )}
      >
        <i className="fa fa-tower-broadcast text-xl w-6 shrink-0 text-black/70 dark:text-white/80" />
        <p className="text-sm font-medium text-left dark:text-white leading-tight">
          View network requests
        </p>
      </button>
      <button
        onClick={() => emit({ case: `suspendFilterClicked` })}
        disabled={filterState.case === `off`}
        className={cx(
          `flex-grow px-4 py-3 space-x-5 w-1/2 flex justify-start items-center flex-row bg-gradient-to-b from-white dark:from-black/50 to-white/20 dark:to-black dark:border-t dark:border-white/40 rounded-xl shadow dark:shadow-black/50 text-black/80 cursor-default hover:scale-[102%] active:scale-[98%] active:shadow hover:shadow-md transition-[transform,box-shadow] duration-100`,
        )}
      >
        <i className="fa fa-clock-rotate-left text-xl shrink-0 text-black/70 dark:text-white/80" />
        <p className="text-sm font-medium text-left leading-5 dark:text-white">
          Suspend filter
        </p>
      </button>
    </div>
    <div className="mt-3 flex flex-col space-y-3 bg-white/20 dark:bg-black/20 p-3 rounded-xl">
      <div className="flex items-center space-x-3">
        <div
          className={cx(
            `w-7 h-7 rounded-full flex items-center justify-center text-white dark:shadow-black/30`,
            recordingScreen
              ? `bg-violet-500 dark:bg-violet-200 dark:text-violet-700 shadow-md`
              : `bg-black/10 dark:bg-white/10`,
          )}
        >
          <i className="fa-solid fa-binoculars text-sm" />
        </div>
        <span
          className={cx(
            `font-medium`,
            recordingScreen
              ? `bg-gradient-to-r from-violet-700 dark:from-violet-300 to-black/70 dark:to-white/70 bg-clip-text text-transparent`
              : `text-black/40 dark:text-white/40`,
          )}
        >
          {recordingScreen ? `Screen is being recorded` : `Screen is not being recorded`}
        </span>
      </div>
      <div className="flex items-center space-x-3">
        <div
          className={cx(
            `w-7 h-7 rounded-full flex items-center justify-center text-white dark:shadow-black/30`,
            recordingKeystrokes
              ? `bg-violet-500 dark:bg-violet-200 dark:text-violet-700 shadow-md`
              : `bg-black/10 dark:bg-white/10`,
          )}
        >
          <i className="fa-solid fa-keyboard text-sm" />
        </div>
        <span
          className={cx(
            `font-medium`,
            recordingKeystrokes
              ? `bg-gradient-to-r from-violet-700 dark:from-violet-300 to-black/70 dark:to-white/70 bg-clip-text text-transparent`
              : `text-black/40 dark:text-white/40`,
          )}
        >
          {recordingKeystrokes
            ? `Keystrokes are being recorded`
            : `Keystrokes are not being recorded`}
        </span>
      </div>
    </div>
    <div className="flex-grow flex justify-end items-end space-x-2">
      <button
        onClick={() => emit({ case: `refreshRulesClicked` })}
        className="group bg-gradient-to-b from-white dark:from-black/50 to-white/70 dark:to-black w-8 h-8 rounded-xl flex items-center justify-end px-[7px] group transition-[background-color,transform] active:bg-white/60 duration-100 shadow active:scale-95 cursor-default dark:text-white dark:shadow-black/50 dark:border-t dark:border-white/40"
      >
        <i className="fa fa-arrows-rotate transition-transform duration-200 group-hover:scale-110 -translate-x-[1px]" />
      </button>
      <button
        onClick={() => emit({ case: `administrateClicked` })}
        className="group bg-gradient-to-b from-white dark:from-black/50 to-white/70 dark:to-black w-8 h-8 rounded-xl flex items-center justify-end px-[7px] group transition-[background-color,transform] active:bg-white/60 duration-100 shadow active:scale-95 cursor-default dark:text-white dark:shadow-black/50 dark:border-t dark:border-white/40 relative"
      >
        {adminAttentionRequired && (
          <>
            <div className="w-2.5 h-2.5 rounded-full bg-red-500 absolute -top-0.5 -right-0.5 dark:bg-red-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-red-500 absolute -top-0.5 -right-0.5 animate-ping dark:bg-red-400" />
          </>
        )}
        <i className="fa fa-cog transition-transform duration-200 group-hover:scale-110 -translate-x-[1px]" />
      </button>
    </div>
  </MenuBarSized>
);

export default Connected;

interface MenuBarButtonProps {
  onClick(): void;
  children: React.ReactNode;
}

const MenuBarButton: React.FC<MenuBarButtonProps> = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="bg-gradient-to-b from-violet-400 dark:from-violet-500 to-violet-500 dark:to-violet-700 px-2 py-1 rounded-lg text-white font-medium shadow border-t border-white/40 hover:scale-105 hover:shadow-md transition-[transform,box-shadow] duration-100 cursor-default active:scale-95"
  >
    {children}
  </button>
);
