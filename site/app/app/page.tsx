'use client';

import React from 'react';
import {
  DefenseInDepthBlock,
  DepressingStatisticsBlock,
  FeaturesBlock,
  HeroBlock,
  MainHeader,
  PeaceOfMindForParentsBlock,
  SuperScrollerBlock,
} from '@site/components';
import type { NextPage } from 'next';

const HomePage: NextPage = () => (
  <main>
    <MainHeader />
    <HeroBlock />
    <PeaceOfMindForParentsBlock />
    <DepressingStatisticsBlock />
    <SuperScrollerBlock />
    <FeaturesBlock />
    <DefenseInDepthBlock />
  </main>
);
export default HomePage;