import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import { useInterval } from 'lib/hooks';
import type { NextPage } from 'next';

const Slideshow: NextPage = () => {
  const [play] = useState(true);
  const [index, setIndex] = useState(0);
  const [transition, setTransition] = useState(true);

  const slides = [
    { time: 1500, Slide: () => <Slide className="text-6xl bg-red-500">Slide 1</Slide> },
    { time: 1500, Slide: () => <Slide className="text-6xl bg-green-500">Slide 2</Slide> },
    { time: 1500, Slide: () => <Slide className="text-6xl bg-blue-500">Slide 3</Slide> },
    { time: 1500, Slide: () => <Slide className="text-6xl bg-red-500">Slide *</Slide> },
  ];

  const time = slides[index]?.time ?? 0;

  useEffect(() => {
    if (!transition) return;
    const timeout = setTimeout(() => {
      if (!play) return;
      if (index === slides.length - 1) {
        setTransition(false);
        setIndex(0);
        setTimeout(() => {
          setTransition(true);
          setIndex(1);
        }, 15);
      } else {
        setIndex((prevIndex) => (prevIndex + 1) % slides.length);
      }
    }, time);
    return () => clearTimeout(timeout);
  }, [index, play, slides.length, time, transition]);

  // useInterval(() => {
  //   if (!play) return;
  //   if (index === slides.length - 1) {
  //     setTransition(false);
  //     setIndex(0);
  //     setTimeout(() => {
  //       setTransition(true);
  //       setIndex(1);
  //     }, 0);
  //   } else {
  //     setIndex((prevIndex) => (prevIndex + 1) % slides.length);
  //   }
  // }, 1500);

  return (
    <div className="">
      <div className="overflow-hidden relative" style={{ width: WIDTH, height: HEIGHT }}>
        <div
          className="flex absolute"
          style={{
            transform: `translateX(-${index * WIDTH}px)`,
            transition: transition ? `transform ${TRANSITION_MS}ms` : `none`,
          }}
        >
          {slides.map(({ Slide }, i) => (
            <Slide key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

const TRANSITION_MS = 500;

const Slide: React.FC<{
  children?: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <div
    className={cx(``, className)}
    style={{
      minWidth: WIDTH,
      minHeight: HEIGHT,
      width: WIDTH,
      height: HEIGHT,
      maxWidth: WIDTH,
      maxHeight: HEIGHT,
    }}
  >
    {children}
  </div>
);

const WIDTH = 3440;
const HEIGHT = 1440;

// const WIDTH = 400;
// const HEIGHT = 200;

export default Slideshow;
