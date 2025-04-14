import React from 'react';
import cx from 'classnames';
import { Logo } from '@shared/components';
import QrCode from '../../public/slideshow/qrcode.png';

export const Slide: React.FC = () => (
  <div className="w-screen h-screen relative bg-fuchsia-50">
    <GlowEffect className="lg:-right-20 opacity-50 -right-72 -top-32 lg:-top-12" />
    <GlowEffect className="-left-40 opacity-50 -bottom-24" />
    {/* <GlowEffect className="left-56 opacity-50 -bottom-80" /> */}
    {/* <img src={Bg.src} alt="Banner" className="absolute object-cover w-full h-full" /> */}
    <div
      className={cx(
        `text-slate-800 *absolute ml-[450px] leading-[1.25em] *bg-fuchsia-900/30 rounded-[7rem]`,
        `px-[9rem] py-[7rem] pl-[18rem] text-left text-[5.95rem] max-w-[2400px] mt-[12rem] text-slate-200`,
        // `shadow-2xl border-2 border-fuchsia-900/20 border-solid`,
      )}
    >
      <div
        className={cx(
          `w-[95rem] flex flex-col items-center text-center *bg-white *p-16 rounded-[5rem]`,
          `absolute right-[28rem] top-[22rem]`,
          `*bg-white bg-opacity-50 *shadow-2xl`,
        )}
      >
        <p className="mb-[5rem] *mt-[1rem] font-bold text-[8.5rem]">
          Want to find out more?
        </p>
        <p className="mb-[5rem] mt-[1rem] text-slate-700 text-[5.5rem] w-[78rem]">
          Scan the QR code and give us your email address. We'll contact you to walk you
          through setting up your free trial.
        </p>
      </div>
      <div
        className={cx(
          `absolute p-12 bg-white rounded-[4rem] left-[25rem] top-[15rem]`,
          `shadow-2xl`,
        )}
      >
        <img src={QrCode.src} alt="" className="w-[44rem] h-[44rem]" />
        <p className="text-center -mt-[5rem] font-mono antialiased text-slate-500 text-[2.0rem]">
          www.gertrude.app/ghc
        </p>
      </div>
    </div>
    <Logo
      size={120}
      textSize="text-[6rem]"
      className="antialiased opacity-[90%] absolute bottom-[2rem] right-[5rem]"
    />
    <p className="absolute w-[48rem] bottom-[13rem] italic right-[141rem] text-center text-[2.3rem] text-slate-400 opacity-75 leading-[125%] antialiased">
      <i className="fas fa-mobile-alt mr-3" />
      Point your phone's camera right here &uarr;
    </p>
  </div>
);

export const timeShown = 12000;

const GlowEffect: React.FC<{ className: string }> = ({ className }) => (
  <div
    className={cx(`w-[64rem] h-[64rem] absolute bg-fuchsia-radial-gradient`, className)}
  />
);
