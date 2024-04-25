import React from 'react';
import cx from 'classnames';
import Recent from '../../public/slideshow/hand-dash.png';

export const Slide: React.FC = () => (
  <div
    className="*h-screen *w-screen overflow-hidden relative bg-[rgb(66,98,107)] flex items-center justify-center"
    style={{ width: 3440, height: 1440 }}
  >
    <div
      className="h-screen w-[21rem] bg-red-500 relative z-20 ml-[-14rem]"
      style={{
        background: `linear-gradient(to right, rgb(66,98,107) 0%, transparent 100%)`,
      }}
    />
    <img src={Recent.src} alt="" className="absolute top-[-35rem] right-[0rem]" />
    <p
      className={cx(
        `text-white z-30 text-[9rem] max-w-[88rem] font-bold absolute left-[12rem] top-[29rem]`,
        `leading-[1.2em]`,
      )}
    >
      Know{` `}
      <span
        className={cx(
          `italic bg-gradient-to-br font-bold from-indigo-400 to-fuchsia-400 bg-clip-text text-transparent`,
          `pr-1`,
        )}
      >
        exactly
      </span>
      {` `}
      what your kids are doing online.
    </p>
  </div>
);
export const timeShown = 12000;
