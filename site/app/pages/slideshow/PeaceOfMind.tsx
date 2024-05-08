import React from 'react';
import Img from '../../public/slideshow/peace-of-mind.png';

export const Slide: React.FC = () => (
  <div
    className="relative"
    style={{
      width: 3440,
      height: 1440,
      background: `linear-gradient(to right, rgb(66,98,107) 0%, transparent 100%)`,
    }}
  >
    <img src={Img.src} alt="" className="absolute top-[0rem] right-[0rem]" />
  </div>
);
export const timeShown = 12000;
