import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import * as WebsiteCounter from './WebsiteCounter';
import * as Banner from './Banner';
import * as Exodus from './BestPornFilter';
import * as TestimonialMadison from './Testimonial';
import * as TestimonialJason from './Testimonial2';
import * as TestimonialFrank from './Testimonial3';
import * as Dashboard from './Dashboard';
import * as BoyComputer from './BoyComputer';
import * as BookConsult from './BookConsult';
import * as DefenseInDepth from './DefenseInDepth';
import * as Workshop from './Workshop-101';
import * as ScaryStats from './ScaryStats';
import * as PeaceOfMind from './PeaceOfMind';
import * as SafetyPossible from './SafetyPossible';
import * as ThreePhones from './iOS';
import * as PicTestimonial from './PicTestimonial';

const Slideshow: NextPage = () => {
  const [play] = useState(true);
  const [index, setIndex] = useState(0);
  const [transition, setTransition] = useState(true);

  const slides = [
    { time: Banner.timeShown, Slide: Banner.Slide },
    { time: SafetyPossible.timeShown, Slide: SafetyPossible.Slide },
    { time: TestimonialJason.timeShown, Slide: TestimonialJason.Slide },
    { time: PeaceOfMind.timeShown, Slide: PeaceOfMind.Slide },
    { time: ScaryStats.timeShown, Slide: ScaryStats.Slide },
    { time: Workshop.timeShown, Slide: () => <Workshop.Slide idx={0} /> },
    { time: DefenseInDepth.timeShown, Slide: DefenseInDepth.Slide },
    { time: ThreePhones.timeShown, Slide: ThreePhones.Slide },
    { time: PicTestimonial.timeShown, Slide: PicTestimonial.Slide },
    { time: BookConsult.timeShown, Slide: BookConsult.Slide },
    { time: TestimonialFrank.timeShown, Slide: TestimonialFrank.Slide },
    { time: WebsiteCounter.timeShown, Slide: WebsiteCounter.Slide },
    { time: BoyComputer.timeShown, Slide: BoyComputer.Slide },
    { time: Workshop.timeShown, Slide: () => <Workshop.Slide idx={0} /> },
    { time: Dashboard.timeShown, Slide: Dashboard.Slide },
    { time: TestimonialMadison.timeShown, Slide: TestimonialMadison.Slide },
    { time: Exodus.timeShown, Slide: Exodus.Slide },
    { time: Banner.timeShown, Slide: Banner.Slide },
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

const WIDTH = 3440;
const HEIGHT = 1440;

export default Slideshow;
