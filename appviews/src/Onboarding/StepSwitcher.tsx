import cx from 'classnames';
import React, { useContext, useEffect, useState } from 'react';
import ConfettiExplosion from 'react-confetti-explosion';
import type { OnboardingStep } from './onboarding-store';
import OnboardingContext, { WithinActiveStepContext } from './OnboardingContext';
import ProgressIndicator from './ProgressIndicator';

interface Props {
  children: React.ReactNode;
  ready: boolean;
}

const StepSwitcher: React.FC<Props> = ({ children, ready }) => {
  const [expandBlurs, setExpandBlurs] = useState(false);
  const { currentStep, isUpgrade } = useContext(OnboardingContext);
  const progressStep = getProgressStep(currentStep);

  useEffect(() => {
    if (currentStep === `finish`) {
      setTimeout(() => {
        setExpandBlurs(true);
      }, 500);
    }
  }, [currentStep]);

  // we can't render until we know we've gotten a real step from
  // the app, or else we'll flash the welcome screen on resume
  if (!ready) return null;

  return (
    <div className="w-screen h-screen relative overflow-hidden bg-slate-50">
      <Blur position="-left-96 -bottom-72" expandBlurs={expandBlurs} />
      <Blur position="left-0 -bottom-96" alt expandBlurs={expandBlurs} />
      <Blur position="-right-80 -bottom-80" expandBlurs={expandBlurs} />
      {children}
      <div
        className={cx(
          `absolute top-0 left-0 w-full p-5 flex justify-center items-center transition-[opacity,transform] duration-500`,
          (currentStep === `welcome` || currentStep === `finish`) &&
            `-translate-y-16 opacity-0`,
        )}
      >
        {!isUpgrade && <ProgressIndicator step={progressStep} />}
      </div>
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
  const { currentStep, isUpgrade } = useContext(OnboardingContext);
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

  if (
    isUpgrade &&
    [
      `allowFullDiskAccess_grantAndRestart`,
      `allowFullDiskAccess_success`,
      `allowFullDiskAccess_failed`,
    ].includes(step) === false
  ) {
    // NB: rendering the bare minimum screens for an upgrade flow decreases
    // chance that a focus state in an irrelevant screen causes layout shift
    return null;
  }

  return (
    <WithinActiveStepContext.Provider value={step === currentStep}>
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
    </WithinActiveStepContext.Provider>
  );
};

const Blur: React.FC<{ position: string; expandBlurs: boolean; alt?: boolean }> = ({
  position,
  expandBlurs,
  alt,
}) => (
  <div
    className={cx(
      `absolute w-152 h-152 transition-transform duration-[2s] ease-in`,
      position,
      alt
        ? `[background:radial-gradient(#d946ef56_0%,transparent_70%,transparent)]`
        : `[background:radial-gradient(#8b5cf656_0%,transparent_70%,transparent)]`,
      expandBlurs && `scale-[350%]`,
    )}
  />
);

function getProgressStep(currentStep: OnboardingStep): number {
  switch (currentStep) {
    case `welcome`:
    case `wrongInstallDir`:
    case `confirmGertrudeAccount`:
    case `noGertrudeAccount`:
    case `macosUserAccountType`:
      return 1;
    case `getChildConnectionCode`:
    case `connectChild`:
      return 2;
    case `howToUseGifs`:
    case `allowNotifications_start`:
    case `allowNotifications_grant`:
    case `allowNotifications_failed`:
      return 3;
    case `allowFullDiskAccess_grantAndRestart`:
    case `allowFullDiskAccess_failed`:
    case `allowFullDiskAccess_success`:
      return 4;
    case `allowScreenshots_required`:
    case `allowScreenshots_grantAndRestart`:
    case `allowScreenshots_failed`:
    case `allowScreenshots_success`:
      return 5;
    case `allowKeylogging_required`:
    case `allowKeylogging_grant`:
    case `allowKeylogging_failed`:
      return 6;
    case `installSysExt_explain`:
    case `installSysExt_trick`:
    case `installSysExt_allow`:
    case `installSysExt_failed`:
    case `installSysExt_success`:
    case `exemptUsers`:
    case `locateMenuBarIcon`:
    case `viewHealthCheck`:
    case `encourageFilterSuspensions`:
    case `howToUseGertrude`:
    case `finish`:
      return 7;
  }
}
