import React from 'react';
import cx from 'classnames';
import Boycomputer from '../../public/slideshow/boy-computer.png';

// 117,49,176
export const Slide: React.FC = () => (
  <div
    className="*h-screen *w-screen overflow-hidden relative bg-[rgb(117,49,176)] flex items-center justify-center"
    style={{ width: 3440, height: 1440 }}
  >
    <div
      className="h-screen w-[21rem] bg-red-500 relative z-20 ml-[-14rem]"
      style={{
        background: `linear-gradient(to left, rgb(117,49,176) 0%, transparent 100%)`,
      }}
    />
    <img src={Boycomputer.src} alt="" className="absolute top-[-0rem] left-[-11rem]" />
    <p
      className={cx(
        `text-white z-30 text-[9rem] max-w-[88rem] font-bold absolute right-[26rem] top-[19rem]`,
        `leading-[1.2em]`,
      )}
    >
      You pick which websites are allowed.{` `}
      <span
        className={cx(
          `italic bg-gradient-to-br font-bold from-indigo-400 to-fuchsia-400 bg-clip-text text-transparent`,
          `pr-1 hidden`,
        )}
      >
        Period.
      </span>
    </p>
    <p
      className={cx(
        `text-white z-30 text-[9rem] max-w-[88rem] font-bold absolute right-[69rem] top-[50rem]`,
        `leading-[1.2em]`,
      )}
    >
      Then relax.
    </p>
  </div>
);
export const timeShown = 12000;
