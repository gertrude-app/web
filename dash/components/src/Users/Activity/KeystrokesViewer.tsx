import React from 'react';
import cx from 'classnames';
import { Button } from '@shared/components';
import ActivityItemTime from './ActivityItemTime';

type Props = {
  className?: string;
  strokes: string;
  date: Date;
  onApprove(): unknown;
  application: string;
};

const KeystrokesViewer: React.FC<Props> = ({
  className,
  strokes,
  date,
  application,
  onApprove,
}) => (
  <div
    className={cx(
      `border-y md:border-x2 md:rounded-xl md:shadow-lg md:shadow-slate-300/50 bg-white max-w-7xl`,
      className,
    )}
  >
    <div className="flex justify-between pt-3 px-5 rounded-t-xl">
      <h2 className="text-slate-600 font-medium -ml-0.5">
        Application: <span className="font-bold text-violet-700">{application}</span>
      </h2>
    </div>
    <div className="bg-slate-900 bg-gradient-to-br from-transparent via-transparent to-violet-900/30 text-slate-400 p-6 mt-2 sm:mt-3 mb-4 mx-0 md:mx-4 md:rounded-lg font-mono overflow-x-auto">
      {strokes.split(`\n`).map((line, idx) => (
        <p key={`line-${idx}`}>{line}</p>
      ))}
    </div>
    <div className="p-4 pt-0 flex justify-between items-center">
      <ActivityItemTime date={date} />
      <Button color="tertiary" type="button" onClick={onApprove}>
        Approve
      </Button>
    </div>
  </div>
);

export default KeystrokesViewer;
