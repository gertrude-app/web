'use client';

import { StarIcon } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import FancyLink from './FancyLink';

const IOSBlockAlt2: React.FC = () => {
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
      className="bg-slate-900 px-4 xs:px-8 sm:px-12 md:px-20 flex flex-col items-center overflow-hidden relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-transparent to-fuchsia-900/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(139,92,246,0.1),transparent_50%)]" />

      <div className="max-w-5xl w-full py-12 xs:py-16 md:py-24 relative z-10">
        <div className="text-center mb-12 xs:mb-16">
          <div className="relative inline-block mb-6">
            <div
              className={`inline-flex items-center gap-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-2.5 rounded-full shadow-lg ${isVisible ? `scale-100 rotate-0` : `scale-50 rotate-12`}`}
              style={{
                transition: `all 0.5s cubic-bezier(0.2, 1.4, 0.5, 1)`,
                transitionDelay: isVisible ? `200ms` : `0ms`,
              }}
            >
              <span className="text-sm font-bold text-white">100% FREE</span>
            </div>
          </div>

          <h2 className="text-4xl xs:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Gertrude for iPhone & iPad
          </h2>

          <p className="text-lg xs:text-xl md:text-2xl text-slate-300 leading-relaxed max-w-3xl mx-auto mb-6">
            The missing features Screen Time{' '}
            <span className="text-violet-400 font-semibold">should have</span> included.
          </p>

          <div className="flex flex-col xs:flex-row items-center justify-center gap-3 mb-12">
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
            <div className="flex items-center gap-2 text-slate-300">
              <span className="text-2xl font-bold">4.9</span>
              <span className="text-base">on the App Store</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16">
          <div
            className={`relative w-72 h-[600px] ${isVisible ? `translate-x-0 opacity-100` : `-translate-x-12 opacity-0`}`}
            style={{
              transition: `all 0.8s cubic-bezier(0.2, 1.4, 0.5, 1)`,
              transitionDelay: isVisible ? `400ms` : `0ms`,
            }}
          >
            <div className="relative w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 rounded-[3.5rem] p-5 shadow-2xl border border-slate-600/50">
              <div className="absolute top-36 left-1/2 -translate-x-1/2 w-28 h-28 rounded-3xl shadow-2xl overflow-hidden ring-4 ring-violet-500/30">
                <img
                  src="/gertrude-icon.png"
                  alt="Gertrude app icon"
                  className="w-full h-full"
                />
              </div>
              <div className="absolute top-7 left-1/2 -translate-x-1/2 w-24 h-2 bg-slate-600 rounded-full" />
            </div>
            <div className="absolute -inset-4 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 blur-2xl -z-10" />
          </div>

          <div
            className={`max-w-md ${isVisible ? `translate-x-0 opacity-100` : `translate-x-12 opacity-0`}`}
            style={{
              transition: `all 0.8s cubic-bezier(0.2, 1.4, 0.5, 1)`,
              transitionDelay: isVisible ? `600ms` : `0ms`,
            }}
          >
            <div className="space-y-3 mb-8">
              <Feature text="Block GIF searches in #images" />
              <Feature text="Block spotlight internet & image search" />
              <Feature text="Block album artwork in Spotify" />
              <Feature text="Remove images from Apple Maps" />
              <Feature text="Plus several more loopholes" />
            </div>

            <div className="flex flex-col xs:flex-row items-start gap-4">
              <FancyLink
                type="link"
                href="https://apps.apple.com/us/app/gertrude/id1672416108"
                size="lg"
                color="primary"
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
    <div className="flex-shrink-0 w-6 h-6 mt-0.5 rounded-lg bg-gradient-to-br from-violet-400 to-fuchsia-400 flex items-center justify-center shadow-lg shadow-violet-500/30">
      <svg
        className="w-4 h-4 text-slate-900"
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
    <span className="text-lg text-slate-200 leading-relaxed">{text}</span>
  </div>
);

export default IOSBlockAlt2;
