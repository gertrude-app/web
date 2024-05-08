import React from 'react';
import cx from 'classnames';
import { Logo } from '@shared/components';

export const Slide: React.FC = () => (
  <section className="w-screen h-screen flex flex-col justify-center items-center sm:p-20 p-10 pt-20 bg-gradient-to-b from-violet-600 to-fuchsia-600 relative z-10">
    <h1
      className={cx(
        `text-[8rem] font-extrabold text-center leading-[120%] mt-24 text-white text-opacity-60`,
      )}
    >
      Finally, real{` `}
      <span className="text-white text-opacity-90">internet safety</span>
      {` `}
      is possible
    </h1>
    <h2 className="text-white text-opacity-70 text-[4rem] font-bold mt-[4rem] text-center">
      $5/month{` `}
      <span className="text-white text-opacity-90 font-extrabold underline">
        for the whole family
      </span>
      , with a 60 day free trial.
    </h2>
    <h2 className="text-white text-[9rem] font-bold mt-[7rem] text-center">
      www.gertrude.app
    </h2>
    <Logo
      size={100}
      type="inverted"
      textSize="text-[5rem]"
      className="antialiased opacity-[80%] absolute top-[3rem] *left-[5rem]"
    />
  </section>
);

export const timeShown = 8000;
