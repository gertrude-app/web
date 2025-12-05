'use client';

import { LockIcon, MonitorIcon, RocketIcon, ShieldCheckIcon } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import FancyLink from './FancyLink';

const MacOSBlock: React.FC = () => {
  const [variation, setVariation] = useState<1 | 2 | 3>(1);

  return (
    <>
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <button
          onClick={() => setVariation(1)}
          className={`px-4 py-2 rounded ${variation === 1 ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}
        >
          V1a
        </button>
        <button
          onClick={() => setVariation(2)}
          className={`px-4 py-2 rounded ${variation === 2 ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}
        >
          V1b
        </button>
        <button
          onClick={() => setVariation(3)}
          className={`px-4 py-2 rounded ${variation === 3 ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}
        >
          V1c
        </button>
      </div>

      {variation === 1 && <Variation1 />}
      {variation === 2 && <Variation2 />}
      {variation === 3 && <Variation3 />}
    </>
  );
};

const Variation1: React.FC = () => {
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
    <section
      ref={sectionRef}
      className="xl:p-8 bg-gradient-to-b from-white to-slate-50"
    >
      <div className="bg-slate-900 px-6 sm:px-12 md:px-20 py-24 md:py-32 lg:py-40 rounded-[40px] relative overflow-hidden">
        <div className="[background:radial-gradient(#a78bfa44,transparent_70%)] w-176 h-176 absolute -right-80 -top-80" />
        <div className="[background:radial-gradient(#e879f944,transparent_70%)] w-176 h-176 absolute -left-80 top-20" />

        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-20">
            <h2 className="text-5xl xs:text-6xl md:text-7xl lg:text-8xl font-bold [background-image:radial-gradient(at_top_left,white,transparent_50%),radial-gradient(at_center_150px,#d946ef,transparent_60%),linear-gradient(#8b5cf6,#8b5cf6)] bg-clip-text text-transparent mb-6">
              Gertrude for Mac
            </h2>
            <p className="text-xl md:text-2xl text-violet-300 max-w-3xl mx-auto">
              The complete internet safety solution. Block everything, unlock only what you approve.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            <FeatureCard
              icon={LockIcon}
              title="Total Lockdown"
              description="Block the entire internet by default. Selectively unlock only approved sites—no categories, no guessing."
              delay={isVisible ? 0 : 0}
            />
            <FeatureCard
              icon={MonitorIcon}
              title="Full Monitoring"
              description="Screenshot capture and keystroke logging. See exactly what they're doing, on your schedule."
              delay={isVisible ? 200 : 0}
            />
            <FeatureCard
              icon={ShieldCheckIcon}
              title="Remote Control"
              description="Approve unlock requests from your phone. Manage multiple kids from anywhere, anytime."
              delay={isVisible ? 400 : 0}
            />
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
      className={`bg-slate-800 border border-slate-700 rounded-2xl p-8 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center mb-6">
        <Icon size={28} className="text-white" />
      </div>
      <h3 className="text-2xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-violet-300 text-base leading-relaxed">{description}</p>
    </div>
  );
};

const Variation2: React.FC = () => {
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
    <section
      ref={sectionRef}
      className="bg-gradient-to-b from-white to-slate-50"
    >
      <div className="bg-slate-900 px-6 sm:px-12 md:px-20 pt-24 md:pt-32 lg:pt-40 pb-16 md:pb-20 lg:pb-24 relative overflow-hidden">
        <div className="[background:radial-gradient(#a78bfa44,transparent_70%)] w-176 h-176 absolute -right-80 -top-80" />
        <div className="[background:radial-gradient(#e879f944,transparent_70%)] w-176 h-176 absolute -left-80 top-20" />
        <div className="[background:radial-gradient(#a78bfa44,transparent_70%)] w-176 h-176 absolute left-20 -bottom-96" />

        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-20">
            <div className="inline-block px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
              <span className="text-sm font-bold bg-gradient-to-r from-violet-300 to-fuchsia-300 bg-clip-text text-transparent tracking-wider">
                FLAGSHIP PRODUCT
              </span>
            </div>
            <h2 className="text-5xl xs:text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent mb-6">
              Gertrude for Mac
            </h2>
            <p className="text-xl md:text-2xl text-violet-300 max-w-3xl mx-auto leading-relaxed">
              Comprehensive web filtering and activity monitoring. The most powerful parental controls ever built for macOS.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCardAlt
              icon={LockIcon}
              title="Inverted Filtering"
              description="Block everything. Unlock only what you approve."
              delay={isVisible ? 0 : 0}
            />
            <FeatureCardAlt
              icon={MonitorIcon}
              title="Screenshots"
              description="See exactly what they see on their screen."
              delay={isVisible ? 150 : 0}
            />
            <FeatureCardAlt
              icon={ShieldCheckIcon}
              title="Keystroke Logs"
              description="Review everything they type to catch issues early."
              delay={isVisible ? 300 : 0}
            />
            <FeatureCardAlt
              icon={LockIcon}
              title="Remote Approval"
              description="Approve requests instantly from your phone."
              delay={isVisible ? 450 : 0}
            />
          </div>

          <div className="flex flex-col items-center mt-16 gap-6">
            <a
              href="https://parents.gertrude.app/signup"
              className="group relative px-10 py-5 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-2xl text-white text-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] active:scale-100"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-fuchsia-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center gap-3">
                <RocketIcon size={28} />
                Get started
              </span>
            </a>
            <p className="text-violet-300/60 text-base">
              $10/month for the whole family, 21 day free trial
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

interface CheckItemProps {
  text: string;
}

const CheckItem: React.FC<CheckItemProps> = ({ text }) => (
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

const Variation3: React.FC = () => {
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
    <section
      ref={sectionRef}
      className="xl:p-8 bg-gradient-to-b from-white to-slate-50"
    >
      <div className="bg-slate-900 px-6 sm:px-12 md:px-20 py-24 md:py-32 lg:py-40 rounded-[40px] relative overflow-hidden">
        <div className="[background:radial-gradient(#a78bfa44,transparent_70%)] w-176 h-176 absolute -right-80 -top-80" />
        <div className="[background:radial-gradient(#e879f944,transparent_70%)] w-176 h-176 absolute -left-80 top-20" />

        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl xs:text-6xl md:text-7xl lg:text-8xl font-bold [background-image:radial-gradient(at_top_left,white,transparent_50%),radial-gradient(at_center_150px,#d946ef,transparent_60%),linear-gradient(#8b5cf6,#8b5cf6)] bg-clip-text text-transparent mb-8">
                Gertrude for Mac
              </h2>
              <p className="text-xl md:text-2xl text-violet-300 leading-relaxed mb-12">
                The complete internet safety solution with comprehensive filtering and monitoring.
              </p>

              <div className="space-y-6">
                <FeatureListItem
                  icon={LockIcon}
                  title="Inverted Filtering"
                  description="Block everything by default, unlock only what you approve"
                  delay={isVisible ? 0 : 0}
                />
                <FeatureListItem
                  icon={MonitorIcon}
                  title="Full Monitoring"
                  description="Screenshots and keystroke logs show exactly what they do"
                  delay={isVisible ? 150 : 0}
                />
                <FeatureListItem
                  icon={ShieldCheckIcon}
                  title="Remote Control"
                  description="Manage and approve from your phone, anywhere, anytime"
                  delay={isVisible ? 300 : 0}
                />
              </div>
            </div>

            <div className="relative">
              <div className="relative bg-slate-800 border-2 border-violet-500/30 rounded-3xl p-10 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 rounded-3xl" />
                <div className="relative space-y-8">
                  <StatisticItem
                    number="100%"
                    label="Internet Blocked"
                    sublabel="Until you approve"
                  />
                  <StatisticItem
                    number="24/7"
                    label="Active Monitoring"
                    sublabel="Screenshots & keystrokes"
                  />
                  <StatisticItem
                    number="∞"
                    label="Kids Supported"
                    sublabel="One account, whole family"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface FeatureCardAltProps {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
  delay: number;
}

const FeatureCardAlt: React.FC<FeatureCardAltProps> = ({ icon: Icon, title, description, delay }) => {
  const [isVisible, setIsVisible] = useState(delay === 0);

  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => setIsVisible(true), delay);
      return () => clearTimeout(timer);
    }
  }, [delay]);

  return (
    <div
      className={`bg-slate-800/50 backdrop-blur-sm border border-violet-500/20 rounded-2xl p-6 transition-all duration-500 hover:border-violet-500/40 hover:bg-slate-800/70 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center mb-4">
        <Icon size={24} className="text-white" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-violet-300/80 text-sm leading-snug">{description}</p>
    </div>
  );
};

interface FeatureListItemProps {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
  delay: number;
}

const FeatureListItem: React.FC<FeatureListItemProps> = ({ icon: Icon, title, description, delay }) => {
  const [isVisible, setIsVisible] = useState(delay === 0);

  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => setIsVisible(true), delay);
      return () => clearTimeout(timer);
    }
  }, [delay]);

  return (
    <div
      className={`flex items-start gap-4 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
      }`}
    >
      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
        <Icon size={24} className="text-white" />
      </div>
      <div>
        <h3 className="text-xl font-semibold text-white mb-1">{title}</h3>
        <p className="text-violet-300/80 text-base leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

interface StatisticItemProps {
  number: string;
  label: string;
  sublabel: string;
}

const StatisticItem: React.FC<StatisticItemProps> = ({ number, label, sublabel }) => (
  <div className="border-l-4 border-violet-500 pl-6">
    <div className="text-5xl font-bold bg-gradient-to-r from-violet-300 to-fuchsia-300 bg-clip-text text-transparent mb-2">
      {number}
    </div>
    <div className="text-lg font-semibold text-white">{label}</div>
    <div className="text-sm text-violet-400">{sublabel}</div>
  </div>
);

export default MacOSBlock;
