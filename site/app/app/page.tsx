'use client';

import React from 'react';
import {
  DepressingStatisticsBlock,
  HeroBlock,
  MainHeader,
  PeaceOfMindForParentsBlock,
} from '@site/components';
import type { NextPage } from 'next';

const HomePage: NextPage = () => (
  <main>
    <MainHeader />
    <HeroBlock />
    <PeaceOfMindForParentsBlock />
    <DepressingStatisticsBlock />
  </main>
);
export default HomePage;
