import { relativeTime } from '@dash/datetime';
import { newestFirst, writable } from '@dash/utils';
import React from 'react';
import type { DashboardWidgets } from '@dash/types';
import DashboardWidget from './DashboardWidget';
import WidgetTitle from './WidgetTitle';

type Props = {
  className?: string;
  screenshots: DashboardWidgets.Output[`recentScreenshots`];
};

const UserScreenshotsWidget: React.FC<Props> = ({ className, screenshots }) => (
  <DashboardWidget className={className}>
    <WidgetTitle icon="clock" text="Recent screenshots" />
    <div className="space-y-3 @container">
      {writable(screenshots)
        .sort(newestFirst)
        .map((screenshot) => (
          <div
            key={screenshot.id}
            className="p-2 pl-4 rounded-2xl flex justify-between items-center h-24 sm:h-32 even:bg-slate-50 overflow-hidden"
          >
            <div>
              <h3 className="font-bold">{screenshot.childName}</h3>
              <p className="text-sm text-slate-500 italic">
                {relativeTime(new Date(screenshot.createdAt))}
              </p>
            </div>
            <img
              src={screenshot.url}
              alt="Child screenshot"
              className="block rounded-lg object-cover h-full w-36 @sm:w-52 ml-2"
            />
          </div>
        ))}
    </div>
  </DashboardWidget>
);

export default UserScreenshotsWidget;
