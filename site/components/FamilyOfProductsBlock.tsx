'use client';

import { LaptopIcon, MicIcon, SmartphoneIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const rotatingPhrases = ['protecting kids.', 'internet safety.', 'peace of mind.', 'normal parents.'];

const FamilyOfProductsBlock: React.FC = () => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = rotatingPhrases[phraseIndex];
    const typingSpeed = isDeleting ? 15 : 60;
    const pauseAfterTyping = 2000;
    const pauseAfterDeleting = 500;

    if (!isDeleting && displayedText === currentPhrase) {
      const timeout = setTimeout(() => setIsDeleting(true), pauseAfterTyping);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && displayedText === '') {
      setIsDeleting(false);
      setPhraseIndex((current) => (current + 1) % rotatingPhrases.length);
      const timeout = setTimeout(() => {}, pauseAfterDeleting);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setDisplayedText(
        isDeleting
          ? currentPhrase.slice(0, displayedText.length - 1)
          : currentPhrase.slice(0, displayedText.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, phraseIndex]);

  return (
    <section className="bg-gradient-to-b from-black to-purple-950 px-6 sm:px-8 md:px-20 pt-16 sm:pt-20 md:pt-24 pb-20 sm:pb-28 md:pb-40 flex flex-col items-center">
      <div className="text-center max-w-5xl">
        <h1 className="text-5xl xs:text-6xl sm:text-7xl font-bold text-white !leading-[1.1em]">
          Tools for{' '}
          <span className="inline-block bg-gradient-to-r from-fuchsia-400 to-pink-500 bg-clip-text text-transparent">
            {displayedText}
            <span className="animate-blink">|</span>
          </span>
        </h1>
      </div>

      <div className="mt-16 md:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 w-full max-w-4xl">
        <ProductCard
          icon={LaptopIcon}
          label="Mac"
          description="Block the entire internet, unlock only what's safe"
        />
        <ProductCard
          icon={SmartphoneIcon}
          label="iPhone & iPad"
          description="Simple, powerful screen time controls"
        />
        <ProductCard
          icon={MicIcon}
          label="Podcasts"
          description="Safe, curated podcasts for kids"
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
    <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 mb-6 transition-transform duration-300 group-hover:scale-105 group-hover:bg-white/20">
      <Icon size={64} className="text-white" />
    </div>
    <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-2">{label}</h3>
    <p className="text-white/70 text-base sm:text-lg leading-relaxed">{description}</p>
  </div>
);

export default FamilyOfProductsBlock;
