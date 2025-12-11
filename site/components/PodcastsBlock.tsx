'use client';

import { LockKeyholeIcon, PauseIcon, PodcastIcon, SkipBackIcon, SkipForwardIcon } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import Phone from './super-scroller-illustration/Phone';

const PodcastsBlock: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-gradient-to-br from-violet-700 to-fuchsia-600 px-6 sm:px-12 md:px-20 py-24 md:py-32 relative overflow-hidden min-h-screen flex flex-col justify-center">
      <div className="[background:radial-gradient(#ffffff33,transparent_60%)] w-176 h-176 absolute -right-80 -top-80" />
      <div className="[background:radial-gradient(#ffffff22,transparent_70%)] w-176 h-176 absolute -left-80 -bottom-80" />

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <PodcastIcon size={56} className="text-orange-300 drop-shadow-[0_0_12px_rgba(253,186,116,0.5)]" />
            <h2 className="text-5xl xs:text-6xl md:text-7xl font-bold">
              <span className="bg-gradient-to-b from-white to-fuchsia-200 bg-clip-text text-transparent">Gertrude</span>
              {` `}
              <span className="text-orange-300 tracking-tight animate-[glow-pulse_3s_ease-in-out_infinite]">AM</span>
            </h2>
          </div>
          <p className="text-2xl md:text-3xl font-medium mb-3">
            <span className="text-white/90">Safe</span>
            {` `}
            <span className="bg-gradient-to-r from-orange-200 to-orange-400 bg-clip-text text-transparent font-bold">Podcasts</span>
            {` `}
            <span className="text-white/90">for Kids</span>
          </p>
          <p className="text-lg text-fuchsia-100/90 max-w-2xl mx-auto">
            PIN-protected content control. Kids only listen to shows you approve.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div
            className={`relative flex items-center justify-center h-[500px] ${isVisible ? `opacity-100` : `opacity-0`}`}
            style={{
              transition: `opacity 0.6s ease-out`,
              transitionDelay: isVisible ? `200ms` : `0ms`,
            }}
          >
            <div
              className={`absolute left-12 top-12 ${isVisible ? `translate-x-0 translate-y-0` : `-translate-x-12 translate-y-8`}`}
              style={{
                transition: `transform 0.8s cubic-bezier(0.2, 1.2, 0.4, 1)`,
                transitionDelay: isVisible ? `400ms` : `0ms`,
              }}
            >
              <Tablet>
                <PodcastPlayerScreen />
              </Tablet>
            </div>
            <div
              className={`absolute -right-16 -bottom-44 z-10 ${isVisible ? `translate-x-0 translate-y-0` : `translate-x-12 translate-y-8`}`}
              style={{
                transition: `transform 0.8s cubic-bezier(0.2, 1.2, 0.4, 1)`,
                transitionDelay: isVisible ? `600ms` : `0ms`,
              }}
            >
              <Phone className="shadow-2xl scale-[0.47]" labelStatus="hidden">
                <PincodeScreen isVisible={isVisible} />
              </Phone>
            </div>
          </div>

          <div className="space-y-6">
            <FeatureCard
              icon={LockKeyholeIcon}
              title="PIN Protection"
              description="Require your PIN to search or subscribe to any podcast. Complete control over content."
              delay={isVisible ? 0 : 0}
            />
            <FeatureCard
              icon={PodcastIcon}
              title="Simple Listening"
              description="Once approved, kids browse episodes and download for offline play. New episodes arrive automatically."
              delay={isVisible ? 200 : 0}
            />
          </div>
        </div>

        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6">
          <a
            href="https://apps.apple.com/us/app/gertrude-am/id6738835146"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform duration-200 hover:scale-105"
          >
            <img
              src="/download-on-app-store.svg"
              alt="Download on the App Store"
              className="h-14"
            />
          </a>
          <div className="text-center sm:text-left">
            <p className="text-white/90 font-semibold">$10/year after 30-day trial</p>
            <p className="text-white/70 text-sm">Covers your entire Apple Family</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Tablet: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="w-[320px] h-[420px] rounded-[32px] bg-zinc-900 p-3 relative shadow-2xl">
    <div className="w-2.5 h-2.5 rounded-full bg-zinc-800 absolute left-1/2 -translate-x-1/2 top-3.5 z-10" />
    <div className="w-full h-full overflow-hidden rounded-[20px] bg-black">
      {children}
    </div>
  </div>
);

const PodcastPlayerScreen: React.FC = () => (
  <div className="w-full h-full bg-[rgb(237,233,254)] flex flex-col items-center justify-center p-6">
    <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-violet-400 to-fuchsia-500 shadow-xl mb-4 flex items-center justify-center">
      <span className="text-5xl">🎙️</span>
    </div>
    <h3 className="text-slate-800 font-bold text-lg mb-1">Story Pirates</h3>
    <p className="text-slate-500 text-sm mb-4">The Super Weird Episode</p>
    <div className="w-full max-w-[280px] mb-4">
      <div className="h-1 bg-slate-300 rounded-full overflow-hidden">
        <div className="h-full w-1/3 bg-violet-500 rounded-full" />
      </div>
      <div className="flex justify-between text-slate-400 text-xs mt-1">
        <span>12:34</span>
        <span>-24:18</span>
      </div>
    </div>
    <div className="flex items-center gap-6">
      <SkipBackIcon className="w-7 h-7 text-slate-400" />
      <div className="w-14 h-14 rounded-full bg-violet-500 flex items-center justify-center">
        <PauseIcon className="w-7 h-7 text-white fill-white" />
      </div>
      <SkipForwardIcon className="w-7 h-7 text-slate-400" />
    </div>
  </div>
);

interface PincodeScreenProps {
  isVisible: boolean;
}

const PincodeScreen: React.FC<PincodeScreenProps> = ({ isVisible }) => {
  const digits = [1, 2, 3, 4, 5, 6];
  const filledCount = 4;

  return (
    <div className="w-full h-full bg-[rgb(237,233,254)] flex flex-col">
      <div className="h-[17%] flex items-center justify-center">
        <p className="text-slate-500 text-sm">Search Podcasts</p>
      </div>
      <div className="h-[83%] bg-gradient-to-b from-slate-800 to-slate-900 rounded-t-3xl flex flex-col items-center justify-center p-6">
        <div className="w-12 h-1 bg-slate-600 rounded-full mb-6" />
        <h3 className="text-white font-semibold text-2xl mb-8">Enter PIN</h3>
        <div className="flex gap-3 mb-8">
          {digits.map((_, i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                i < filledCount
                  ? `bg-violet-500 border-violet-500`
                  : `border-slate-500`
              }`}
              style={{
                transitionDelay: isVisible ? `${1000 + i * 150}ms` : `0ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? `scale(1)` : `scale(0.5)`,
              }}
            />
          ))}
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, null].map((num, i) => (
            <div
              key={i}
              className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-medium ${
                num === null
                  ? ``
                  : `bg-violet-900 text-white active:bg-violet-800`
              }`}
            >
              {num}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, delay }) => {
  const [isVisible, setIsVisible] = useState(delay === 0);

  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => setIsVisible(true), delay);
      return () => clearTimeout(timer);
    }
  }, [delay]);

  return (
    <div
      className={`bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 transition-all duration-500 hover:bg-white/15 hover:border-white/30 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <Icon size={24} className="text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-white/90 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default PodcastsBlock;
