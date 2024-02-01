import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { useIntersectionObserver } from '../../app/lib/hooks';
import SuperScrollerIllustration from './super-scroller-illustration/SuperScrollerIllustration';

const SuperScrollerBlock: React.FC = () => {
  const { ref: firstStepRef, intersected: firstStepIntersected } =
    useIntersectionObserver({ threshold: 0.75 });
  const { ref: secondStepRef, intersected: secondStepIntersected } =
    useIntersectionObserver({ threshold: 0.75 });
  const { ref: thirdStepRef, intersected: thirdStepIntersected } =
    useIntersectionObserver({ threshold: 0.75 });
  const { ref: fourthStepRef, intersected: fourthStepIntersected } =
    useIntersectionObserver({ threshold: 0.75 });
  const { ref: fifthStepRef, intersected: fifthStepIntersected } =
    useIntersectionObserver({ threshold: 0.75 });
  const { ref: sixthStepRef, intersected: sixthStepIntersected } =
    useIntersectionObserver({ threshold: 0.75 });

  const [step, setStep] = useState(0);

  useEffect(() => {
    if (firstStepIntersected) setStep(1);
    if (secondStepIntersected) setStep(2);
    if (thirdStepIntersected) setStep(3);
    if (fourthStepIntersected) setStep(4);
    if (fifthStepIntersected) setStep(5);
    if (sixthStepIntersected) setStep(6);
  }, [
    firstStepIntersected,
    secondStepIntersected,
    thirdStepIntersected,
    fourthStepIntersected,
    fifthStepIntersected,
    sixthStepIntersected,
  ]);

  return (
    <section className="bg-white flex relative">
      <div className="w-1/2">
        <Step index={1} title="Create an account" intersectionRef={firstStepRef}>
          Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint
          consectetur cupidatat.
        </Step>
        <Step
          index={2}
          title="Install the Mac app on your child's computer"
          intersectionRef={secondStepRef}
        >
          Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint
          consectetur cupidatat.
        </Step>
        <Step
          index={3}
          title="You control what websites are allowed"
          intersectionRef={thirdStepRef}
        >
          Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint
          consectetur cupidatat.
        </Step>
        <Step
          index={4}
          title="Children can request sites to be unblocked..."
          intersectionRef={fourthStepRef}
        >
          Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint
          consectetur cupidatat.
        </Step>
        <Step
          index={5}
          title="...you revieve notifications and can respond from wherever you are"
          intersectionRef={fifthStepRef}
        >
          Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint
          consectetur cupidatat.
        </Step>
        <Step
          index={6}
          title="Review and monitor activity and keystrokes remotely"
          intersectionRef={sixthStepRef}
        >
          Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint
          consectetur cupidatat.
        </Step>
      </div>
      <div className="w-1/2 sticky top-0 flex justify-center items-center h-screen overflow-hidden">
        <SuperScrollerIllustration step={step} />
        <div className="h-[50px] w-full bottom-0 flex justify-center items-center gap-2 absolute">
          <StepMarker index={1} step={step} duration={4400} />
          <StepMarker index={2} step={step} duration={4900} />
          <StepMarker index={3} step={step} duration={800} />
          <StepMarker index={4} step={step} duration={2900} />
          <StepMarker index={5} step={step} duration={1500} />
          <StepMarker index={6} step={step} duration={1500} />
        </div>
      </div>
    </section>
  );
};

export default SuperScrollerBlock;

interface StepProps {
  children: React.ReactNode;
  title: string;
  index: number;
  intersectionRef: React.MutableRefObject<null>;
}

const Step: React.FC<StepProps> = ({ children, title, index, intersectionRef }) => (
  <div
    className="h-screen p-24 flex flex-col justify-center even:bg-slate-50 rounded-[40px]"
    ref={intersectionRef}
  >
    <div className="text-2xl bg-violet-100 text-violet-500 font-bold w-10 h-10 rounded-full flex justify-center items-center">
      <span className="-mb-0.5">{index}</span>
    </div>
    <h2 className="text-4xl font-bold mt-6 mb-4">{title}</h2>
    <div className="text-xl text-slate-700">{children}</div>
  </div>
);

interface StepMarkerProps {
  index: number;
  step: number;
  duration: number;
}

const StepMarker: React.FC<StepMarkerProps> = ({ index, step, duration }) => (
  <div
    className={cx(
      `h-3 bg-violet-100 rounded-full transition-[width] duration-500 overflow-hidden relative`,
      index === step ? `w-20` : `w-3`,
    )}
  >
    <div
      className={cx(
        `bg-violet-400 h-3 absolute top-0 left-0`,
        index !== step && `opacity-0`,
      )}
      style={{
        width: `${index === step ? 100 : 0}%`,
        transition: `width ${duration}ms ease-in-out, opacity 300ms ease-in-out`,
      }}
    />
  </div>
);