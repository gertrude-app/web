import cx from 'classnames';
import React from 'react';

type Props = {
  className?: string;
  size?: `large` | `medium` | `small`;
  type: `green` | `ok` | `warning` | `yellow` | `red` | `error` | `blue` | `info`;
  children: React.ReactNode;
  onClick?: () => void;
};

const Badge: React.FC<Props> = ({ type, className, children, size, onClick }) => {
  let colors = ``;
  switch (type) {
    case `green`:
    case `ok`:
      colors = `bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-300`;
      break;
    case `red`:
    case `error`:
      colors = `bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-300`;
      break;
    case `yellow`:
    case `warning`:
      colors = `bg-yellow-100 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-300`;
      break;
    case `blue`:
    case `info`:
      colors = `bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-300`;
      break;
  }

  return (
    <div
      className={cx(
        `max-w-fit flex justify-center items-center font-medium`,
        onClick && `cursor-pointer hover:scale-105 transition-transform duration-150`,
        {
          'text-xs px-[12px] py-[2px] rounded-md': size === `small`,
          'text-sm px-[14px] py-[2.5px] rounded-lg': size === `medium` || !size,
          'text-base px-6 py-0.5 rounded-[9px]': size === `large`,
        },
        colors,
        className,
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Badge;
