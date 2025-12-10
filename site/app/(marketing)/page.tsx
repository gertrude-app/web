import React from 'react';
import type { NextPage } from 'next';
import AboutBlock from '@/components/AboutBlock';
import FamilyOfProductsBlock from '@/components/FamilyOfProductsBlock';
import FamilyOfProductsBlockAlt from '@/components/FamilyOfProductsBlockAlt';
import IOSBlock from '@/components/IOSBlock';
import IOSBlockAlt1 from '@/components/IOSBlockAlt1';
import IOSBlockAlt2 from '@/components/IOSBlockAlt2';
import IOSBlockAlt3 from '@/components/IOSBlockAlt3';
import MacOSBlock from '@/components/MacOSBlock';
import PodcastsBlock from '@/components/PodcastsBlock';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata(
  `Gertrude | Parental Controls for Mac, iOS, and Podcasts`,
  `Protect your kids online with easy-to-use parental controls`,
);

const HomePage: NextPage = () => (
  <main>
    <FamilyOfProductsBlockAlt />
    {/* <FamilyOfProductsBlock /> */}
    <MacOSBlock />
    <IOSBlockAlt1 />
    {/* <IOSBlock /> */}
    <PodcastsBlock />
    <AboutBlock />
  </main>
);

export default HomePage;
