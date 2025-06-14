import cx from 'classnames';
import React from 'react';

interface Props {
  children: React.ReactNode;
  heading: string;
  type: `info` | `warning`;
  className?: string;
}

const Callout: React.FC<Props> = ({ children, heading, type, className }) => (
  <div
    className={cx(
      `border border-slate-200 p-6 pt-5 pl-8 rounded-2xl relative max-w-2xl`,
      className,
    )}
  >
    <div className="absolute -left-6 top-[50%] -translate-y-[50%] w-12 h-12 rounded-full bg-slate-50 flex justify-center items-center">
      <i
        className={cx(
          `fa-solid text-3xl`,
          type === `info`
            ? `fa-circle-info text-fuchsia-400`
            : `fa-circle-exclamation text-pink-400`,
        )}
      />
    </div>
    <h3 className="text-lg font-semibold text-slate-700">{heading}</h3>
    <div className="text-slate-500 mt-2">{children}</div>
  </div>
);

export default Callout;
