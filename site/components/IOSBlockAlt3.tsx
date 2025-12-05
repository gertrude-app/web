'use client';

import { StarIcon } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import FancyLink from './FancyLink';

const IOSBlockAlt3: React.FC = () => {
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
      <div className="max-w-6xl w-full py-12 xs:py-16 md:py-24">
        <div className="bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-3xl md:rounded-[3rem] p-8 md:p-12 lg:p-16 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-fuchsia-500/20 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="text-center mb-12">
              <div
                className={`inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 px-5 py-2.5 rounded-full mb-6 ${isVisible ? `translate-y-0 opacity-100` : `-translate-y-4 opacity-0`}`}
                style={{
                  transition: `all 0.6s cubic-bezier(0.2, 1.4, 0.5, 1)`,
                  transitionDelay: isVisible ? `200ms` : `0ms`,
                }}
              >
                <span className="text-sm font-bold text-white">100% FREE</span>
              </div>

              <h2 className="text-4xl xs:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Gertrude for iPhone & iPad
              </h2>

              <p className="text-lg xs:text-xl md:text-2xl text-violet-100 leading-relaxed max-w-3xl mx-auto mb-8">
                The missing features Screen Time should have included.
              </p>

              <div className="flex flex-col xs:flex-row items-center justify-center gap-3 mb-12">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      size={24}
                      className="fill-amber-300 text-amber-300"
                      strokeWidth={0}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2 text-white">
                  <span className="text-2xl font-bold">4.9</span>
                  <span className="text-base">on the App Store</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div
                className={`relative flex items-center justify-center h-[450px] order-2 md:order-1 ${isVisible ? `scale-100 opacity-100` : `scale-90 opacity-0`}`}
                style={{
                  transition: `all 0.8s cubic-bezier(0.2, 1.4, 0.5, 1)`,
                  transitionDelay: isVisible ? `400ms` : `0ms`,
                }}
              >
                <div className="relative w-64 h-[550px] bg-gradient-to-br from-slate-800 to-slate-900 rounded-[3rem] p-4 shadow-2xl rotate-6 hover:rotate-0 transition-transform duration-500">
                  <div className="absolute top-32 left-1/2 -translate-x-1/2 w-24 h-24 rounded-2xl shadow-lg overflow-hidden">
                    <img
                      src="/gertrude-icon.png"
                      alt="Gertrude app icon"
                      className="w-full h-full"
                    />
                  </div>
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 w-20 h-1.5 bg-slate-700 rounded-full" />
                </div>
              </div>

              <div className="order-1 md:order-2">
                <div className="space-y-4 mb-8">
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
    <div className="flex-shrink-0 w-6 h-6 mt-0.5 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
      <svg
        className="w-4 h-4 text-violet-600"
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
    <span className="text-lg text-white leading-relaxed">{text}</span>
  </div>
);

export default IOSBlockAlt3;
