'use client';

import { LockKeyholeIcon, PodcastIcon } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import FancyLink from './FancyLink';

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
      { threshold: 0.5 },
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

        <div className="grid md:grid-cols-2 gap-2 items-center">
          <div
            className={`relative flex items-center justify-center ${isVisible ? `scale-100 opacity-100` : `scale-90 opacity-0`}`}
            style={{
              transition: `all 0.8s cubic-bezier(0.2, 1.4, 0.5, 1)`,
              transitionDelay: isVisible ? `400ms` : `0ms`,
            }}
          >
            <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl" />
            <img
              src="/docs/images/gertrude-am-radio.png"
              alt="Gertrude AM Radio"
              className="relative w-80 h-auto drop-shadow-2xl rounded-3xl"
            />
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
