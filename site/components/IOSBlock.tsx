'use client';

import { ArrowRightIcon, StarIcon } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import FancyLink from './FancyLink';

const IOSBlock: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.75 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-white px-4 xs:px-8 sm:px-12 md:px-20 flex flex-col items-center overflow-hidden"
    >
      <div className="max-w-5xl w-full">
        <div className="text-center mb-12 xs:mb-16 pt-12 xs:pt-16 md:pt-20">
          <div className="relative inline-block -translate-x-6">
            <h2 className="text-4xl xs:text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Gertrude for iPhone & iPad
            </h2>
            <div
              className={`absolute -top-7 rotate-[8deg] -right-12 xs:-right-14 md:-right-18 inline-flex items-center gap-2 bg-violet-100 px-4 py-2 rounded-full delay-500 ${isVisible ? `translate-x-0` : `translate-x-[250px]`}`}
              style={{
                transition: `transform 0.25s cubic-bezier(0.2, 1.4, 0.5, 1)`,
                transitionDelay: isVisible ? `1000ms` : `0ms`,
              }}
            >
              <span className="text-sm font-semibold bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent whitespace-nowrap">
                100% FREE
              </span>
            </div>
          </div>

          <p className="text-lg xs:text-xl md:text-2xl text-slate-600 leading-relaxed max-w-3xl mx-auto mb-8">
            The missing features Screen Time{` `}
            <span className="relative inline-block">
              <span className="relative z-10">should have</span>
              <svg
                className="absolute bottom-0 left-0 w-full translate-y-1"
                height="6"
                viewBox="0 0 200 6"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id="underline-gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" style={{ stopColor: `#8B5CF6`, stopOpacity: 1 }} />
                    <stop
                      offset="100%"
                      style={{ stopColor: `#D946EF`, stopOpacity: 1 }}
                    />
                  </linearGradient>
                </defs>
                <path
                  d="M 0 3 Q 50 1, 100 3 T 200 3"
                  stroke="url(#underline-gradient)"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            {` `}
            included.
          </p>

          <div className="flex flex-col xs:flex-row items-center justify-center gap-3 mb-8 -mt-2">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  size={24}
                  className="fill-amber-400 text-amber-400"
                  strokeWidth={0}
                />
              ))}
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <span className="text-2xl font-bold">4.9</span>
              <span className="text-base">on the App Store</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-end">
          <div className="relative flex items-end justify-center h-[400px] ml-2 -mt-8">
            <div className="relative w-80 h-[700px] bg-gradient-to-br from-slate-800 to-slate-900 rounded-t-[3.5rem] p-4 shadow-2xl translate-y-[300px] -rotate-[15deg] z-10">
              <div className="absolute top-40 left-1/2 -translate-x-1/2 w-28 h-28 rounded-3xl shadow-lg overflow-hidden">
                <img
                  src="/gertrude-icon.png"
                  alt="Gertrude app icon"
                  className="w-full h-full"
                />
              </div>
              <div className="absolute top-8 left-1/2 -translate-x-1/2 w-24 h-2 bg-slate-700 rounded-full" />
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-t from-violet-500/20 to-fuchsia-500/20 blur-3xl -z-10" />
          </div>

          <div className="space-y-8 pb-12 xs:pb-16 md:pb-20 -ml-16">
            <div className="text-left space-y-3">
              <Feature text="Block GIF searches in #images" />
              <Feature text="Block spotlight internet & image search" />
              <Feature text="Block album artwork in Spotify" />
              <Feature text="Remove images from Apple Maps" />
              <Feature text="Plus several more loopholes" />
            </div>

            <div className="flex flex-col xs:flex-row items-start gap-4 pt-4">
              <FancyLink
                type="link"
                href="https://apps.apple.com/us/app/gertrude/id1672416108"
                size="lg"
                color="primary"
                // Icon={ArrowRightIcon}
              >
                Download &rarr;
              </FancyLink>
              <FancyLink type="link" href="/ios" size="lg" color="secondary">
                Learn&nbsp;More&nbsp;&hellip;
              </FancyLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface FeatureProps {
  text: string;
}

const Feature: React.FC<FeatureProps> = ({ text }) => (
  <div className="flex items-start gap-3">
    <div className="flex-shrink-0 w-6 h-6 mt-0.5 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
      <svg
        className="w-4 h-4 text-white"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </div>
    <span className="text-lg text-slate-700 leading-relaxed">{text}</span>
  </div>
);

export default IOSBlock;
