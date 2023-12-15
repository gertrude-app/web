import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { Logo } from '@shared/components';

interface Props {
  step: number;
}

const SuperScrollerIllustration: React.FC<Props> = ({ step }) => {
  const [loginScreenOpened, setLoginScreenOpened] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [macOpened, setMacOpened] = useState(false);
  const [downloadButtonClicked, setDownloadButtonClicked] = useState(false);

  useEffect(() => {
    if (step === 1) {
      var id1 = setTimeout(() => {
        setLoginScreenOpened(true);
      }, 200);
      var id2 = setTimeout(() => {
        setLoggedIn(true);
      }, 2400);
    } else if (step === 2) {
      var id3 = setTimeout(() => {
        setMacOpened(true);
      }, 500);
      var id4 = setTimeout(() => {
        setDownloadButtonClicked(true);
      }, 2500);
    }
    return () => {
      clearTimeout(id1);
      clearTimeout(id2);
      clearTimeout(id3);
      clearTimeout(id4);
    };
  }, [step]);

  return (
    <div className="w-152 h-152 flex justify-center items-center relative">
      <Logo
        className={cx(
          `absolute transition-[top] opacity duration-500 ease-in left-48 delay-[800ms]`,
          downloadButtonClicked ? `top-28` : `-top-[calc(50vh-150px)]`,
        )}
        iconOnly
        size={160}
      />
      <Phone
        className={cx(
          `absolute transition-[opacity,transform,bottom,right] duration-500`,
          {
            'opacity-0 translate-y-20 scale-90 bottom-0 right-0': step === 0,
            'opacity-100 scale-100 bottom-0 right-0': step === 1,
            'opacity-20 scale-50 -bottom-40 -right-64': step === 2,
          },
        )}
      >
        <PhoneScreen loginScreenOpened={loginScreenOpened} loggedIn={loggedIn} />
      </Phone>
      <Computer
        className={cx(
          `absolute transition-[opacity,transform,bottom,left] duration-500`,
          {
            'opacity-0 scale-0 translate-y-112': step === 0 || step === 1,
            'opacity-100 scale-100 left-0': step === 2,
          },
        )}
      >
        <ComputerScreen
          macOpened={macOpened}
          downloadButtonClicked={downloadButtonClicked}
        />
      </Computer>
    </div>
  );
};

export default SuperScrollerIllustration;

interface PhoneScreenProps {
  loginScreenOpened?: boolean;
  loggedIn?: boolean;
}

const PhoneScreen: React.FC<PhoneScreenProps> = ({ loginScreenOpened, loggedIn }) => (
  <div
    className={cx(
      `w-full h-full bg-gradient-to-b from-violet-300 to-fuchsia-300 login_screen transition-[opacity,transform] duration-500 rounded-[28px] p-6 flex flex-col justify-center overflow-hidden`,
      loginScreenOpened ? `opacity-100` : `opacity-0 scale-75`,
    )}
  >
    <div
      className={cx(
        `absolute bg-white left-0 top-0 w-full h-full rounded-[28px] transition-opacity duration-1000 delay-500`,
        !loggedIn && `opacity-0`,
      )}
    />
    <Logo
      iconOnly
      className={cx(
        `absolute left-[calc(50%-72px)] z-30 transtion-[transform,opacity] duration-1000 delay-1000`,
        !loggedIn && `translate-y-8 opacity-0`,
      )}
      size={160}
    />
    <div
      className={cx(
        `bg-white p-6 rounded-3xl flex flex-col gap-4 transition-[opacity,transform] duration-500 delay-300 relative`,
        !loginScreenOpened && `opacity-0 translate-y-8`,
        loggedIn && `-translate-x-80`,
      )}
    >
      <div className="h-12 bg-slate-100 rounded-full flex items-center pl-5 text-lg font-medium text-slate-400">
        {`me@example.com`.split(``).map((char, index) => (
          <span
            key={index}
            className={cx(
              `transition-[transform,opacity]`,
              !loginScreenOpened && `scale-0 opacity-0`,
            )}
            style={{
              transitionDelay: `${index * 50 + 700}ms`,
            }}
          >
            {char}
          </span>
        ))}
      </div>
      <div className="h-12 bg-slate-100 rounded-full flex items-center pl-6 gap-1">
        {[...Array(10)].map((_, index) => (
          <span
            key={index}
            className={cx(
              `transition-[transform,opacity] w-2 h-2 rounded-full bg-slate-400 inline-block`,
              !loginScreenOpened && `scale-0 opacity-0`,
            )}
            style={{
              transitionDelay: `${index * 50 + 1400}ms`,
            }}
          ></span>
        ))}
      </div>
      <div
        className={cx(
          `w-28 h-12 rounded-full self-end border border-slate-200 flex justify-center items-center text-lg text-slate-500 transition-[background-color,transform] duration-200 delay-[2200ms] font-medium`,
          loginScreenOpened && `bg-slate-200 scale-90`,
        )}
      >
        Log in
      </div>
    </div>
  </div>
);

interface ComputerScreenProps {
  macOpened: boolean;
  downloadButtonClicked: boolean;
}

const ComputerScreen: React.FC<ComputerScreenProps> = ({
  macOpened,
  downloadButtonClicked,
}) => (
  <div
    className={cx(
      `w-full h-full bg-gradient-to-b from-violet-300 to-fuchsia-300 relative flex flex-col justify-end items-center p-2`,
    )}
  >
    <div
      className={cx(
        `bg-white/40 flex gap-2 px-2 py-1.5 rounded-xl transition-[transform] duration-500 delay-300`,
        !macOpened && `translate-y-12`,
      )}
    >
      <div className="w-6 h-6 bg-gradient-to-br from-red-500 to-yellow-500 rounded-lg" />
      <div className="w-6 h-6 bg-white flex justify-center items-center rounded-lg">
        <div className="bg-blue-500 w-3 h-3 rounded-full" />
      </div>
      <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-lg" />
      <div className="w-6 h-6 bg-white flex justify-center items-center rounded-lg gap-0.5">
        <div className="bg-yellow-500 w-1 h-4 rounded-full" />
        <div className="bg-emerald-500 w-1 h-2 rounded-full" />
      </div>
      <div className="w-6 h-6 bg-white flex justify-center items-center rounded-lg">
        <div className="bg-rose-500 w-2 h-5 rotate-45 rounded-full" />
      </div>
      <div className="w-6 h-6 bg-gradient-to-br from-red-800 to-orange-300 rounded-lg" />
    </div>
    <div
      className={cx(
        `absolute w-80 h-64 bg-white rounded-lg top-8 left-[calc(50%-160px)] transition-[transform,opacity] duration-500 delay-700 flex justify-center items-center`,
        !macOpened && `scale-0 translate-y-64 opacity-0`,
      )}
    >
      <div className="absolute w-2 h-2 rounded-full bg-red-400 left-2 top-2" />
      <div className="absolute w-2 h-2 rounded-full bg-yellow-400 left-5 top-2" />
      <div className="absolute w-2 h-2 rounded-full bg-green-400 left-8 top-2" />
      <div className="w-28 h-3 top-1.5 absolute bg-slate-200 rounded-full" />
      <div
        className={cx(
          `mt-4 transition-[transform,opacity] duration-500 delay-[1.2s]`,
          !macOpened && `opacity-0 scale-75`,
        )}
      >
        <div
          className={cx(
            `text-lg text-white bg-violet-500 rounded-full px-6 py-2 font-medium flex items-center gap-2 transition-[background-color,transform] duration-200 delay-[400ms]`,
            downloadButtonClicked && `bg-violet-600 scale-90`,
          )}
        >
          <span>Download</span>
          <ArrowDownTrayIcon className="w-4 h-4" />
        </div>
      </div>
    </div>
    <div
      className={cx(
        `w-4 h-4 bg-black/30 rounded-full absolute transition[opacity,top,left] duration-500 delay-[1.8s]`,
        macOpened ? `left-52 top-44` : `left-8 top-64 opacity-0`,
      )}
    ></div>
    <div
      className={cx(
        `absolute w-full h-full left-0 top-0 bg-gradient-to-b from-transparent via-fuchsia-500/50 to-transparent transition-[transform,opacity] duration-1000 ease-out delay-[1.4s]`,
        downloadButtonClicked ? `translate-y-full opacity-0` : `-translate-y-full`,
      )}
    />
    <div
      className={cx(
        `bg-black absolute left-0 top-0 w-full h-full transition-opacity duration-500`,
        macOpened && `opacity-0`,
      )}
    />
  </div>
);

const Phone: React.FC<{ children: React.ReactNode; className: string }> = ({
  children,
  className,
}) => (
  <div
    className={cx(`border-8 border-black rounded-[36px] w-80 h-152 relative`, className)}
  >
    <div className="w-1 h-12 bg-black rounded-r absolute -right-3 top-36" />
    <div className="w-1 h-12 bg-black rounded-l absolute -left-3 top-36" />
    <div className="w-1 h-12 bg-black rounded-l absolute -left-3 top-52" />
    <div className="w-24 h-7 rounded-full bg-black absolute left-[calc(50%-44px)] top-2 z-30" />
    <div className="w-24 h-1.5 rounded-full bg-black/60 absolute left-[calc(50%-44px)] bottom-2 z-30" />
    <div className="w-full h-full overflow-hidden rounded-[28px] bg-black">
      {children}
    </div>
  </div>
);

const Computer: React.FC<{ children: React.ReactNode; className: string }> = ({
  children,
  className,
}) => (
  <div className={cx(`[perspective:1200px]`, className)}>
    <div className="w-128 h-96 border-8 border-black rounded-t-3xl bg-black overflow-hidden">
      {children}
    </div>
    <div className="w-[592px] h-96 bg-gradient-to-b from-slate-700 to-slate-600 [transform:rotateX(80deg)] absolute -left-[40px] top-[255px] flex flex-col p-8 pb-4 gap-1">
      <div className="flex justify-center gap-1">
        <Key />
        <Key />
        <Key />
        <Key />
        <Key />
        <Key />
        <Key />
        <Key />
        <Key />
        <Key />
        <Key />
        <Key />
        <Key />
        <Key />
      </div>
      <div className="flex justify-center gap-1">
        <Key grow />
        <Key />
        <Key />
        <Key />
        <Key />
        <Key />
        <Key />
        <Key />
        <Key />
        <Key />
        <Key />
        <Key />
        <Key />
        <Key grow />
      </div>
      <div className="flex justify-center gap-1">
        <Key grow />
        <Key />
        <Key />
        <Key />
        <Key />
        <Key />
        <Key />
        <Key />
        <Key />
        <Key />
        <Key />
        <Key />
        <Key />
        <Key />
      </div>
      <div className="flex justify-center gap-1">
        <Key grow />
        <Key />
        <Key />
        <Key />
        <Key />
        <Key />
        <Key />
        <Key />
        <Key />
        <Key />
        <Key />
        <Key />
        <Key grow />
      </div>
      <div className="flex justify-center gap-1">
        <Key grow />
        <Key />
        <Key />
        <Key />
        <Key />
        <Key />
        <Key />
        <Key />
        <Key />
        <Key />
        <Key />
        <Key grow />
      </div>
      <div className="flex justify-center gap-1">
        <Key />
        <Key />
        <Key />
        <Key />
        <Key />
        <Key grow />
        <Key />
        <Key />
        <Key />
        <Key />
        <Key />
      </div>
      <div className="w-40 h-28 rounded-lg bg-slate-500 self-center mt-4" />
    </div>
    <div className="w-[702px] h-6 absolute bg-slate-700 rounded-b-xl z-50 top-[534px] -left-[95px]" />
  </div>
);

const Key: React.FC<{ className?: string; grow?: boolean }> = ({ className, grow }) => (
  <div
    className={cx(`w-8 h-8 bg-black rounded-md`, className)}
    style={{
      flexGrow: grow ? 100 : 1,
    }}
  />
);
