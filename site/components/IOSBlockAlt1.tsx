'use client';

import { StarIcon } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import FancyLink from './FancyLink';

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
      className="bg-gradient-to-br from-violet-50 via-white to-fuchsia-50 px-4 xs:px-8 sm:px-12 md:px-20 flex flex-col items-center overflow-hidden"
    >
      <div className="max-w-6xl w-full py-12 xs:py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="order-2 md:order-1">
            <div className="relative inline-block mb-6">
              <div
                className={`inline-flex items-center gap-2 bg-white border-2 border-violet-200 px-4 py-2 rounded-full ${isVisible ? `scale-100 opacity-100` : `scale-75 opacity-0`}`}
                style={{
                  transition: `all 0.4s cubic-bezier(0.2, 1.4, 0.5, 1)`,
                  transitionDelay: isVisible ? `300ms` : `0ms`,
                }}
              >
                <span className="text-sm font-bold bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
                  100% FREE
                </span>
              </div>
            </div>

            <h2 className="text-4xl xs:text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Gertrude for iPhone & iPad
            </h2>

            <div className="flex items-center gap-3 mb-6">
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

            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              The missing features Screen Time should have included.
            </p>

            <div className="space-y-3 mb-8 bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-violet-100">
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

          <div className="order-1 md:order-2 relative flex items-center justify-center h-[500px]">
            <div
              className={`relative w-64 h-[550px] bg-gradient-to-br from-slate-800 to-slate-900 rounded-[3rem] p-4 shadow-2xl ${isVisible ? `translate-y-0 opacity-100` : `translate-y-12 opacity-0`}`}
              style={{
                transition: `all 0.6s cubic-bezier(0.2, 1.4, 0.5, 1)`,
                transitionDelay: isVisible ? `600ms` : `0ms`,
              }}
            >
              <div className="absolute top-32 left-1/2 -translate-x-1/2 w-24 h-24 rounded-2xl shadow-lg overflow-hidden">
                <img
                  src="/gertrude-icon.png"
                  alt="Gertrude app icon"
                  className="w-full h-full"
                />
              </div>
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-20 h-1.5 bg-slate-700 rounded-full" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-violet-400/30 to-fuchsia-400/30 blur-3xl -z-10" />
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
