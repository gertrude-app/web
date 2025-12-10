'use client';

import { LaptopIcon, PodcastIcon, TabletSmartphoneIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const rotatingPhrases = [
  `internet safety.`,
  `protecting kids.`,
  `peace of mind.`,
  `blocking porn.`,
  `normal parents.`,
  `clean content.`,
  `innocence.`,
];

const FamilyOfProductsBlockAlt: React.FC = () => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState(``);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = rotatingPhrases[phraseIndex] ?? ``;
    const typingSpeed = isDeleting ? 15 : 60;
    const pauseAfterTyping = 2000;
    const pauseAfterDeleting = 500;

    if (!isDeleting && displayedText === currentPhrase) {
      const timeout = setTimeout(() => setIsDeleting(true), pauseAfterTyping);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && displayedText === ``) {
      setIsDeleting(false);
      setPhraseIndex((current) => (current + 1) % rotatingPhrases.length);
      const timeout = setTimeout(() => {}, pauseAfterDeleting);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setDisplayedText(
        isDeleting
          ? currentPhrase.slice(0, displayedText.length - 1)
          : currentPhrase.slice(0, displayedText.length + 1),
      );
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, phraseIndex]);

  return (
    <section className="min-h-screen bg-gradient-to-br from-white via-white via-55% to-fuchsia-200 px-6 sm:px-8 md:px-20 pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 md:pb-24 flex flex-col items-center justify-center">
      <svg width="0" height="0" style={{ position: `absolute` }}>
        <defs>
          <linearGradient id="icon-gradient-alt" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: `#a855f7`, stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: `#d946ef`, stopOpacity: 1 }} />
          </linearGradient>
        </defs>
      </svg>
      <div className="text-center max-w-5xl">
        <h1 className="text-5xl xs:text-6xl sm:text-7xl font-bold text-slate-800 !leading-[1.15em]">
          <span className="block lg:inline">Tools for{` `}</span>
          <span className="inline-block bg-gradient-to-r from-purple-600 to-fuchsia-500 bg-clip-text text-transparent">
            {displayedText}
            <span className="animate-blink text-fuchsia-400">|</span>
          </span>
        </h1>
      </div>

      <div className="mt-16 md:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 w-full max-w-4xl">
        <ProductCard
          icon={TabletSmartphoneIcon}
          label="iPhone & iPad"
          description="Plug holes in Screen Time, including #images GIF search"
          delay={500}
        />
        <ProductCard
          icon={LaptopIcon}
          label="Mac"
          description="Comprehensive web filtering and screenshot monitoring"
          delay={700}
        />
        <ProductCard
          icon={PodcastIcon}
          label="Podcasts"
          description="Parent-managed podcasts protected by PIN code"
          delay={900}
        />
      </div>
    </section>
  );
};

interface ProductCardProps {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  description: string;
  delay: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  icon: Icon,
  label,
  description,
  delay,
}) => (
  <div
    className="flex flex-col items-center text-center group animate-fadeIn opacity-0"
    style={{ animationDelay: `${delay}ms`, animationFillMode: `forwards` }}
  >
    <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 mb-6 transition-all duration-300 group-hover:scale-105 border border-fuchsia-200 group-hover:border-fuchsia-400 shadow-lg shadow-fuchsia-100 group-hover:shadow-xl group-hover:shadow-fuchsia-200">
      <Icon
        size={64}
        className="[&_path]:stroke-[url(#icon-gradient-alt)] [&_rect]:stroke-[url(#icon-gradient-alt)] [&_line]:stroke-[url(#icon-gradient-alt)] transition-transform duration-300 group-hover:scale-110"
      />
    </div>
    <h3 className="text-2xl sm:text-3xl font-semibold text-slate-800 mb-2 transition-colors duration-300 group-hover:text-fuchsia-600">
      {label}
    </h3>
    <p className="text-slate-500 text-sm sm:text-base leading-snug max-w-[200px] sm:max-w-none antialiased">
      {description}
    </p>
  </div>
);

export default FamilyOfProductsBlockAlt;
