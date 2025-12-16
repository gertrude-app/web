import type { NextPage } from 'next';
import AboutBlock from '@/components/AboutBlock';
import FamilyOfProductsBlock from '@/components/FamilyOfProductsBlock';
import IOSBlock from '@/components/IOSBlock';
import MacOSBlock from '@/components/MacOSBlock';
import PodcastsBlock from '@/components/PodcastsBlock';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata(
  `Gertrude | Parental Controls for Mac, iPhone, and iPad`,
  `Protect your kids online with easy-to-use parental controls`,
);

const HomePage: NextPage = () => (
  <main>
    <FamilyOfProductsBlock />
    <MacOSBlock />
    <IOSBlock />
    <PodcastsBlock />
    <AboutBlock />
  </main>
);

export default HomePage;
