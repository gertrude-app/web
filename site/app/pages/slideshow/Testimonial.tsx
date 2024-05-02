import React from 'react';
import cx from 'classnames';
import { Logo } from '@shared/components';

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
      <p className="mb-[5rem] mt-[1rem] *font-bold">
        I am SO impressed not only with your platform but also your customer service!
      </p>
      <p className="*font-bold">
        I love that Gertrude settings can be controlled on the admin’s phone or device.
      </p>
      <p className="mt-8 text-right italic -mb-[2rem] pb-0">&mdash; Madison M.</p>
      <div className="font-serif absolute text-white text-[500px] hidden bottom-[-45px] right-[70px]">
        &rdquo;
      </div>
    </div>
    <Logo
      size={120}
      type="inverted"
      textSize="text-[6rem]"
      className="antialiased opacity-[80%] absolute bottom-[2rem] right-[5rem]"
    />
  </div>
);

export const timeShown = 8000;

const GlowEffect: React.FC<{ className: string }> = ({ className }) => (
  <div
    className={cx(`w-[64rem] h-[64rem] absolute bg-fuchsia-radial-gradient`, className)}
  />
);
