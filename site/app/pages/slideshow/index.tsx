import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import * as WebsiteCounter from './WebsiteCounter';
import * as Banner from './Banner';
import * as Exodus from './BestPornFilter';
import * as Testimonial from './Testimonial';
import * as Dashboard from './Dashboard';
import * as BoyComputer from './BoyComputer';
import * as BookConsult from './BookConsult';
import * as DefenseInDepth from './DefenseInDepth';
import * as Workshop from './Workshop-101';

const Slideshow: NextPage = () => {
  const [play] = useState(false);
  const [index, setIndex] = useState(1);
  const [transition, setTransition] = useState(true);

  const slides = [
    { time: Banner.timeShown, Slide: Banner.Slide },
    { time: Workshop.timeShown, Slide: () => <Workshop.Slide idx={0} /> },
    { time: DefenseInDepth.timeShown, Slide: DefenseInDepth.Slide },
    { time: BookConsult.timeShown, Slide: BookConsult.Slide },
    { time: WebsiteCounter.timeShown, Slide: WebsiteCounter.Slide },
    { time: BoyComputer.timeShown, Slide: BoyComputer.Slide },
    { time: Testimonial.timeShown, Slide: Testimonial.Slide },
    { time: Workshop.timeShown, Slide: () => <Workshop.Slide idx={1} /> },
    { time: Dashboard.timeShown, Slide: Dashboard.Slide },
    { time: Exodus.timeShown, Slide: Exodus.Slide },
    { time: Banner.timeShown, Slide: Banner.Slide },
    // { time: Workshop.timeShown, Slide: () => <Workshop.Slide idx={2} /> }, // case-study
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

const TRANSITION_MS = 850;

// const Slide: React.FC<{
//   children?: React.ReactNode;
//   className?: string;
// }> = ({ children, className }) => (
//   <div
//     className={cx(``, className)}
//     style={{
//       minWidth: WIDTH,
//       minHeight: HEIGHT,
//       width: WIDTH,
//       height: HEIGHT,
//       maxWidth: WIDTH,
//       maxHeight: HEIGHT,
//     }}
//   >
//     {children}
//   </div>
// );

const WIDTH = 3440;
const HEIGHT = 1440;

// const WIDTH = 400;
// const HEIGHT = 200;

export default Slideshow;
