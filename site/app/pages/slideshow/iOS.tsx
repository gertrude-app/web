import React from 'react';
import cx from 'classnames';
import Phones from '../../public/slideshow/three-iphones.png';
import AppStore from '../../public/slideshow/app-store.png';

export const Slide: React.FC = () => (
  <div
    className="*h-screen *w-screen overflow-hidden relative bg-[rgb(195,211,250)] flex items-center justify-center"
    style={{ width: 3440, height: 1440 }}
  >
    <div
      className="hidden h-screen w-[1800px] *bg-red-500 absolute z-20 right-0"
      style={{
        background: `linear-gradient(to left, rgb(115, 125, 148) 0%, transparent 100%)`,
      }}
    />
    <img src={Phones.src} alt="" className="absolute top-[0rem] left-[-21rem] h-[100%]" />
    <img src={AppStore.src} alt="" className="absolute bottom-[7rem] right-[9rem]" />
    <p
      className={cx(
        `text-black z-30 text-[10rem] max-w-[88rem] font-bold absolute right-[44rem] top-[15rem]`,
        `leading-[1.2em]`,
      )}
    >
      Gertrude for{` `}
      <span
        className={cx(
          `italic bg-gradient-to-br font-bold from-indigo-500 to-fuchsia-500 bg-clip-text text-transparent`,
          `pr-1`,
        )}
      >
        iOS
      </span>
    </p>
    <p
      className={cx(
        `text-black opacity-[69%] italic z-30 text-[5rem] max-w-[88rem] font-bold absolute right-[39rem] top-[33rem]`,
        `leading-[1.2em]`,
      )}
    >
      <span className="pr-2 text-fuchsia-700">•</span> block #images GIF search
      <div className="h-[32px]" />
      <span className="pr-2 text-fuchsia-700">•</span> plug loopholes in Screen Time
      <div className="h-[32px]" />
      <span className="pr-2 text-fuchsia-700">•</span> make Apple maps safe for kids
      <div className="h-[32px]" />
      <span className="pr-2 text-fuchsia-700">•</span> and more coming soon...
    </p>
  </div>
);
export const timeShown = 12000;
