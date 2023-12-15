'use client';

import React from 'react';
import {
  DepressingStatisticsBlock,
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
  </main>
);
export default HomePage;
