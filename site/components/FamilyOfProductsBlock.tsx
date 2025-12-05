import { LaptopIcon, MicIcon, SmartphoneIcon } from 'lucide-react';
import React from 'react';

const FamilyOfProductsBlock: React.FC = () => (
  <section className="bg-gradient-to-b from-violet-500 to-fuchsia-500 px-6 sm:px-8 md:px-20 py-20 sm:py-28 md:py-40 flex flex-col items-center">
    <div className="text-center max-w-5xl">
      <h1 className="text-5xl xs:text-6xl sm:text-7xl font-bold text-white !leading-[1.1em]">
        Tools for protecting kids
      </h1>
      <p className="mt-6 text-lg sm:text-xl text-white/70 leading-relaxed">
        Made by a parent, for parents
      </p>
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
