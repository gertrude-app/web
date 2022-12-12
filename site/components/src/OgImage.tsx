import { Logo } from '@shared/components';
import React from 'react';

const OgImage: React.FC = () => (
  <section className="bg-gradient-to-b bg-gradient-to-b from-gray-900 to-gray-800 flex justify-center items-stretch flex-col w-[1280px] h-[720px]">
    <div className="h-1/2 flex items-start mt-12 justify-center">
      <Logo
        type="inverted"
        size={80}
        textSize="text-[80px]"
        innerColorOverride="rgb(26 33 44)"
      />
    </div>
    <div className="h-1/2 grow text-[40px] text-center flex flex-col space-y-5">
      <div className="text-white text-opacity-70 font-bold opacity-0">
        Serious parental controls for{` `}
        <b className="text-opacity-90 text-white font-extrabold">Apple computers.</b>
      </div>
      <div className="text-white text-opacity-70 font-bold opacity-0">
        <b className="text-opacity-90 text-white font-extrabold">Peace of mind</b>
        {` `}for parents.
      </div>
      <div className="*text-white text-fuchsia-400 text-opacity-70 font-bold text-[32px] pt-10 antialiased">
        https://gertrude.app
      </div>
    </div>
  </section>
);

export default OgImage;
