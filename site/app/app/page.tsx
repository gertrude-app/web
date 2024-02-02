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
  TestimonialsBlock,
  CTABlock,
  MainFooter,
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
    <TestimonialsBlock />
    <CTABlock />
    <MainFooter />
  </main>
);
export default HomePage;
