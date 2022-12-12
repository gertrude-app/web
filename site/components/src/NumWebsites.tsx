import React, { useState, useEffect } from 'react';

const NumWebsites: React.FC = () => {
  const [total, setTotal] = useState(1938726736);
  const [video, setVideo] = useState(1);
  const [hour, setHour] = useState(60 * 60 * 3);
  const [day, setDay] = useState(60 * 60 * 3 * 24);
  const [week, setWeek] = useState(60 * 60 * 3 * 24 * 7);

  useInterval(() => {
    setTotal(total + 1);
  }, 333);

  useInterval(() => {
    setVideo(video + 1);
  }, 328);

  useInterval(() => {
    setHour(hour + 1);
  }, 339);

  useInterval(() => {
    setDay(day + 1);
  }, 324);

  useInterval(() => {
    setWeek(week + 1);
  }, 342);

  return (
    <section className="w-[1280px] h-[720px] bg-gradient-to-b from-gray-900 to-gray-800 px-[150px] pt-16 md:pt-28 pb-12 *flex items-center flex-col relative overflow-hidden">
      <div className="w-176 h-176 absolute bg-fuchsia-radial-gradient -right-128 -top-72 z-20" />
      <div className="w-176 h-176 absolute bg-fuchsia-radial-gradient -left-20 -bottom-128 z-20" />
      <div className="w-176 h-176 absolute bg-fuchsia-radial-gradient -left-72 -bottom-96 z-20" />
      {/* <div className="flex flex-row flex-wrap justify-center md:justify-center items-center mb-8 sm:mb-16 relative"></div> */}
      <div className="flex font-inter text-6xl md:text-7xl text-left *md:text-center text-white relative">
        {total.toLocaleString()}
        <span className="text-3xl antialiased absolute left-[530px] bottom-[5px] text-gray-300">
          websites
        </span>
      </div>
      <div className="bg-white rounded-lg mt-8 pb-8">
        <div className="flex">
          <Square number="3">
            New websites created <Em>every second</Em>.
          </Square>
          <Square number={video.toLocaleString()}>
            New websites since the start of <Em>this video</Em>.
          </Square>
          <Square number={hour.toLocaleString()}>
            New websites created <Em>in the last hour</Em>.
          </Square>
        </div>
        <div className="flex">
          <Square number={day.toLocaleString()}>
            New websites created <Em>today</Em>.
          </Square>
          <Square number={week.toLocaleString()}>
            New websites created <Em>this week</Em>.
          </Square>
          <Square
            number={
              <>
                37
                <span className="text-[28px] font-extrabold inline-block relative translate-y-[-14px]">
                  %
                </span>
              </>
            }
          >
            Of all websites <Em>are porn</Em>.
          </Square>
        </div>
      </div>
    </section>
  );
};

//     <p className="text-xl text-gray-400/90 mt-8 leading-8 md:text-center text-left max-w-5xl *sm:mb-20 mb-10">
//       In addition to internet filtering, Gertrude allows you to collect{` `}
//       <b className="text-gray-300">screenshots</b>
//       {` `}
//       of your protected users&rsquo; screens, as well as a record of{` `}
//       <b className="text-gray-300">everything they type</b>, for an unprecedented level
//       of safety, redundancy, and oversight. You get to review screenshots and keystrokes
//       on your own time, on your own device.
//     </p>
interface IconCircleProps {
  icon: string;
}

interface SquareProps {
  number: JSX.Element | string;
  children: React.ReactNode;
}

const Square: React.FC<SquareProps> = ({ number, children }) => {
  return (
    <div className="flex flex-col p-6 w-1/3">
      <div className="text-5xl font-bold text-gray-900">{number}</div>
      <div className="text-lg text-gray-500 leading-[1.2em] mt-2">{children}</div>
    </div>
  );
};

const IconCircle: React.FC<IconCircleProps> = ({ icon }) => (
  <div className="md:w-32 w-24 md:h-32 h-24 rounded-full bg-gray-800 flex items-center justify-center my-2 sm:my-0 mx-3 sm:mx-10 shadow-2xl relative">
    <i
      aria-hidden
      className={`fa fa-${icon} text-4xl md:text-5xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 bg-clip-text text-transparent`}
    />
  </div>
);

export default NumWebsites;

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

const Em: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="font-bold antialiased font-inter text-fuchsia-600">{children}</span>
);
