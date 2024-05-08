import React from 'react';
import cx from 'classnames';

export const timeShown = 8000;

const GlowEffect: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cx(`w-176 h-176 absolute bg-fuchsia-radial-gradient`, className)} />
);

export const Slide: React.FC = () => (
  <section className="bg-gradient-to-b from-slate-900 to-slate-800 px-10 md:px-16 pt-16 md:pt-28 pb-12 flex items-center flex-col relative overflow-hidden w-screen h-screen">
    <GlowEffect className="-right-72 -top-72 z-20" />
    <GlowEffect className="-left-20 -bottom-128 z-20" />
    <GlowEffect className="-left-32 -bottom-64 z-20" />
    <div className="flex flex-row flex-wrap justify-center md:justify-center items-center mb-8 sm:mb-16 mt-[8.8rem] relative">
      <IconCircle icon="lock" />
      <IconCircle icon="binoculars" />
      <IconCircle icon="keyboard" />
    </div>
    <h2 className="font-inter text-[13rem] -mt-12 text-left md:text-center text-white">
      Defense in depth.
    </h2>
    <p className="text-[3rem] text-slate-400/90 mt-8 leading-[135%] antialiased md:text-center text-left max-w-[95rem] *sm:mb-20 mb-10">
      In addition to internet filtering, Gertrude allows you to collect{` `}
      <b className="text-slate-300">screenshots</b>
      {` `}
      of your child&rsquo;s screens, as well as a record of{` `}
      <b className="text-slate-300">everything they type</b>, for an unprecedented level
      of safety, redundancy, and oversight. Review screenshots and keystrokes on your own
      time, on your own device.
    </p>
  </section>
);

interface IconCircleProps {
  icon: string;
}

const IconCircle: React.FC<IconCircleProps> = ({ icon }) => (
  <div className="w-64 h-64 rounded-full bg-slate-800 flex items-center justify-center my-2 sm:my-0 mx-3 sm:mx-10 shadow-2xl relative">
    <i
      aria-hidden
      className={`fa fa-${icon} text-[6rem] bg-gradient-to-br from-indigo-500 to-fuchsia-500 bg-clip-text text-transparent`}
    />
  </div>
);
