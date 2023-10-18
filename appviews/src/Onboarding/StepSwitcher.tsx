import React, { useContext, useEffect, useState } from 'react';
import ConfettiExplosion from 'react-confetti-explosion';
import cx from 'classnames';
import type { OnboardingStep } from './onboarding-store';
import NoisyGrain from '../assets/noisy-grain.svg';
import ProgressIndicator from './ProgressIndicator';
import OnboardingContext from './OnboardingContext';

interface Props {
  children: React.ReactNode;
}

const StepSwitcher: React.FC<Props> = ({ children }) => {
  const [bgCloudPosition, setBgCloudPosition] = useState({ x: 100, y: 100 });
  const { currentStep } = useContext(OnboardingContext);
  const progressStep = (() => {
    switch (currentStep) {
      case `welcome`:
      case `confirmGertrudeAccount`:
      case `noGertrudeAccount`:
        return 1;
      case `macosUserAccountType`:
        return 2;
      case `getChildConnectionCode`:
      case `connectChild`:
        return 3;
      case `allowNotifications_start`:
      case `allowNotifications_grant`:
      case `allowNotifications_failed`:
        return 4;
      case `allowScreenshots_required`:
      case `allowScreenshots_grantAndRestart`:
      case `allowScreenshots_success`:
      case `allowScreenshots_failed`:
        return 5;
      case `allowKeylogging_required`:
      case `allowKeylogging_openSysSettings`:
      case `allowKeylogging_grant`:
      case `allowKeylogging_failed`:
        return 6;
      default:
        return 7;
    }
  })();

  useEffect(() => {
    const animateBg: FrameRequestCallback = (t: number) => {
      setBgCloudPosition({
        x: (Math.sin(t / 3000) + 1) * 50,
        y: (Math.sin(t / 1800) + 1) * 50 + 50,
      });
      requestAnimationFrame(animateBg);
    };
    requestAnimationFrame(animateBg);
  }, []);

  return (
    <div className="w-screen h-screen relative overflow-hidden bg-slate-50">
      <div
        className="absolute left-0 top-0 w-full h-full [filter:contrast(150%)_brightness(700%)] opacity-10 !bg-cover bg-center"
        style={{
          background: `radial-gradient(circle at ${bgCloudPosition.x}% ${bgCloudPosition.y}%, rgba(0,3,255,0.77), rgba(0,3,255,0.57), transparent), url(${NoisyGrain})`,
        }}
      ></div>
      <div
        className={cx(
          `absolute top-0 left-0 w-full p-2 flex justify-center items-center transition-[opacity,transform] duration-500`,
          (currentStep === `welcome` || currentStep === `finish`) &&
            `-translate-y-16 opacity-0`,
        )}
      >
        <ProgressIndicator step={progressStep} />
      </div>
      {children}
    </div>
  );
};

export default StepSwitcher;

interface OnboardingStepProps {
  step: OnboardingStep;
  component: React.ReactNode;
  confetti?: boolean;
  confettiDeps?: any[];
}

export const OnboardingPage: React.FC<OnboardingStepProps> = ({
  step,
  component,
  confetti,
  confettiDeps,
}) => {
  const { currentStep } = useContext(OnboardingContext);
  const [hasBeenVisited, setHasBeenVisited] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (step === currentStep) {
      setHasBeenVisited(true);
      if (confetti) {
        setTimeout(() => {
          setShowConfetti(true);
        }, 1000);
      }
    }
  }, [step, currentStep, confettiDeps, confetti]);

  return (
    <div
      className={cx(
        step === currentStep
          ? `left-0 z-10`
          : hasBeenVisited
          ? `left-[-100%] opacity-0`
          : `left-full opacity-0`,
        `absolute w-full h-full top-0 transition-[opacity,left] duration-700`,
      )}
    >
      {showConfetti && (
        <ConfettiExplosion
          particleCount={50}
          colors={[`#8b5cf6`, `#d946ef`, `#6366f1`]}
          className="left-[50vw] top-0 absolute"
        />
      )}
      {component}
    </div>
  );
};
