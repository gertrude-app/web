import React from 'react';
import cx from 'classnames';
import Bg from '../../public/slideshow/dark-computer.jpg';

export const Slide: React.FC = () => (
  <div className="relative bg-black" style={{ width: 3440, height: 1440 }}>
    <img src={Bg.src} alt="" className="absolute opacity-75 top-[-32rem] right-[0rem]" />
    <p className="text-white text-[5rem] font-bold absolute left-[39rem] top-[14rem] leading-[1.2em]">
      <span
        className={cx(
          `*italic text-shadow bg-gradient-to-br font-extrabold from-indigo-500 to-fuchsia-500 bg-clip-text text-transparent`,
          `pr-4`,
        )}
      >
        90% of children
      </span>
      ages 8-16 have seen online pornography
    </p>
    <p className="text-white text-[5rem] font-bold absolute left-[28rem] top-[25rem] leading-[1.2em]">
      The largest group of internet porn consumers is
      <span
        className={cx(
          `*italic text-shadow bg-gradient-to-br font-extrabold from-indigo-500 to-fuchsia-500 bg-clip-text text-transparent`,
          `pl-4`,
        )}
      >
        children ages 12-17
      </span>
    </p>
    <p className="text-white/30 text-[2rem]  absolute left-[88rem] bottom-[4rem] leading-[1.2em]">
      Source: https://www.guardchild.com/statistics
    </p>
  </div>
);
export const timeShown = 12000;

// 90% of children ages 8-16 have seen online pornography
// 70% of children ages 7-18 have accidentally encountered porn searching the web while doing homework
// the largest group of internet porn consumers is children ages 12-17
// 22% of teenage girls say they have posted nude or semi-nude photos of themselves online
