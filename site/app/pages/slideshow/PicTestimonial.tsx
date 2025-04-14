import React from 'react';
import cx from 'classnames';
import Bg from '../../public/slideshow/family-computer.jpg';

export const Slide: React.FC = () => (
  <div className="relative bg-black" style={{ width: 3440, height: 1440 }}>
    <img src={Bg.src} alt="" className="absolute opacity-75 top-[-32rem] right-[0rem]" />
    <div
      className="h-screen w-[100%] *bg-red-500 relative *z-1 *ml-[-14rem]"
      style={{
        background: `linear-gradient(to bottom, rgb(0,0,0) 0%, transparent 100%)`,
      }}
    />
    <div className="hidden font-serif antialiased absolute left-[190px] top-[30px] text-slate-300 text-[500px] opacity-[25%] font-bold">
      &ldquo;
    </div>
    <div className="font-serif antialiased absolute right-[380px] top-[190px] text-slate-300 text-[500px] opacity-[25%] font-bold">
      &rdquo;
    </div>
    <p className="opacity-[85%] text-white text-[5rem] font-bold absolute left-[29rem] top-[16rem] leading-[1.2em]">
      I’m
      <span
        className={cx(
          `*italic text-shadow bg-gradient-to-br font-extrabold from-indigo-400 to-fuchsia-400 bg-clip-text text-transparent`,
          `px-4`,
        )}
      >
        really happy
      </span>
      with Gertrude.
    </p>
    <p className="opacity-[85%] text-white text-[5rem] font-bold absolute left-[29rem] top-[25rem] leading-[1.2em]">
      I can’t tell you how much it has helped
      <span
        className={cx(
          `*italic text-shadow bg-gradient-to-br font-extrabold from-indigo-400 to-fuchsia-400 bg-clip-text text-transparent`,
          `pl-4`,
        )}
      >
        when nothing else would.
      </span>
    </p>
    <p className="opacity-[85%] text-white text-[5rem] font-bold absolute left-[29rem] top-[40rem] leading-[1.2em]">
      - Karla L.
    </p>
    <p className="hidden text-white/30 text-[2rem]  absolute left-[88rem] bottom-[4rem] leading-[1.2em]">
      Source: https://www.guardchild.com/statistics
    </p>
  </div>
);
export const timeShown = 12000;

// 90% of children ages 8-16 have seen online pornography
// 70% of children ages 7-18 have accidentally encountered porn searching the web while doing homework
// the largest group of internet porn consumers is children ages 12-17
// 22% of teenage girls say they have posted nude or semi-nude photos of themselves online
