'use client';

import { StarIcon } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import FancyLink from './FancyLink';
import Phone from './super-scroller-illustration/Phone';

const IOSBlockAlt1: React.FC = () => {
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
      className="bg-gradient-to-br from-violet-50 via-white to-fuchsia-50 flex flex-col items-center overflow-hidden lg:pr-16 xl:pr-24"
    >
      <div className="max-w-6xl w-full pt-12 xs:pt-14 md:pt-16 lg:pt-10 pb-16 xs:pb-18 md:pb-20 relative">
        <div className="lg:hidden relative h-[300px] overflow-hidden flex items-start justify-center -mt-4 mb-8">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-fuchsia-100/40 to-violet-200/60" />
          <div
            className={`${isVisible ? `translate-y-0 opacity-100` : `translate-y-12 opacity-0`}`}
            style={{
              transition: `all 0.6s cubic-bezier(0.2, 1.4, 0.5, 1)`,
              transitionDelay: isVisible ? `600ms` : `0ms`,
            }}
          >
            <Phone className="shadow-2xl scale-[0.85]" labelStatus="hidden">
              <BlockedGifSearchScreen />
            </Phone>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-center px-6 xs:px-8 sm:px-12 md:px-20 pt-4 xs:pt-6">
          <div className="lg:order-1 lg:col-span-9 relative z-10 flex flex-col items-center xs:items-start">
            <div className="relative inline-block mb-6">
              <div
                className={`inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-500 px-4 py-2 rounded-full shadow-lg shadow-green-600/30 ${isVisible ? `translate-x-0` : `-translate-x-[250px]`}`}
                style={{
                  transition: `transform 0.25s cubic-bezier(0.2, 1.4, 0.5, 1)`,
                  transitionDelay: isVisible ? `1000ms` : `0ms`,
                }}
              >
                <span className="text-sm font-bold text-white tracking-wide">
                  100% FREE
                </span>
              </div>
            </div>

            <h2 className="text-3xl xs:text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight text-center xs:text-left">
              Gertrude for iPhone & iPad
            </h2>

            <div className="flex items-center gap-3 mb-6 justify-center xs:justify-start w-full">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    size={20}
                    className="fill-amber-400 text-amber-400"
                    strokeWidth={0}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <span className="text-xl font-bold">4.9</span>
                <span className="text-sm">App Store</span>
              </div>
            </div>

            <p className="text-2xl text-slate-600 leading-relaxed mb-8">
              The{' '}
              <span className="relative inline-block">
                missing features
                <svg
                  className="absolute bottom-0 left-0 w-full translate-y-1"
                  height="6"
                  viewBox="0 0 200 6"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="ios-underline-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style={{ stopColor: `#8b5cf6`, stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: `#d946ef`, stopOpacity: 1 }} />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 0 3 Q 50 1, 100 3 T 200 3"
                    stroke="url(#ios-underline-gradient)"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="butt"
                    pathLength="1"
                    strokeDasharray="1"
                    strokeDashoffset={isVisible ? 0 : 1}
                    style={{
                      transition: 'stroke-dashoffset 0.3s ease-out',
                      transitionDelay: isVisible ? '800ms' : '0ms',
                    }}
                  />
                </svg>
              </span>{' '}
              Screen Time should have included.
            </p>

            <div className="w-full space-y-3 mb-8 bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-violet-100 lg:mr-4">
              <Feature text="Block GIF searches in #images" />
              <Feature text="Block spotlight internet & image search" />
              <Feature text="Block album artwork in Spotify" />
              <Feature text="Remove images from Apple Maps" />
              <Feature text="Plus several more loopholes..." />
            </div>

            <div className="flex flex-col xs:flex-row items-center xs:items-start gap-4">
              <FancyLink
                type="link"
                href="https://apps.apple.com/us/app/gertrude/id1672416108"
                size="lg"
                color="primary"
              >
                Download&nbsp;&rarr;
              </FancyLink>
              <FancyLink type="link" href="/ios" size="lg" color="secondary">
                Learn&nbsp;More&nbsp;
              </FancyLink>
            </div>
          </div>

          <div className="hidden lg:block lg:order-2 lg:col-span-3 relative flex items-center justify-center h-[500px]">
            <div
              className={`-ml-8 ${isVisible ? `translate-y-0 opacity-100` : `translate-y-12 opacity-0`}`}
              style={{
                transition: `all 0.6s cubic-bezier(0.2, 1.4, 0.5, 1)`,
                transitionDelay: isVisible ? `600ms` : `0ms`,
              }}
            >
              <Phone className="shadow-2xl scale-75" labelStatus="hidden">
                <BlockedGifSearchScreen />
              </Phone>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const BlockedGifSearchScreen: React.FC = () => (
  <div className="w-full h-full flex flex-col">
    <div className="bg-slate-900 h-16 shrink-0" />
    <div className="flex-1 bg-white flex flex-col">
      <div className="bg-gray-100 px-3 py-2 flex items-center gap-2">
        <div className="flex-1 bg-white rounded-lg px-3 py-2 flex items-center gap-2">
          <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="text-gray-800 text-sm font-medium">Bikini</span>
        </div>
        <span className="text-blue-500 text-sm font-medium">Cancel</span>
      </div>
      <div className="flex-1 p-1.5 overflow-hidden">
        <div className="grid grid-cols-3 gap-1.5">
          {[...Array(18)].map((_, i) => (
            <div
              key={i}
              className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded"
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);

interface FeatureProps {
  text: string;
}

const Feature: React.FC<FeatureProps> = ({ text }) => (
  <div className="flex items-start gap-3">
    <div className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-md bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
      <svg
        className="w-3.5 h-3.5 text-white"
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
    <span className="text-base text-slate-700">{text}</span>
  </div>
);

export default IOSBlockAlt1;
