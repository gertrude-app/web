import React, { useState } from 'react';
import cx from 'classnames';
import { useInterval } from '../../app/lib/hooks';

const REF_DATE = new Date(2022, 8, 12).getTime();

const DepressingStatisticsBlock: React.FC = () => {
  const [websitesThisHour, setWebsitesThisHour] = useState(3 * 60 * 60);
  const [websitesToday, setWebsitesToday] = useState(3 * 60 * 60 * 24);
  const [websitesThisWeek, setWebsitesThisWeek] = useState(3 * 60 * 60 * 24 * 7);
  const [websitesSinceVisitingSite, setWebsitesSinceVisitingSite] = useState(0);

  useInterval(() => {
    setWebsitesThisHour(websitesThisHour + 1);
  }, 313);
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
    <div className="bg-slate-900 px-20 pt-40 pb-40 flex items-center flex-col gap-20">
      <div className="flex justify-center gap-20 relative">
        <div className="">
          <h2
            className={cx(
              `text-[120px] leading-[124px] font-bold w-fit [background-image:radial-gradient(at_top_left,white,transparent_50%),radial-gradient(at_center_150px,#d946ef,transparent_60%),linear-gradient(#8b5cf6,#8b5cf6)] bg-clip-text text-transparent`,
            )}
          >
            A losing
            <br />
            game
          </h2>
        </div>
        <div className="flex flex-col">
          <p className={cx(`text-2xl text-violet-300 max-w-2xl mb-20`)}>
            Most internet safety tools try to block{` `}
            <span className="font-bold text-violet-200">specific categories</span> of the
            internet. With{` `}
            <span className="font-bold text-violet-200">2 billion websites,</span> and
            tens of thousands more being added every day, it's simply impossible to
            maintain up-to-date lists correctly categorizing even a fraction of dangerous
            websites.
          </p>
          <TotalWebsitesCounter />
          <span className="text-violet-300 text-3xl self-end mt-2">
            websites on the internet
          </span>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-8 max-w-[1500px]">
        <Statistic
          statistic={websitesThisWeek}
          label={<span>New websites created this week</span>}
          className="col-span-2"
        />
        <Statistic
          statistic={`37%`}
          label={<span>Of all websites on the internet are porn</span>}
          className="row-span-2"
        />
        <Statistic
          statistic={websitesThisHour}
          label={<span>New websites in the last hour</span>}
        />
        <Statistic
          statistic={websitesToday}
          label={<span>New websites created in the last 24 hours</span>}
        />
        <Statistic
          statistic={websitesSinceVisitingSite}
          label={<span>New websites created since you visited this site</span>}
        />
        <Statistic statistic={3} label={<span>New websites created every second</span>} />
      </div>
    </div>
  );
};

export default DepressingStatisticsBlock;

const TotalWebsitesCounter: React.FC = () => {
  const [totalWebsites, setTotalWebsites] = React.useState(() => {
    const secondsSinceRefDate = Math.floor((Date.now() - REF_DATE) / 1000);
    const newWebsitesSinceRefDate = secondsSinceRefDate * 3;
    return 1_980_000_000 + newWebsitesSinceRefDate;
  });

  useInterval(() => {
    setTotalWebsites(totalWebsites + 1);
  }, 333);
  return (
    <div className="text-white text-9xl font-mono font-bold flex overflow-hidden">
      {totalWebsites
        .toLocaleString()
        .split(``)
        .map((digit, index) => {
          const isComma = digit === `,`;
          return (
            <div
              key={index}
              className={cx(`h-32 relative`, isComma ? `w-16` : `w-[72px]`)}
            >
              {isComma
                ? digit
                : [...Array(10).keys()].map((i) => (
                    <div
                      className={cx(`absolute transition-[top,opacity] duration-300`, {
                        'left-0 top-0': i === Number(digit),
                        'left-0 -top-24 opacity-0':
                          i === Number(digit) + 1 || (i === 0 && Number(digit) === 9),
                        'left-0 top-24 opacity-0':
                          i !== Number(digit) &&
                          i !== Number(digit) + 1 &&
                          (i !== 0 || Number(digit) !== 9),
                      })}
                      key={i}
                    >
                      {i}
                    </div>
                  ))}
            </div>
          );
        })}
    </div>
  );
};

interface StatisticProps {
  statistic: number | string;
  label: React.ReactNode;
  className?: string;
}

const Statistic: React.FC<StatisticProps> = ({ statistic, label, className }) => (
  <div className={cx(`p-12 rounded-3xl bg-slate-800`, className)}>
    <h3 className="text-5xl font-mono font-bold text-white">
      {typeof statistic === `string` ? statistic : statistic.toLocaleString()}
    </h3>
    <p className="text-violet-300 text-xl mt-4">{label}</p>
  </div>
);
