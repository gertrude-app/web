'use client';

import {
  CalendarClockIcon,
  Clock4Icon,
  LockIcon,
  MonitorDot,
  RocketIcon,
  ShieldCheckIcon,
  SmartphoneIcon,
  TimerResetIcon,
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import FancyLink from './FancyLink';
import Computer from './super-scroller-illustration/Computer';

const MacOSBlock: React.FC = () => <Variation2 />;

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
    <section ref={sectionRef} className="xl:p-8 bg-gradient-to-b from-white to-slate-50">
      <div className="bg-slate-900 px-6 sm:px-12 md:px-20 py-24 md:py-32 lg:py-40 rounded-[40px] relative overflow-hidden">
        <div className="[background:radial-gradient(#a78bfa44,transparent_70%)] w-176 h-176 absolute -right-80 -top-80" />
        <div className="[background:radial-gradient(#e879f944,transparent_70%)] w-176 h-176 absolute -left-80 top-20" />

        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-20">
            <h2 className="text-5xl xs:text-6xl md:text-7xl lg:text-8xl font-bold [background-image:radial-gradient(at_top_left,white,transparent_50%),radial-gradient(at_center_150px,#d946ef,transparent_60%),linear-gradient(#8b5cf6,#8b5cf6)] bg-clip-text text-transparent mb-6">
              Gertrude for Mac
            </h2>
            <p className="text-xl md:text-2xl text-violet-300 max-w-3xl mx-auto">
              The complete internet safety solution. Block everything, unlock only what
              you approve.
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
              icon={MonitorDot}
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

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  delay,
}) => {
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
        isVisible ? `opacity-100 translate-y-0` : `opacity-0 translate-y-8`
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
  const [exitProgress, setExitProgress] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 },
    );

    if (stickyRef.current) {
      observer.observe(stickyRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!wrapperRef.current) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      const wrapperHeight = wrapperRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollableDistance = wrapperHeight - viewportHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));
      setExitProgress(progress);
    };

    window.addEventListener(`scroll`, handleScroll);
    return () => window.removeEventListener(`scroll`, handleScroll);
  }, []);

  return (
    <div ref={wrapperRef} className="h-[200vh] relative">
      <section
        ref={stickyRef}
        className="sticky top-0 min-h-screen bg-gradient-to-b from-white to-slate-50 overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-gradient-to-b from-violet-950 to-black pointer-events-none z-10"
          style={{ opacity: Math.max(0, (exitProgress - 0.25) / 0.75) * 0.9 }}
        />
        <div
          className="min-h-screen bg-slate-900 px-6 sm:px-12 md:px-20 pt-16 sm:pt-[15vh] pb-16 relative overflow-hidden"
          style={{
            filter: `blur(${Math.max(0, (exitProgress - 0.25) / 0.75) * 8}px)`,
          }}
        >
          <div className="[background:radial-gradient(#a78bfa44,transparent_70%)] w-176 h-176 absolute -right-80 -top-80" />
          <div className="[background:radial-gradient(#e879f944,transparent_70%)] w-176 h-176 absolute -left-80 top-20" />
          <div className="[background:radial-gradient(#a78bfa30,transparent_70%)] w-176 h-176 absolute -right-40 -bottom-96" />
          <div
            className={`absolute inset-0 flex items-start sm:items-end justify-center pt-24 sm:pt-0 sm:pb-[20rem] pointer-events-none transition-opacity duration-500 ${
              !isVisible
                ? `opacity-0`
                : exitProgress === 0
                  ? `opacity-30 sm:opacity-20 delay-[1500ms]`
                  : `opacity-30 sm:opacity-20`
            }`}
            style={
              exitProgress > 0.15
                ? {
                    opacity:
                      (window.innerWidth < 640 ? 0.3 : 0.2) *
                      (1 - (exitProgress - 0.15) / 0.85),
                  }
                : undefined
            }
          >
            <Computer className="scale-90 lg:scale-110" labelStatus="hidden">
              <div className="w-full h-full bg-slate-950" />
            </Computer>
          </div>

          <div className="max-w-6xl mx-auto relative">
            <div className="text-center mb-20">
              <div
                className={`inline-block px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20 ${
                  isVisible && exitProgress === 0
                    ? `translate-x-0 opacity-100`
                    : !isVisible
                      ? `translate-x-[500px] opacity-0`
                      : ``
                }`}
                style={{
                  transition: `transform 0.25s cubic-bezier(0.2, 1.4, 0.5, 1), opacity 0.25s ease-out`,
                  transitionDelay: isVisible && exitProgress === 0 ? `200ms` : `0ms`,
                  ...(exitProgress > 0.15 && {
                    transform: `translateX(${((exitProgress - 0.15) / 0.85) * 500}px)`,
                    opacity: 1 - (exitProgress - 0.15) / 0.85,
                  }),
                }}
              >
                <span className="text-sm font-bold bg-gradient-to-r from-violet-300 to-fuchsia-300 bg-clip-text text-transparent tracking-wider">
                  FLAGSHIP PRODUCT
                </span>
              </div>
              <h2
                className={`text-5xl xs:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 transition-all duration-500 ${
                  isVisible && exitProgress === 0
                    ? `translate-x-0 opacity-100`
                    : !isVisible
                      ? `-translate-x-24 opacity-0`
                      : ``
                }`}
                style={{
                  transitionDelay: isVisible && exitProgress === 0 ? `600ms` : `0ms`,
                  ...(exitProgress > 0.15 && {
                    transform: `translateX(${(-(exitProgress - 0.15) / 0.85) * 100}px)`,
                    opacity: 1 - (exitProgress - 0.15) / 0.85,
                  }),
                }}
              >
                <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                  Gertrude for{` `}
                </span>
                <span className="relative inline-block bg-gradient-to-r from-white to-violet-300 bg-clip-text text-transparent">
                  Mac
                  <svg
                    className="absolute bottom-0 left-0 w-full translate-y-2"
                    height="8"
                    viewBox="0 0 200 8"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient
                        id="mac-underline-gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop
                          offset="0%"
                          style={{ stopColor: `#a78bfa`, stopOpacity: 1 }}
                        />
                        <stop
                          offset="100%"
                          style={{ stopColor: `#e879f9`, stopOpacity: 1 }}
                        />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 0 4 Q 50 2, 100 4 T 200 4"
                      stroke="url(#mac-underline-gradient)"
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="butt"
                      pathLength="1"
                      strokeDasharray="1"
                      strokeDashoffset={isVisible ? 0 : 1}
                      style={{
                        transition: `stroke-dashoffset 0.2s ease-out`,
                        transitionDelay: isVisible ? `1000ms` : `0ms`,
                      }}
                    />
                  </svg>
                </span>
              </h2>
              <p
                className={`text-xl md:text-2xl text-violet-300 max-w-3xl mx-auto leading-relaxed transition-all duration-500 ${
                  isVisible && exitProgress === 0
                    ? `translate-x-0 opacity-100`
                    : !isVisible
                      ? `translate-x-24 opacity-0`
                      : ``
                }`}
                style={{
                  transitionDelay: isVisible && exitProgress === 0 ? `1000ms` : `0ms`,
                  ...(exitProgress > 0.15 && {
                    transform: `translateX(${((exitProgress - 0.15) / 0.85) * 100}px)`,
                    opacity: 1 - (exitProgress - 0.15) / 0.85,
                  }),
                }}
              >
                Comprehensive web filtering and activity monitoring. The most powerful
                parental controls ever built for macOS.
              </p>
            </div>

            <div
              className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-500 ${
                isVisible && exitProgress === 0
                  ? `translate-x-0 opacity-100`
                  : !isVisible
                    ? `-translate-x-24 opacity-0`
                    : ``
              }`}
              style={{
                transitionDelay: isVisible && exitProgress === 0 ? `1400ms` : `0ms`,
                ...(exitProgress > 0.15 && {
                  transform: `translateX(${(-(exitProgress - 0.15) / 0.85) * 100}px)`,
                  opacity: 1 - (exitProgress - 0.15) / 0.85,
                }),
              }}
            >
              <FeatureCardAlt
                icon={ShieldCheckIcon}
                title="Filter"
                description="Everything is blocked. Unlock only what you approve."
                delay={isVisible ? 0 : 0}
              />
              <FeatureCardAlt
                icon={MonitorDot}
                title="Record"
                description="Capture screenshots and typing for full transparency."
                delay={isVisible ? 150 : 0}
              />
              <FeatureCardAlt
                icon={Clock4Icon}
                title="Schedule"
                description="Allow apps and websites on custom timeframes."
                delay={isVisible ? 300 : 0}
              />
              <FeatureCardAlt
                icon={SmartphoneIcon}
                title="Relax"
                description="Control and monitor wherever you are, from any device."
                delay={isVisible ? 450 : 0}
              />
            </div>

            <div
              className={`flex flex-col items-center mt-16 gap-6 transition-opacity duration-500 ${
                isVisible && exitProgress === 0
                  ? `opacity-100`
                  : !isVisible
                    ? `opacity-0`
                    : ``
              }`}
              style={{
                transitionDelay: isVisible && exitProgress === 0 ? `1800ms` : `0ms`,
                ...(exitProgress > 0.15 && {
                  opacity: 1 - (exitProgress - 0.15) / 0.85,
                }),
              }}
            >
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
    </div>
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
    <section ref={sectionRef} className="xl:p-8 bg-gradient-to-b from-white to-slate-50">
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
                The complete internet safety solution with comprehensive filtering and
                monitoring.
              </p>

              <div className="space-y-6">
                <FeatureListItem
                  icon={LockIcon}
                  title="Inverted Filtering"
                  description="Block everything by default, unlock only what you approve"
                  delay={isVisible ? 0 : 0}
                />
                <FeatureListItem
                  icon={MonitorDot}
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

const FeatureCardAlt: React.FC<FeatureCardAltProps> = ({
  icon: Icon,
  title,
  description,
  delay,
}) => {
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
        isVisible ? `opacity-100 translate-y-0` : `opacity-0 translate-y-8`
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

const FeatureListItem: React.FC<FeatureListItemProps> = ({
  icon: Icon,
  title,
  description,
  delay,
}) => {
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
        isVisible ? `opacity-100 translate-x-0` : `opacity-0 -translate-x-8`
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
