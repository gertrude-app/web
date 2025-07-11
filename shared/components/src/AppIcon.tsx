import cx from 'classnames';
import React from 'react';
import Logo from './Logo';

interface Props {
  className?: string;
}

const AppIcon: React.FC<Props> = ({ className }) => (
  <div
    className={cx(
      `p-2 rounded-[40px] bg-white shadow-lg flex flex-col justify-center items-center`,
      className,
    )}
  >
    <Logo iconOnly size={200} className="" />
  </div>
);

export default AppIcon;
