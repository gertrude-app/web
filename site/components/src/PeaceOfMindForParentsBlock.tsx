import React from 'react';
import cx from 'classnames';
import Link from 'next/link';
import { RocketLaunchIcon, VideoCameraIcon } from '@heroicons/react/24/outline';
import { useIntersectionObserver } from '../../app/lib/hooks';
import WebsiteGraphic from './WebsiteGraphic';

const PeaceOfMindForParentsBlock: React.FC = () => {
  const { intersected, ref: illustration } = useIntersectionObserver({ threshold: 1 });
  return (
    <div className="bg-fuchsia-500 px-20 py-28 pb-48 flex gap-16 items-center justify-center">
      <div className="flex-grow max-w-3xl relative">
        <h1 className={cx(`text-6xl font-semibold text-white`)}>
          Peace of mind for parents
        </h1>
        <p className="mt-8 text-white/80 text-2xl leading-[1.5em]">
          Gertrude lets you block the entire internet, only unlocking the portions you
          choose. Keep your kids only and exactly where you want them to be online. Plus,
          review screenshots and keystrokes of their activity from your own computer or
          phone. Mac parental controls have never been this good.
        </p>
        <div className="flex gap-6 mt-12">
          <Link
            href="https://parents.gertrude.app/signup"
            className="bg-white px-8 py-4 rounded-3xl flex items-center gap-4"
          >
            <RocketLaunchIcon className="w-8 h-8 text-violet-600" />
            <span className="w-fit bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent font-semibold text-2xl">
              Get started
            </span>
          </Link>
          <Link
            href="https://parents.gertrude.app/signup"
            className="bg-white/10 px-8 py-4 rounded-3xl flex items-center gap-4 text-white text-2xl font-semibold"
          >
            <VideoCameraIcon className="w-8 h-8" />
            Watch demo video
          </Link>
        </div>
      </div>
      <div
        ref={illustration}
        className="flex-grow relative h-112 flex justify-center items-center max-w-[640px] min-w-[600px]"
      >
        <div className="w-176 h-176 [background:radial-gradient(rgb(255_255_255/0.5),transparent_70%)]" />
        <WebsiteGraphic
          variant={1}
          initiallyAllowed={true}
          className="absolute left-8 delay-1"
          bottom={0}
          intersected={intersected}
        />
        <WebsiteGraphic
          variant={2}
          initiallyAllowed={true}
          className="absolute left-[calc(50%-75px)] delay-100"
          bottom={6}
          intersected={intersected}
        />
        <WebsiteGraphic
          variant={3}
          initiallyAllowed={true}
          className="absolute right-8 delay-200"
          bottom={-6}
          intersected={intersected}
        />

        <WebsiteGraphic
          variant={1}
          initiallyAllowed={false}
          className="absolute left-0 -rotate-6"
          bottom={8}
          intersected={intersected}
        />
        <WebsiteGraphic
          variant={2}
          initiallyAllowed={false}
          className="absolute left-6 rotate-3"
          bottom={0}
          intersected={intersected}
        />
        <WebsiteGraphic
          variant={3}
          initiallyAllowed={false}
          className="absolute left-20 rotate-12"
          bottom={12}
          intersected={intersected}
        />
        <WebsiteGraphic
          variant={1}
          initiallyAllowed={false}
          className="absolute left-36 -rotate-12"
          bottom={-4}
          intersected={intersected}
        />
        <WebsiteGraphic
          variant={2}
          initiallyAllowed={false}
          className="absolute left-52"
          bottom={4}
          intersected={intersected}
        />
        <WebsiteGraphic
          variant={3}
          initiallyAllowed={false}
          className="absolute left-64 rotate-6"
          bottom={16}
          intersected={intersected}
        />
        <WebsiteGraphic
          variant={1}
          initiallyAllowed={false}
          className="absolute right-0 rotate-12"
          bottom={12}
          intersected={intersected}
        />
        <WebsiteGraphic
          variant={2}
          initiallyAllowed={false}
          className="absolute right-16 rotate-6"
          bottom={0}
          intersected={intersected}
        />
        <WebsiteGraphic
          variant={3}
          initiallyAllowed={false}
          className="absolute right-32 -rotate-12"
          bottom={8}
          intersected={intersected}
        />
        <WebsiteGraphic
          variant={2}
          initiallyAllowed={false}
          className="absolute right-36 rotate-12"
          bottom={-8}
          intersected={intersected}
        />
      </div>
    </div>
  );
};

export default PeaceOfMindForParentsBlock;
