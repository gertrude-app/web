import React from 'react';
import cx from 'classnames';
import { Logo } from '@shared/components';

// I spent years trying out different parental control software for my four kids (on both Macs and PCs) and never found anything that made me feel peaceful and secure about my kids' online activities until I started using Gertrude.
export const Slide: React.FC = () => (
  <div className="w-screen h-screen relative bg-slate-900">
    <GlowEffect className="lg:-right-20 -right-72 -top-32 lg:-top-12" />
    <GlowEffect className="-left-40 -bottom-24" />
    <GlowEffect className="left-56 -bottom-80" />
    {/* <img src={Bg.src} alt="Banner" className="absolute object-cover w-full h-full" /> */}
    <div
      className={cx(
        `font-serif absolute ml-[450px] leading-[1.25em] *bg-fuchsia-900/30 rounded-[7rem]`,
        `px-[9rem] py-[7rem] pl-[18rem] text-left text-[5.95rem] max-w-[2400px] mt-[12rem] text-slate-200`,
        // `shadow-2xl border-2 border-fuchsia-900/20 border-solid`,
      )}
    >
      <div className="font-serif antialiased absolute left-[54px] top-[210px] text-slate-300 text-[500px]">
        &ldquo;
      </div>
      <p className="mb-[5rem] text-[6rem] leading-[145%] mt-[0rem] *font-bold">
        I spent years trying out different parental control software for my four kids and
        never found anything that made me feel peaceful and secure about my kids’ online
        activities until I started using Gertrude.
      </p>
      <p className=" text-right italic mt-[-4rem] pb-0">&mdash; Jason H.</p>
    </div>
    <Logo
      size={120}
      type="inverted"
      textSize="text-[6rem]"
      className="antialiased opacity-[80%] absolute bottom-[2rem] right-[5rem]"
    />
  </div>
);

export const timeShown = 10000;

const GlowEffect: React.FC<{ className: string }> = ({ className }) => (
  <div
    className={cx(`w-[64rem] h-[64rem] absolute bg-fuchsia-radial-gradient`, className)}
  />
);
