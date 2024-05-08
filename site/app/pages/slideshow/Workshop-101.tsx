import React from 'react';
import First from '../../public/slideshow/workshop-101.png';
import Second from '../../public/slideshow/workshop-wrangling.png';
import Third from '../../public/slideshow/workshop-case-study.png';

export const Slide: React.FC<{ idx: number }> = ({ idx }) => (
  <div
    className="relative"
    style={{
      width: 3440,
      height: 1440,
      background: `linear-gradient(to right, rgb(66,98,107) 0%, transparent 100%)`,
    }}
  >
    <img
      src={[First.src, Second.src, Third.src][idx] ?? ``}
      alt=""
      className="absolute top-[0rem] right-[0rem]"
    />
    <div
      className="absolute bg-red-500 top-0 left-0"
      style={{
        width: 600,
        height: 1440,
        background: `linear-gradient(to bottom, rgb(1,1,1) 0%, rgb(58,58,58) 100%)`,
      }}
    />
    <div
      className="absolute bg-red-500 top-0 right-0"
      style={{
        width: 600,
        height: 1440,
        background: `linear-gradient(to bottom, rgb(1,1,1) 0%, rgb(58,58,58) 100%)`,
      }}
    />
  </div>
);
export const timeShown = 12000;
