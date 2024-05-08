import React from 'react';
import cx from 'classnames';
import Boycomputer from '../../public/slideshow/tt-darker.png';

// 117,49,176
export const Slide: React.FC = () => (
  <div
    className="*h-screen *w-screen overflow-hidden relative bg-[rgb(117,49,176)] flex items-center justify-center"
    style={{ width: 3440, height: 1440 }}
  >
    <div
      className="h-screen w-[90rem] bg-red-500 absolute z-20 left-[0rem]"
      style={{
        background: `linear-gradient(to right, rgba(0,0,0,80%) 0%, transparent 100%)`,
      }}
    />
    <img
      src={Boycomputer.src}
      alt=""
      className="absolute w-[4100px] top-[0rem] right-[-8rem] max-w-[150%]"
    />
    <p
      className={cx(
        `text-white z-30 text-[9rem] max-w-[84rem] font-bold absolute left-[14rem] top-[19rem]`,
        `leading-[1.2em]`,
      )}
    >
      You pick which websites are{` `}
      <span
        className={cx(
          `italic text-shadow bg-gradient-to-br font-bold from-indigo-400 to-fuchsia-400 bg-clip-text text-transparent`,
          `pr-1`,
        )}
      >
        allowed.
      </span>
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
        `text-white z-30 text-[9rem] max-w-[88rem] font-bold absolute left-[14rem] top-[62rem]`,
        `leading-[1.2em]`,
      )}
    >
      Then relax.
    </p>
  </div>
);
export const timeShown = 12000;
