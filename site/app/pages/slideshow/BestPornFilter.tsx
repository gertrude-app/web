import React from 'react';
import Logo from '../../public/slideshow/exodus.png';

export const Slide: React.FC = () => (
  <div className="w-screen h-screen relative bg-[rgb(231,170,59)]">
    <h1 className="font-mono mt-[440px] font-bold text-[9.3rem] text-center text-black">
      #1 Rated Internet Filter
    </h1>
    <img
      src={Logo.src}
      className="w-[1200px] opacity-75 absolute top-[-0px] left-[1124px]"
      alt=""
    />
    <p className="text-white text-[5.8rem] opacity-75 font-mono absolute top-[20rem] right-[70rem] *opacity-75 tracking-[-10px]">
      &rsquo;s
    </p>
    <div className="font-serif relative ml-[1000px] leading-[1.25em] text-center text-7xl max-w-[1400px] mt-36 text-white">
      <div className="font-serif absolute left-[-180px] top-[100px] text-white text-[500px]">
        &ldquo;
      </div>
      Gertrude is the only filtering software which lets you block the entire internet,
      only unlocking the portions you choose.
      <div className="font-serif absolute text-white text-[500px] bottom-[-95px] right-[-210px]">
        &rdquo;
      </div>
    </div>
    <h2 className="text-black text-4xl opacity-50 font-mono text-center mt-48">
      https://exoduscry.com/articles/protect-kids-from-porn-best-online-filtering-software-reviews/
    </h2>
  </div>
);

export const timeShown = 8000;
