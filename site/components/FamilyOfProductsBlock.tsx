'use client';

import { LaptopIcon, MicIcon, SmartphoneIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const rotatingPhrases = [
  `internet safety.`,
  `protecting kids.`,
  `peace of mind.`,
  `normal parents.`,
];

const FamilyOfProductsBlock: React.FC = () => {
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
    <section className="bg-gradient-to-b from-black to-purple-950 px-6 sm:px-8 md:px-20 pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 md:pb-24 flex flex-col items-center">
      <div className="text-center max-w-5xl">
        <h1 className="text-5xl xs:text-6xl sm:text-7xl font-bold text-white !leading-[1.1em]">
          Tools for{` `}
          <span className="inline-block bg-gradient-to-r from-fuchsia-400 to-pink-500 bg-clip-text text-transparent">
            {displayedText}
            <span className="animate-blink">|</span>
          </span>
        </h1>
      </div>

      <div className="mt-16 md:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 w-full max-w-4xl">
        <ProductCard
          icon={SmartphoneIcon}
          label="iPhone & iPad"
          description="Plug holes in Screen Time, including #images GIF search"
        />
        <ProductCard
          icon={LaptopIcon}
          label="Mac"
          description="Comprehensive web filtering and screenshot monitoring"
        />
        <ProductCard
          icon={MicIcon}
          label="Podcasts"
          description="Parent-managed podcasts protected by PIN code"
        />
      </div>
    </section>
  );
};

interface ProductCardProps {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  description: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ icon: Icon, label, description }) => (
  <div className="flex flex-col items-center text-center group">
    <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 mb-6 transition-all duration-300 group-hover:scale-105 group-hover:bg-white/10 border border-white/10 group-hover:border-fuchsia-400/40 shadow-xl shadow-purple-950/50 group-hover:shadow-fuchsia-500/20">
      <Icon
        size={64}
        className="text-white transition-transform duration-300 group-hover:scale-110"
      />
    </div>
    <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-2 transition-colors duration-300 group-hover:text-fuchsia-300">
      {label}
    </h3>
    <p className="text-white/60 text-sm sm:text-base leading-snug">{description}</p>
  </div>
);

export default FamilyOfProductsBlock;
