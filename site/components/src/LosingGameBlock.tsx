import React from 'react';
import ExampleWebsiteGraphic from './ExampleWebsiteGraphic';
import GlowEffect from './GlowEffect';
import WebsiteCounter from './WebsiteCounter';

const LosingGameBlock: React.FC = () => (
  <>
    <section
      className="h-24 flex border-l-2 border-none relative"
      style={{
        background: `linear-gradient(to bottom right, transparent 50%, #111827 50%)`,
      }}
    >
      <div className="h-full w-20 ml-0.5 z-20 hidden lg:block"></div>
    </section>
    <section className="bg-slate-900 relative p-20 py-28 z-20">
      <GlowEffect className="-right-20 -top-12" />
      <GlowEffect className="-left-40 -bottom-24" />
      <GlowEffect className="left-56 -bottom-80" />
      <div className="flex flex-col lg:flex-row">
        <div className="mr-20">
          <h2 className="text-6xl font-extrabold font-inter text-white">
            <span className="bg-gradient-to-br from-indigo-500 to-fuchsia-500 bg-clip-text text-transparent">
              A losing game
            </span>
          </h2>
          <p className="text-xl text-gray-500 mt-8 leading-8 max-w-3xl">
            Most internet safety tools try to block{` `}
            <span className="text-gray-400 font-bold antialiased">categories</span> of the
            internet. With 1.9 billion websites, and tens of thousands more being added
            every day, it's simply impossible to maintain up-to-date lists correctly
            categorizing even a fraction of dangerous websites.
          </p>
        </div>
        <div className="relative flex-grow w-96 ml-20 -mr-12 xl:-mr-0">
          <ExampleWebsiteGraphic className="absolute -bottom-40 right-48 xl:right-56 -rotate-6 scale-75" />
          <ExampleWebsiteGraphic className="absolute bottom-8 -right-2 rotate-12 scale-90" />
          <ExampleWebsiteGraphic className="absolute -bottom-20 right-20 rotate-3 scale-100" />
        </div>
      </div>
      <WebsiteCounter />
    </section>
    <section
      className="h-24 flex border-l-2 border-none relative z-10"
      style={{
        background: `linear-gradient(to bottom right, #111827 50%,  #f9fafb 50%)`,
      }}
    >
      <div className="hidden lg:block h-full w-20 ml-0.5  z-20"></div>
    </section>
  </>
);

export default LosingGameBlock;
