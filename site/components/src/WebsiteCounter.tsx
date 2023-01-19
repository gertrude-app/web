import React, { useEffect, useState } from 'react';
import cx from 'classnames';

const WebsiteCounter: React.FC = () => {
  const [totalWebsites, setTotalWebsites] = useState(1938726736);
  const [websitesThisHour, setWebsitesThisHour] = useState(3 * 60 * 60);
  const [websitesToday, setWebsitesToday] = useState(3 * 60 * 60 * 24);
  const [websitesThisWeek, setWebsitesThisWeek] = useState(3 * 60 * 60 * 24 * 7);
  const [websitesSinceVisitingSite, setWebsitesSinceVisitingSite] = useState(0);

  useInterval(() => {
    setTotalWebsites(totalWebsites + 1);
    setWebsitesThisHour(websitesThisHour + 1);
    setWebsitesToday(websitesToday + 1);
    setWebsitesThisWeek(websitesThisWeek + 1);
    setWebsitesSinceVisitingSite(websitesSinceVisitingSite + 1);
  }, 333);

  return (
    <div className="flex justify-center flex-col pt-12 mt-20 relative z-10">
      <div className="flex flex-col items-start space-y-6">
        <h2 className="font-inter text-8xl text-white w-[716px]">
          {totalWebsites.toLocaleString()}
        </h2>
        <h3 className="text-4xl text-white text-opacity-60 font-bold tracking-wider">
          websites on the internet
        </h3>
      </div>
      <div className="grid grid-cols-4 gap-6 mt-16">
        <Statistic className="col-span-2">
          <ImportantNumber>{websitesThisWeek.toLocaleString()}</ImportantNumber>
          <InfoText>
            New websites created <Em>this week</Em>
          </InfoText>
          <div className="absolute -right-8 -bottom-8 w-60 h-48 bg-rain rounded-3xl" />
        </Statistic>
        <Statistic>
          <ImportantNumber>3</ImportantNumber>
          <InfoText>
            New websites created <Em>every second</Em>
          </InfoText>
        </Statistic>
        <Statistic className="row-span-2">
          <ImportantNumber>37%</ImportantNumber>
          <InfoText>
            Of all websites on the internet <Em>are porn</Em>
          </InfoText>
          <div className="absolute -left-8 -bottom-8 w-60 h-60 bg-rain rounded-xl" />
        </Statistic>
        <Statistic>
          <ImportantNumber>{websitesThisHour.toLocaleString()}</ImportantNumber>
          <InfoText>
            New websites created <Em>this hour</Em>
          </InfoText>
        </Statistic>
        <Statistic>
          <ImportantNumber>{websitesToday.toLocaleString()}</ImportantNumber>
          <InfoText>
            New websites created <Em>today</Em>
          </InfoText>
        </Statistic>
        <Statistic>
          <ImportantNumber>{websitesSinceVisitingSite.toLocaleString()}</ImportantNumber>
          <InfoText>
            New websites created since you visited <Em>this site</Em>
          </InfoText>
        </Statistic>
      </div>
    </div>
  );
};

export default WebsiteCounter;

interface StatisticProps {
  children: React.ReactNode;
  className?: string;
}

const Statistic: React.FC<StatisticProps> = ({ children, className }) => {
  return (
    <div
      className={cx(
        'p-10 bg-slate-800 rounded-xl shadow-xl border-gray-700 border-[0.5px] relative overflow-hidden',
        className,
      )}
    >
      {children}
    </div>
  );
};

interface ImportantNumberProps {
  children: React.ReactNode;
}

const ImportantNumber: React.FC<ImportantNumberProps> = ({ children }) => {
  return <h3 className="text-5xl text-white font-lato relative">{children}</h3>;
};

interface EmProps {
  children: React.ReactNode;
}

const Em: React.FC<EmProps> = ({ children }) => {
  return (
    <span className="font-extrabold italic bg-gradient-to-br from-violet-400 to-fuchsia-400 text-transparent bg-clip-text pr-1 relative">
      {children}
    </span>
  );
};

interface InfoTextProps {
  children: React.ReactNode;
}

const InfoText: React.FC<InfoTextProps> = ({ children }) => {
  return (
    <p className="mt-4 text-white text-opacity-60 font-medium text-lg relative z-10">
      {children}
    </p>
  );
};

function useInterval(callback: () => void, delay: number): void {
  const savedCallback = React.useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick(): void {
      savedCallback.current && savedCallback.current();
    }
    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}
