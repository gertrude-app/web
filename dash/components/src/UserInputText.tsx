import cx from 'classnames';
import React from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
  small?: boolean;
}

const UserInputText: React.FC<Props> = ({ children, small, className }) => (
  <span
    className={cx(
      `inline-block ml-px leading-snug -translate-y-px font-mono bg-fuchsia-100 text-fuchsia-800 rounded-lg text-base font-bold`,
      small ? `py-[1px] px-1.5` : `py-[2px] px-3`,
      className,
    )}
  >
    {children}
  </span>
);

export default UserInputText;
