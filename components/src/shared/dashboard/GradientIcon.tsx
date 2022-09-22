import React from 'react';
import cx from 'classnames';

const icons = [
  'comment',
  'google-chrome',
  'location',
  'unlock',
  'calendar',
  'app-store',
  'globe',
  'lightning-bolt',
  'window',
  'pen-to-square',
  'info',
  'list',
  'bug',
  'exclamation-triangle',
  'hamburger',
  'desktop',
  'key',
  'user-plus',
  'user',
  'users',
  'pen',
  'email',
  'text',
  'slack',
  'laptop',
] as const;

export type IconTypes = typeof icons[number];

interface Props {
  className?: string;
  icon: IconTypes;
  size: `small` | `medium` | `large`;
}

const CLASS_MAP: Record<Props['icon'], string> = {
  calendar: `fa-solid fa-calendar-days`,
  comment: `fa-solid fa-comment`,
  location: `fa-solid fa-location scale-110`,
  'app-store': `fa-brands fa-app-store-ios scale-125`,
  'pen-to-square': `fa-solid fa-pen-to-square`,
  'google-chrome': `fa-brands fa-chrome`,
  'lightning-bolt': `fa-solid fa-bolt`,
  unlock: `fa-solid fa-unlock`,
  globe: `fa-solid fa-earth-americas`,
  window: `fa-solid fa-window-maximize`,
  'exclamation-triangle': `fa-solid fa-exclamation-triangle`,
  info: `fa-solid fa-info`,
  bug: `fa-solid fa-bug`,
  list: `fa-solid fa-list`,
  hamburger: `fa-solid fa-hamburger`,
  desktop: `fa-solid fa-desktop translate-y-px`,
  key: `fa-solid fa-key`,
  user: `fa-solid fa-user`,
  'user-plus': `fa-solid fa-user-plus scale-90 translate-x-px`,
  users: `fa-solid fa-users`,
  pen: `fa-solid fa-pen`,
  email: `fa-solid fa-envelope`,
  text: `fa-solid fa-mobile`,
  slack: `fa-brands fa-slack`,
  laptop: `fa-solid fa-laptop`,
};

const GradientIcon: React.FC<Props> = ({ icon, className, size }) => {
  if (size === `small`) {
    return (
      <i
        className={cx(
          `bg-gradient-to-br from-indigo-500 to-fuchsia-500 bg-clip-text [-webkit-background-clip:text;] text-transparent`,
          CLASS_MAP[icon],
          className,
        )}
      />
    );
  } else {
    return (
      <div
        className={cx(
          `mx-auto flex flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 sm:ml-0`,
          size === `large` ? `h-12 w-12` : `h-10 w-10`,
          className,
        )}
      >
        <i
          className={cx(
            `text-white `,
            size === 'large' ? `text-2xl` : `text-lg`,
            CLASS_MAP[icon],
          )}
        />
      </div>
    );
  }
};

export default GradientIcon;
