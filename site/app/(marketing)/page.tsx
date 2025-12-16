import type { NextPage } from 'next';
import HiImJared from '@/components/HiImJared';
import ToolsForSafetyBlock from '@/components/ToolsForSafetyBlock';
import GertrudeForIOS from '@/components/GertrudeForIOS';
import GertrudeForMac from '@/components/GertrudeForMac';
import PodcastsBlock from '@/components/PodcastsBlock';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata(
  `Gertrude | Parental Controls for Mac, iPhone, and iPad`,
  `Protect your kids online with easy-to-use parental controls`,
);

const HomePage: NextPage = () => (
  <main>
    <ToolsForSafetyBlock />
    <GertrudeForMac />
    <GertrudeForIOS />
    <PodcastsBlock />
    <HiImJared />
  </main>
);

export default HomePage;
