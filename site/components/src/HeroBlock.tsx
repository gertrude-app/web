import React from 'react';
import cx from 'classnames';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useScrollY } from '../../app/lib/hooks';

const HeroBlock: React.FC = () => {
  const scrollY = useScrollY();

  return (
    <section className="bg-gradient-to-b from-violet-500 to-fuchsia-500 p-20 h-screen flex flex-col justify-center items-center relative snap-center">
      <h1
        className={cx(`text-7xl text-center text-white font-semibold fixed px-20`)}
        style={{
          transform: `scale(${1 + scrollY / 500})`,
          filter: `blur(${scrollY / 30}px)`,
          opacity: 1 - scrollY / 500,
        }}
      >
        Finally, real internet safety is possible.
      </h1>
      <div
        className={cx(
          `absolute bottom-4 flex flex-col items-center transition-[opacity,transform] duration-500`,
          scrollY !== 0 && `opacity-0 translate-y-4`,
        )}
      >
        <span className="font-medium text-white/30 uppercase tracking-[3px]">Scroll</span>
        <ChevronDownIcon className="h-6 w-6 text-white/30 animate-bounce mt-2" />
      </div>
    </section>
  );
};

export default HeroBlock;
