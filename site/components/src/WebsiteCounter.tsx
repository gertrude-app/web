import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { useIntersectionObserver, useInterval } from '../../app/lib/hooks';

const REF_DATE = new Date(2022, 8, 12).getTime();

const WebsiteCounter: React.FC = () => {
  const [totalWebsites, setTotalWebsites] = useState(2_109_792_000);
  const [websitesThisHour, setWebsitesThisHour] = useState(3 * 60 * 60);
  const [websitesToday, setWebsitesToday] = useState(3 * 60 * 60 * 24);
  const [websitesThisWeek, setWebsitesThisWeek] = useState(3 * 60 * 60 * 24 * 7);
  const [websitesSinceVisitingSite, setWebsitesSinceVisitingSite] = useState(0);
  const { ref, intersected } = useIntersectionObserver({
    rootMargin: `0px`,
    threshold: 1,
  });

  const [windowHeight, setWindowHeight] = useState(800);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    // prevent hydration errors
    const secondsSinceRefDate = Math.floor((Date.now() - REF_DATE) / 1000);
    const newWebsitesSinceRefDate = secondsSinceRefDate * 3;
    setTotalWebsites(1_980_000_000 + newWebsitesSinceRefDate);
  }, [windowHeight]);

  useInterval(() => {
    setTotalWebsites(totalWebsites + 1);
  }, 313);
  useInterval(() => {
    setWebsitesThisHour(websitesThisHour + 1);
  }, 333);
  useInterval(() => {
    setWebsitesToday(websitesToday + 1);
  }, 353);
  useInterval(() => {
    setWebsitesThisWeek(websitesThisWeek + 1);
  }, 323);
  useInterval(() => {
    setWebsitesSinceVisitingSite(websitesSinceVisitingSite + 1);
  }, 343);

  return (
    <div className="flex justify-center flex-col pt-12 mt-8 md:mt-10 relative z-10 px-16">
      <div className="flex flex-col items-start space-y-2 sm:space-y-3 lg:space-y-4">
        <h2 className="font-inter text-4xl xs:text-5xl sm:text-6xl lg:text-[9.5rem] text-white w-[716px]">
          {totalWebsites.toLocaleString()}
          <br />
        </h2>
        <h3 className="text-2xl sm:text-3xl lg:text-4xl text-slate-400 font-medium sm:font-bold tracking-wider">
          websites on the internet*
        </h3>
      </div>
      <div className="flex justify-center items-center">
        {/* intersection observer: */}
        <div ref={ref} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-16 mx-16">
          <Statistic
            visible={intersected}
            delay={0}
            className="col-span-1 lg:col-span-2 hidden md:block"
          >
            <ImportantNumber>{websitesThisWeek.toLocaleString()}</ImportantNumber>
            <InfoText>
              New websites created <Em>this week</Em>
            </InfoText>
            <div className="absolute -right-8 -bottom-8 w-60 h-48 bg-rain rounded-3xl hidden lg:block" />
          </Statistic>
          <Statistic visible={intersected} delay={250} className="order-1">
            <ImportantNumber>3</ImportantNumber>
            <InfoText>
              New websites created <Em>every second</Em>‡
            </InfoText>
          </Statistic>
          <Statistic
            visible={intersected}
            delay={150}
            className="row-span-1 lg:row-span-2 order-4 md:order-none"
          >
            <ImportantNumber>37%</ImportantNumber>
            <InfoText>
              Of all websites on the internet <Em>are porn</Em>†
            </InfoText>
            <div className="absolute -left-8 -bottom-8 w-60 h-60 bg-rain rounded-xl hidden lg:block" />
          </Statistic>
          <Statistic visible={intersected} delay={50} className="hidden md:block">
            <ImportantNumber>{websitesThisHour.toLocaleString()}</ImportantNumber>
            <InfoText>
              New websites in the <Em>last hour</Em>
            </InfoText>
          </Statistic>
          <Statistic visible={intersected} delay={200} className="order-3 md:order-none">
            <ImportantNumber>{websitesToday.toLocaleString()}</ImportantNumber>
            <InfoText>
              New websites created in the <Em>last 24 hours</Em>
            </InfoText>
          </Statistic>
          <Statistic
            visible={intersected}
            delay={100}
            className="col-span-1 lg:col-span-2 xl:col-span-1 order-2 md:order-none"
          >
            <ImportantNumber>
              {websitesSinceVisitingSite.toLocaleString()}
            </ImportantNumber>
            <InfoText>
              New websites created since you visited <Em>this site</Em>
            </InfoText>
          </Statistic>
        </div>
      </div>
      <div className="mt-16 flex gap-8 *flex-col antialiased justify-center items-center -space-y-1.5">
        <a
          className="transition-opacity opacity-20 hover:opacity-30 text-white text-sm"
          href="https://firstsiteguide.com/how-many-websites/"
        >
          <span className="text-white text-opacity-40 text-lg">*</span>
          {` `}
          https://firstsiteguide.com/how-many-websites
        </a>
        <a
          className="transition-opacity opacity-20 hover:opacity-30 text-white text-sm"
          href="https://siteefy.com/how-many-websites-are-there/"
        >
          <span className="text-white text-opacity-40 text-lg">‡</span>
          {` `}
          https://siteefy.com/how-many-websites-are-there
        </a>
        <a
          className="transition-opacity opacity-20 hover:opacity-30 text-white text-sm"
          href="https://www.bbc.com/news/technology-23030090"
        >
          <span className="text-white text-opacity-40 text-lg">†</span>
          {` `}
          https://www.bbc.com/news/technology-23030090
        </a>
      </div>
    </div>
  );
};

export default WebsiteCounter;

interface StatisticProps {
  children: React.ReactNode;
  className?: string;
  delay: number;
  visible: boolean;
}

const Statistic: React.FC<StatisticProps> = ({ children, className, delay, visible }) => {
  const [appeared, setAppeared] = useState(false);
  const { ref, intersected } = useIntersectionObserver({
    rootMargin: `25px`,
    threshold: 1,
  });
  const [windowWidth, setWindowWidth] = useState(1025);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, [windowWidth]);

  useEffect(() => {
    if (visible) {
      setTimeout(() => setAppeared(true), delay);
    }
  }, [visible, appeared, delay]);

  return (
    <div
      className={cx(
        `p-10 bg-slate-800 rounded-xl shadow-xl border-slate-700 border-[0.5px] relative overflow-hidden transition-[opacity,transform] duration-200`,
        // when cards are stacked, make them appear one at a time; otherwise with cool synchronized animation
        (windowWidth < 1024 ? intersected : appeared)
          ? `opacity-100`
          : `opacity-0 translate-y-4`,
        className,
      )}
      ref={ref}
    >
      {children}
    </div>
  );
};

interface ImportantNumberProps {
  children: React.ReactNode;
}

const ImportantNumber: React.FC<ImportantNumberProps> = ({ children }) => (
  <h3 className="text-7xl text-white font-inter relative">{children}</h3>
);

interface EmProps {
  children: React.ReactNode;
}

const Em: React.FC<EmProps> = ({ children }) => (
  <span className="font-extrabold italic bg-gradient-to-br from-violet-400 to-fuchsia-400 text-transparent bg-clip-text pr-1 relative">
    {children}
  </span>
);

interface InfoTextProps {
  children: React.ReactNode;
  citation?: string;
}

const InfoText: React.FC<InfoTextProps> = ({ children }) => (
  <p className="mt-4 text-white text-opacity-60 font-medium text-2xl relative z-10">
    {children}
  </p>
);
