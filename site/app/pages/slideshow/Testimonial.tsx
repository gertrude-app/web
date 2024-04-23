import React from 'react';
import cx from 'classnames';
import { Logo } from '@shared/components';
import Bg from '../../public/slideshow/purple-gradient.png';

export const Slide: React.FC = () => (
  <div className="w-screen h-screen relative">
    <img src={Bg.src} alt="Banner" className="absolute object-cover w-full h-full" />
    <div
      className={cx(
        `font-serif relative ml-[1380px] leading-[1.25em] bg-fuchsia-900/30 rounded-[7rem]`,
        `px-[9rem] py-[7rem] pl-[18rem] text-left text-7xl max-w-[1900px] mt-36 text-white`,
        // `shadow-2xl border-2 border-fuchsia-900/20 border-solid`,
      )}
    >
      <div className="font-serif absolute left-[54px] top-[210px] text-white text-[500px]">
        &ldquo;
      </div>
      <p className="mb-[4rem] mt-[1rem]">
        I am SO impressed not only with your platform but also your customer service!
      </p>
      <p>
        I love that Gertrude settings can be controlled on the admin’s phone or device.
      </p>
      <p className="mt-8 text-right italic -mb-[2rem] pb-0">&mdash; Madison M.</p>
      <div className="font-serif absolute text-white text-[500px] hidden bottom-[-45px] right-[70px]">
        &rdquo;
      </div>
    </div>
    <Logo
      size={250}
      type="inverted"
      textSize="text-[11rem]"
      className="opacity-[100%] absolute bottom-[2rem] left-[5rem]"
    />
  </div>
);

export const timeShown = 8000;
