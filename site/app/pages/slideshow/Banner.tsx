import React from 'react';
import Banner from '../../public/slideshow/Gertrude.png';

export const Slide: React.FC = () => (
  <div className="w-screen h-screen">
    <img src={Banner.src} alt="Banner" className="object-cover w-full h-full" />
  </div>
);

export const timeShown = 6000;
