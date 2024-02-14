'use client';

import React from 'react';
import {
  DefenseInDepthBlock,
  DepressingStatisticsBlock,
  FeaturesBlock,
  HeroBlock,
  PeaceOfMindForParentsBlock,
  SuperScrollerBlock,
  TestimonialsBlock,
  CTABlock,
} from '@site/components';
import type { NextPage } from 'next';

const HomePage: NextPage = () => (
  <main>
    <HeroBlock />
    <PeaceOfMindForParentsBlock />
    <DepressingStatisticsBlock />
    <SuperScrollerBlock />
    <FeaturesBlock />
    <DefenseInDepthBlock />
    <TestimonialsBlock />
    <CTABlock />
  </main>
);

export default HomePage;
