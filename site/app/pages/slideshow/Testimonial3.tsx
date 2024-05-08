import React from 'react';
import cx from 'classnames';
import { Logo } from '@shared/components';

export const Slide: React.FC = () => (
  <div className="w-screen h-screen relative bg-slate-900">
    <GlowEffect className="lg:-right-20 -right-72 -top-32 lg:-top-12" />
    <GlowEffect className="-left-40 -bottom-24" />
    <GlowEffect className="left-56 -bottom-80" />
    <div
      className={cx(
        `font-serif absolute ml-[450px] leading-[1.25em] *bg-fuchsia-900/30 rounded-[7rem]`,
        `px-[9rem] py-[7rem] pl-[18rem] text-left text-[5.95rem] max-w-[2400px] mt-[12rem] text-slate-200`,
      )}
    >
      <div className="font-serif antialiased absolute left-[54px] top-[210px] text-slate-300 text-[500px]">
        &ldquo;
      </div>
      <p className="mb-[5rem] text-[5.5rem] leading-[145%] mt-[0rem] *font-bold">
        We have used Gertrude for our two children for the past few years and have found
        it to be absolutely the most secure product available. The app makes it it
        manageable for us as middle-aged parents with typical computer skills.
      </p>
      <p className=" text-right italic mt-[-4rem] pb-0">&mdash; Frank A.</p>
    </div>
    <Logo
      size={120}
      type="inverted"
      textSize="text-[6rem]"
      className="antialiased opacity-[80%] absolute bottom-[2rem] right-[5rem]"
    />
  </div>
);

export const timeShown = 12000;

const GlowEffect: React.FC<{ className: string }> = ({ className }) => (
  <div
    className={cx(`w-[64rem] h-[64rem] absolute bg-fuchsia-radial-gradient`, className)}
  />
);
